/**
 * errorUtils.ts
 *
 * Cleans raw Pyodide/Python tracebacks to produce beginner-friendly output:
 *   - Strips internal Pyodide frames (_pyodide/_base.py, eval_code_async, etc.)
 *   - Normalises <exec> → main.py
 *   - For SyntaxError / IndentationError / TabError: omits "Traceback (most recent call last):"
 *   - For runtime errors: keeps the header but only shows user frames
 */

function cleanSingleTracebackSection(str: string): string {
  if (!str.includes('File ') && !str.includes('Traceback (most recent call last):')) {
    return str.trim()
  }

  const lines = str.split('\n')
  const cleanedLines: string[] = []
  let inInternalFrame = false
  let hasUserFrame = false
  let isSyntaxOrCompileError = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Drop the standard "Traceback" header — we re-add it later only for runtime errors
    if (line.startsWith('Traceback (most recent call last):')) {
      continue
    }

    // Frame header lines
    if (line.startsWith('  File ')) {
      if (
        line.includes('_pyodide') ||
        line.includes('/_base.py') ||
        line.includes('pyodide.py') ||
        line.includes('<decorator-generator') ||
        line.includes('__agy_') ||
        line.includes('__VAR_') ||
        line.includes('__FN_')
      ) {
        inInternalFrame = true
      } else {
        inInternalFrame = false
        hasUserFrame = true
        // Strip internal lib zip path prefix that Pyodide sometimes injects
        const cleanedFrame = line.replace(/File ["']\/lib\/python\d+\.zip\//g, 'File "')
        cleanedLines.push(cleanedFrame)
      }
      continue
    }

    // Exception type lines  (e.g. "SyntaxError: invalid syntax")
    if (
      /^[A-Za-z_][A-Za-z0-9_.]*(?:Error|Exception|Warning|Interrupt|Exit):/.test(line) ||
      /^[A-Za-z_][A-Za-z0-9_.]*Error$/.test(line) ||
      /^[A-Za-z_][A-Za-z0-9_.]*Exception$/.test(line)
    ) {
      inInternalFrame = false
      if (
        line.startsWith('SyntaxError') ||
        line.startsWith('IndentationError') ||
        line.startsWith('TabError')
      ) {
        isSyntaxOrCompileError = true
      }
      cleanedLines.push(line)
      continue
    }

    // Skip continuation lines that belong to an internal frame
    if (inInternalFrame) {
      continue
    }

    // Strip internal harness separator comments
    if (line.includes('--- Internal') && line.includes('Harness')) {
      continue
    }

    cleanedLines.push(line)
  }

  // Trim blank lines from both ends
  while (cleanedLines.length > 0 && cleanedLines[0].trim() === '') {
    cleanedLines.shift()
  }
  while (cleanedLines.length > 0 && cleanedLines[cleanedLines.length - 1].trim() === '') {
    cleanedLines.pop()
  }

  // Nothing survived → return original as fallback
  if (cleanedLines.length === 0) {
    return str.trim()
  }

  // Runtime errors keep the "Traceback" header; syntax errors do NOT (matching CPython CLI)
  if (!isSyntaxOrCompileError && hasUserFrame) {
    return `Traceback (most recent call last):\n${cleanedLines.join('\n')}`
  }
  return cleanedLines.join('\n')
}

/**
 * Main entry-point.
 * Handles chained exceptions ("During handling of the above…") by splitting
 * them and cleaning each section independently.
 */
export function cleanPythonError(raw?: string | null): string {
  if (!raw) return ''

  let str = String(raw).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()

  // Normalise Pyodide's internal "<exec>" filename → "main.py"
  str = str.replace(/File ["']<exec>["']/g, 'File "main.py"')

  const chainedPattern =
    /(\n\s*(?:During handling of the above exception, another exception occurred:|The above exception was the direct cause of the following exception:)\s*\n)/

  if (chainedPattern.test(str)) {
    const parts = str.split(chainedPattern)
    return parts
      .map((part) => (chainedPattern.test(part) ? part : cleanSingleTracebackSection(part)))
      .join('')
      .trim()
  }

  return cleanSingleTracebackSection(str)
}

/**
 * Returns a short, human-readable title for the error badge in the console header.
 */
export function getPythonErrorTitle(errorText?: string | null): string {
  if (!errorText) return 'Python Error'
  if (errorText.includes('SyntaxError')) return 'Syntax Error'
  if (errorText.includes('IndentationError')) return 'Indentation Error'
  if (errorText.includes('TabError')) return 'Tab Error'

  const match = errorText.match(/([A-Za-z_][A-Za-z0-9_.]*(?:Error|Exception)):/m)
  if (match) return match[1]

  return errorText.includes('Traceback') ? 'Python Error Trace' : 'Python Error'
}
