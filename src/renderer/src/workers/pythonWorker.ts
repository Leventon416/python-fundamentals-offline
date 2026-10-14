import { loadPyodide, type PyodideInterface } from 'pyodide'

let pyodide: PyodideInterface | null = null
let isInitializing = false

// Resolve local Pyodide assets path
function getPyodideIndexURL(): string {
  if (typeof self !== 'undefined' && self.location) {
    if (
      self.location.origin &&
      self.location.origin !== 'null' &&
      !self.location.origin.startsWith('file:')
    ) {
      return `${self.location.origin}/pyodide/`
    }
    try {
      return new URL('../pyodide/', self.location.href).href
    } catch {
      return '/pyodide/'
    }
  }
  return '/pyodide/'
}

async function initPyodide(): Promise<PyodideInterface> {
  if (pyodide) return pyodide
  if (isInitializing) {
    while (isInitializing) {
      await new Promise((r) => setTimeout(r, 50))
    }
    if (pyodide) return pyodide
  }

  isInitializing = true
  try {
    const indexURL = getPyodideIndexURL()
    pyodide = await loadPyodide({
      indexURL
    })

    // Pre-import sys and io for resilient standard I/O redirection
    await pyodide.runPythonAsync(`
import sys
import io
`)

    self.postMessage({ type: 'READY' })
    return pyodide
  } finally {
    isInitializing = false
  }
}

self.onmessage = async (event: MessageEvent): Promise<void> => {
  const { type, code, id } = event.data || {}

  if (type === 'INIT') {
    try {
      await initPyodide()
    } catch (err) {
      self.postMessage({
        type: 'ERROR',
        id: 'init',
        stderr: `Failed to load Pyodide engine: ${String(err)}`,
        errorName: 'InitializationError'
      })
    }
    return
  }

  if (type === 'RUN') {
    const startTime = performance.now()
    const stdoutLines: string[] = []
    const stderrLines: string[] = []

    try {
      const py = await initPyodide()

      // Redirect stdout and stderr handlers to capture print statements
      py.setStdout({
        batched: (msg: string) => {
          stdoutLines.push(msg)
        }
      })

      py.setStderr({
        batched: (msg: string) => {
          stderrLines.push(msg)
        }
      })

      // Run user Python code asynchronously
      await py.runPythonAsync(code)

      const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime))
      const stdout = stdoutLines.join('\n')

      self.postMessage({
        type: 'SUCCESS',
        id,
        stdout,
        executionTimeMs
      })
    } catch (err: unknown) {
      const errorObj = err as Error
      const errorName = errorObj.name || 'PythonError'
      const rawMessage = errorObj.message || String(err)

      // Clean up stack trace if needed, presenting readable Python exception
      const stderr =
        stderrLines.length > 0 ? `${stderrLines.join('\n')}\n${rawMessage}` : rawMessage

      self.postMessage({
        type: 'ERROR',
        id,
        stderr,
        errorName
      })
    }
  }
}
