import { useState, useEffect, useRef, useCallback } from 'react'

export interface PythonRunResult {
  stdout: string
  error?: string
  executionTimeMs: number
}

interface PendingExecution {
  id: string
  resolve: (result: PythonRunResult) => void
  timeoutId: ReturnType<typeof setTimeout>
}

const TIMEOUT_MS = 5000

export interface UsePythonRunnerReturn {
  isReady: boolean
  isRunning: boolean
  runCode: (code: string) => Promise<PythonRunResult>
}

export function usePythonRunner(): UsePythonRunnerReturn {
  const [isReady, setIsReady] = useState<boolean>(false)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const workerRef = useRef<Worker | null>(null)
  const pendingExecutionRef = useRef<PendingExecution | null>(null)

  // Initialize or respawn worker
  const initWorker = useCallback((): Worker => {
    // Terminate existing worker if present
    if (workerRef.current) {
      try {
        workerRef.current.terminate()
      } catch {
        // ignore
      }
      workerRef.current = null
      setIsReady(false)
    }

    // Instantiate background Web Worker with Vite URL resolution
    const worker = new Worker(new URL('../workers/pythonWorker.ts', import.meta.url), {
      type: 'module'
    })

    worker.onmessage = (event: MessageEvent) => {
      const data = event.data || {}

      if (data.type === 'READY') {
        setIsReady(true)
        return
      }

      const pending = pendingExecutionRef.current
      if (pending && (data.type === 'SUCCESS' || data.type === 'ERROR')) {
        if (data.id === pending.id) {
          clearTimeout(pending.timeoutId)
          pendingExecutionRef.current = null
          setIsRunning(false)

          if (data.type === 'SUCCESS') {
            pending.resolve({
              stdout: data.stdout || '',
              executionTimeMs: data.executionTimeMs || 0
            })
          } else {
            pending.resolve({
              stdout: '',
              error: data.stderr || 'An unknown Python error occurred.',
              executionTimeMs: 0
            })
          }
        }
      }
    }

    worker.onerror = (err) => {
      console.error('Python Worker error:', err)
      const pending = pendingExecutionRef.current
      if (pending) {
        clearTimeout(pending.timeoutId)
        pendingExecutionRef.current = null
        setIsRunning(false)
        pending.resolve({
          stdout: '',
          error: `Worker Runtime Error: ${err.message || 'Worker thread failed'}`,
          executionTimeMs: 0
        })
      }
    }

    // Trigger Pyodide initialization
    worker.postMessage({ type: 'INIT' })
    workerRef.current = worker
    return worker
  }, [])

  useEffect(() => {
    initWorker()

    return () => {
      if (pendingExecutionRef.current) {
        clearTimeout(pendingExecutionRef.current.timeoutId)
        pendingExecutionRef.current = null
      }
      if (workerRef.current) {
        workerRef.current.terminate()
        workerRef.current = null
      }
    }
  }, [initWorker])

  // Execute Python code with 5000ms infinite loop / timeout protection
  const runCode = useCallback(
    (code: string): Promise<PythonRunResult> => {
      return new Promise<PythonRunResult>((resolve) => {
        let worker = workerRef.current
        if (!worker) {
          worker = initWorker()
        }

        setIsRunning(true)
        const runId = Math.random().toString(36).substring(2, 9)

        // Setup 5000ms timeout protection
        const timeoutId = setTimeout(() => {
          console.warn(`Python execution timed out after ${TIMEOUT_MS}ms. Terminating worker...`)

          // Terminate the unresponsive worker thread
          if (workerRef.current) {
            try {
              workerRef.current.terminate()
            } catch {
              // ignore
            }
            workerRef.current = null
          }

          pendingExecutionRef.current = null
          setIsRunning(false)

          // Immediately respawn fresh worker so Pyodide is ready for next run
          initWorker()

          resolve({
            stdout: '',
            error: `Execution timed out (${TIMEOUT_MS / 1000}s limit exceeded). The process was terminated to prevent infinite loops.`,
            executionTimeMs: TIMEOUT_MS
          })
        }, TIMEOUT_MS)

        pendingExecutionRef.current = {
          id: runId,
          resolve,
          timeoutId
        }

        worker.postMessage({
          type: 'RUN',
          code,
          id: runId
        })
      })
    },
    [initWorker]
  )

  return {
    isReady,
    isRunning,
    runCode
  }
}
