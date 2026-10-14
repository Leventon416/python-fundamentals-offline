import {
  ExpectedVariableSpec,
  SemanticConstraint,
  TestCase,
  TestResult,
  TestSuiteResult
} from '../types/curriculum'

export type CodeRunnerFn = (
  code: string
) => Promise<{ stdout: string; error?: string; executionTimeMs: number }>

export interface StdoutComparisonOptions {
  caseSensitive?: boolean
  normalizeLineEndings?: boolean
  ignoreOneFinalNewline?: boolean
  trimLines?: boolean
}

// Compare stdout strings with strict or configured comparison rules
export function compareStdout(
  actual: string,
  expected: string,
  options: StdoutComparisonOptions = {}
): {
  passed: boolean
  normalizedActual: string
  normalizedExpected: string
} {
  const {
    caseSensitive = true,
    normalizeLineEndings = true,
    ignoreOneFinalNewline = true,
    trimLines = false
  } = options

  let normActual = actual
  let normExpected = expected

  if (normalizeLineEndings) {
    normActual = normActual.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    normExpected = normExpected.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  }

  if (ignoreOneFinalNewline) {
    if (normActual.endsWith('\n')) {
      normActual = normActual.slice(0, -1)
    }
    if (normExpected.endsWith('\n')) {
      normExpected = normExpected.slice(0, -1)
    }
  }

  if (trimLines) {
    normActual = normActual
      .split('\n')
      .map((line) => line.trim())
      .join('\n')
    normExpected = normExpected
      .split('\n')
      .map((line) => line.trim())
      .join('\n')
  }

  if (!caseSensitive) {
    normActual = normActual.toLowerCase()
    normExpected = normExpected.toLowerCase()
  }

  return {
    passed: normActual === normExpected,
    normalizedActual: normActual,
    normalizedExpected: normExpected
  }
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Run light static checks on user code
export function checkSemanticConstraints(
  userCode: string,
  constraints?: SemanticConstraint[]
): { passed: boolean; message?: string } {
  if (!constraints || constraints.length === 0) {
    return { passed: true }
  }

  for (const c of constraints) {
    if (c.type === 'variable_assigned') {
      const varName = c.target.trim()
      // Enforce assignment with '=' and ensure it is not '==' or '!='
      const assignRegex = new RegExp(`\\b${escapeRegExp(varName)}\\s*=(?!=)`, 'm')
      if (!assignRegex.test(userCode)) {
        return {
          passed: false,
          message:
            c.message ||
            `Variable '${varName}' must be assigned a value in your code (e.g. ${varName} = ...).`
        }
      }
    } else if (c.type === 'pattern_present') {
      const pattern = new RegExp(c.target, 'm')
      if (!pattern.test(userCode)) {
        return {
          passed: false,
          message: c.message || `Expected code pattern '${c.target}' was not found in your code.`
        }
      }
    } else if (c.type === 'pattern_absent') {
      const pattern = new RegExp(c.target, 'm')
      if (pattern.test(userCode)) {
        return {
          passed: false,
          message: c.message || `Code contains disallowed pattern '${c.target}'.`
        }
      }
    }
  }

  return { passed: true }
}

// Deep value comparison (handles primitives, arrays, and objects)
function areValuesEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < 0.00001
  }
  return JSON.stringify(a) === JSON.stringify(b)
}

export async function runSingleTest(
  userCode: string,
  testCase: TestCase,
  runCodeFn: CodeRunnerFn
): Promise<TestResult> {
  const startTime = performance.now()

  // 1. Stdout Test Strategy
  if (testCase.type === 'stdout') {
    const semanticConstraints =
      testCase.semanticConstraints || testCase.gradingConfig?.semanticConstraints
    const constraintCheck = checkSemanticConstraints(userCode, semanticConstraints)
    if (!constraintCheck.passed) {
      return {
        testId: testCase.id,
        description: testCase.description,
        passed: false,
        hidden: testCase.hidden,
        expected: testCase.description,
        actual: constraintCheck.message || 'Static code check failed',
        errorMessage: constraintCheck.message,
        executionTimeMs: Math.round(performance.now() - startTime)
      }
    }

    const runResult = await runCodeFn(userCode)
    const executionTimeMs = Math.round(performance.now() - startTime)

    const rawExpected = testCase.expectedStdout ?? testCase.expectedOutput ?? ''
    const expectedStr = Array.isArray(rawExpected) ? rawExpected.join('\n') : rawExpected

    if (runResult.error) {
      return {
        testId: testCase.id,
        description: testCase.description,
        passed: false,
        hidden: testCase.hidden,
        expected: expectedStr,
        actual: runResult.error,
        errorMessage: runResult.error,
        executionTimeMs
      }
    }

    const compareOptions: StdoutComparisonOptions = {
      caseSensitive:
        testCase.gradingConfig?.caseSensitive ??
        (testCase.caseSensitive !== undefined ? testCase.caseSensitive : true),
      normalizeLineEndings:
        testCase.gradingConfig?.normalizeLineEndings ??
        (testCase.normalizeLineEndings !== undefined ? testCase.normalizeLineEndings : true),
      ignoreOneFinalNewline:
        testCase.gradingConfig?.ignoreOneFinalNewline ??
        (testCase.ignoreOneFinalNewline !== undefined ? testCase.ignoreOneFinalNewline : true),
      trimLines:
        testCase.gradingConfig?.trimLines ??
        (testCase.trimLines !== undefined
          ? testCase.trimLines
          : testCase.trimWhitespace !== undefined
            ? testCase.trimWhitespace
            : false)
    }

    let comparison = compareStdout(runResult.stdout, expectedStr, compareOptions)
    if (!comparison.passed && testCase.alternativeExpectedStdout) {
      for (const alt of testCase.alternativeExpectedStdout) {
        const altComp = compareStdout(runResult.stdout, alt, compareOptions)
        if (altComp.passed) {
          comparison = altComp
          break
        }
      }
    }

    return {
      testId: testCase.id,
      description: testCase.description,
      passed: comparison.passed,
      hidden: testCase.hidden,
      expected: testCase.hidden && !comparison.passed ? '[Hidden Test Output]' : expectedStr,
      actual:
        testCase.hidden && !comparison.passed
          ? '[Hidden Test Failed]'
          : comparison.normalizedActual || '(no output)',
      executionTimeMs
    }
  }

  // 2. Variable Test Strategy
  if (testCase.type === 'variable') {
    const varName = testCase.variableName || ''
    const harness = `
${userCode}

# --- Internal Test Harness: Variable Inspection ---
import json
try:
    __var_name = ${JSON.stringify(varName)}
    if __var_name not in locals() and __var_name not in globals():
        print(f"__VAR_ERR__Variable '{__var_name}' is not defined")
    else:
        __val = locals().get(__var_name, globals().get(__var_name))
        __val_type = type(__val).__name__
        try:
            __val_json = json.dumps(__val)
        except Exception:
            __val_json = json.dumps(str(__val))
        print(f"__VAR_RESULT__{json.dumps({'value': __val, 'type': __val_type})}")
except Exception as __e:
    print(f"__VAR_ERR__{str(__e)}")
`
    const runResult = await runCodeFn(harness)
    const executionTimeMs = Math.round(performance.now() - startTime)

    if (runResult.error) {
      return {
        testId: testCase.id,
        description: testCase.description,
        passed: false,
        hidden: testCase.hidden,
        expected: `${varName} = ${JSON.stringify(testCase.expectedValue)}`,
        actual: runResult.error,
        errorMessage: runResult.error,
        executionTimeMs
      }
    }

    const stdout = runResult.stdout
    const errMatch = stdout.match(/__VAR_ERR__(.+)/)
    if (errMatch) {
      return {
        testId: testCase.id,
        description: testCase.description,
        passed: false,
        hidden: testCase.hidden,
        expected: `${varName} = ${JSON.stringify(testCase.expectedValue)}${testCase.expectedType ? ` (${testCase.expectedType})` : ''}`,
        actual: errMatch[1].trim(),
        errorMessage: errMatch[1].trim(),
        executionTimeMs
      }
    }

    const resMatch = stdout.match(/__VAR_RESULT__(.+)/)
    if (resMatch) {
      try {
        const parsed = JSON.parse(resMatch[1].trim())
        const valueMatches = areValuesEqual(parsed.value, testCase.expectedValue)
        const typeMatches = testCase.expectedType ? parsed.type === testCase.expectedType : true

        const passed = valueMatches && typeMatches

        return {
          testId: testCase.id,
          description: testCase.description,
          passed,
          hidden: testCase.hidden,
          expected:
            testCase.hidden && !passed
              ? `[Hidden Variable Condition]`
              : `${varName} = ${JSON.stringify(testCase.expectedValue)}${testCase.expectedType ? ` (${testCase.expectedType})` : ''}`,
          actual:
            testCase.hidden && !passed
              ? `[Hidden Test Failed]`
              : `${varName} = ${JSON.stringify(parsed.value)} (${parsed.type})`,
          executionTimeMs
        }
      } catch {
        return {
          testId: testCase.id,
          description: testCase.description,
          passed: false,
          hidden: testCase.hidden,
          expected: `${varName} = ${JSON.stringify(testCase.expectedValue)}`,
          actual: 'Failed to inspect variable result from Python environment.',
          executionTimeMs
        }
      }
    }

    return {
      testId: testCase.id,
      description: testCase.description,
      passed: false,
      hidden: testCase.hidden,
      expected: `${varName} = ${JSON.stringify(testCase.expectedValue)}`,
      actual: 'No evaluation result received from Python harness.',
      executionTimeMs
    }
  }

  // 3. Function Test Strategy
  if (testCase.type === 'function') {
    const fnName = testCase.functionName || ''
    const argsJson = JSON.stringify(testCase.args || [])
    const harness = `
${userCode}

# --- Internal Test Harness: Function Call ---
import json
try:
    __fn_name = ${JSON.stringify(fnName)}
    if __fn_name not in locals() and __fn_name not in globals():
        print(f"__FN_ERR__Function '{__fn_name}' is not defined")
    else:
        __fn = locals().get(__fn_name, globals().get(__fn_name))
        __args = ${argsJson}
        __ret = __fn(*__args)
        print(f"__FN_RESULT__{json.dumps({'return': __ret})}")
except Exception as __e:
    print(f"__FN_ERR__{str(__e)}")
`
    const runResult = await runCodeFn(harness)
    const executionTimeMs = Math.round(performance.now() - startTime)

    const expectedDisplay = `${fnName}(${(testCase.args || []).map((a) => JSON.stringify(a)).join(', ')}) == ${JSON.stringify(testCase.expectedReturn)}`

    if (runResult.error) {
      return {
        testId: testCase.id,
        description: testCase.description,
        passed: false,
        hidden: testCase.hidden,
        expected: expectedDisplay,
        actual: runResult.error,
        errorMessage: runResult.error,
        executionTimeMs
      }
    }

    const stdout = runResult.stdout
    const errMatch = stdout.match(/__FN_ERR__(.+)/)
    if (errMatch) {
      return {
        testId: testCase.id,
        description: testCase.description,
        passed: false,
        hidden: testCase.hidden,
        expected: testCase.hidden ? '[Hidden Function Call]' : expectedDisplay,
        actual: errMatch[1].trim(),
        errorMessage: errMatch[1].trim(),
        executionTimeMs
      }
    }

    const resMatch = stdout.match(/__FN_RESULT__(.+)/)
    if (resMatch) {
      try {
        const parsed = JSON.parse(resMatch[1].trim())
        const passed = areValuesEqual(parsed.return, testCase.expectedReturn)

        return {
          testId: testCase.id,
          description: testCase.description,
          passed,
          hidden: testCase.hidden,
          expected: testCase.hidden && !passed ? '[Hidden Function Test]' : expectedDisplay,
          actual:
            testCase.hidden && !passed
              ? '[Hidden Test Failed]'
              : `Returned: ${JSON.stringify(parsed.return)}`,
          executionTimeMs
        }
      } catch {
        return {
          testId: testCase.id,
          description: testCase.description,
          passed: false,
          hidden: testCase.hidden,
          expected: expectedDisplay,
          actual: 'Failed to parse function output from Python harness.',
          executionTimeMs
        }
      }
    }

    return {
      testId: testCase.id,
      description: testCase.description,
      passed: false,
      hidden: testCase.hidden,
      expected: expectedDisplay,
      actual: 'No evaluation result received from Python harness.',
      executionTimeMs
    }
  }

  // 4. Composite Grader: Variable States AND Stdout
  if (
    testCase.type === 'state_and_stdout' ||
    testCase.mode === 'state_and_stdout' ||
    testCase.gradingConfig?.mode === 'state_and_stdout'
  ) {
    const semanticConstraints =
      testCase.semanticConstraints || testCase.gradingConfig?.semanticConstraints
    const constraintCheck = checkSemanticConstraints(userCode, semanticConstraints)
    if (!constraintCheck.passed) {
      return {
        testId: testCase.id,
        description: testCase.description,
        passed: false,
        hidden: testCase.hidden,
        expected: testCase.description,
        actual: constraintCheck.message || 'Static code check failed',
        errorMessage: constraintCheck.message,
        executionTimeMs: Math.round(performance.now() - startTime)
      }
    }

    // Build variable map from expectedVariables and/or legacy variableName
    const varMap: Record<string, ExpectedVariableSpec> = {
      ...(testCase.expectedVariables || {})
    }
    if (testCase.variableName) {
      varMap[testCase.variableName] = {
        value: testCase.expectedValue,
        type: testCase.expectedType
      }
    }
    const varNames = Object.keys(varMap)

    const harness = `
${userCode}

# --- Internal AGY Composite Grader Harness ---
import json
try:
    __agy_vars = {}
    __var_names_to_check = ${JSON.stringify(varNames)}
    for __vn in __var_names_to_check:
        if __vn in locals() or __vn in globals():
            __val = locals().get(__vn, globals().get(__vn))
            __val_type = type(__val).__name__
            try:
                json.dumps(__val)
                __agy_vars[__vn] = {"defined": True, "value": __val, "type": __val_type}
            except Exception:
                __agy_vars[__vn] = {"defined": True, "value": str(__val), "type": __val_type}
        else:
            __agy_vars[__vn] = {"defined": False}
    print(f"__AGY_STATE__{json.dumps(__agy_vars)}")
except Exception as __e:
    print(f"__AGY_STATE_ERR__{str(__e)}")
`
    const runResult = await runCodeFn(harness)
    const executionTimeMs = Math.round(performance.now() - startTime)

    if (runResult.error) {
      return {
        testId: testCase.id,
        description: testCase.description,
        passed: false,
        hidden: testCase.hidden,
        expected: testCase.description,
        actual: runResult.error,
        errorMessage: runResult.error,
        executionTimeMs
      }
    }

    const rawStdout = runResult.stdout
    const delimiterIndex = rawStdout.indexOf('__AGY_STATE__')
    const errDelimiterIndex = rawStdout.indexOf('__AGY_STATE_ERR__')

    if (errDelimiterIndex !== -1) {
      const errText = rawStdout.substring(errDelimiterIndex + '__AGY_STATE_ERR__'.length).trim()
      return {
        testId: testCase.id,
        description: testCase.description,
        passed: false,
        hidden: testCase.hidden,
        expected: testCase.description,
        actual: `State inspection error: ${errText}`,
        errorMessage: errText,
        executionTimeMs
      }
    }

    if (delimiterIndex === -1) {
      return {
        testId: testCase.id,
        description: testCase.description,
        passed: false,
        hidden: testCase.hidden,
        expected: testCase.description,
        actual: 'Test harness did not complete state extraction.',
        executionTimeMs
      }
    }

    const userRawStdout = rawStdout.substring(0, delimiterIndex)
    const stateJsonStr = rawStdout.substring(delimiterIndex + '__AGY_STATE__'.length).trim()

    // 1. Validate stdout output using strict comparison rules
    const rawExpectedStdout = testCase.expectedStdout ?? testCase.expectedOutput ?? ''
    const expectedStdoutStr = Array.isArray(rawExpectedStdout)
      ? rawExpectedStdout.join('\n')
      : rawExpectedStdout

    const compareOptions: StdoutComparisonOptions = {
      caseSensitive:
        testCase.gradingConfig?.caseSensitive ??
        (testCase.caseSensitive !== undefined ? testCase.caseSensitive : true),
      normalizeLineEndings:
        testCase.gradingConfig?.normalizeLineEndings ??
        (testCase.normalizeLineEndings !== undefined ? testCase.normalizeLineEndings : true),
      ignoreOneFinalNewline:
        testCase.gradingConfig?.ignoreOneFinalNewline ??
        (testCase.ignoreOneFinalNewline !== undefined ? testCase.ignoreOneFinalNewline : true),
      trimLines:
        testCase.gradingConfig?.trimLines ??
        (testCase.trimLines !== undefined ? testCase.trimLines : false)
    }

    let stdoutComparison = compareStdout(userRawStdout, expectedStdoutStr, compareOptions)
    if (!stdoutComparison.passed && testCase.alternativeExpectedStdout) {
      for (const alt of testCase.alternativeExpectedStdout) {
        const altComp = compareStdout(userRawStdout, alt, compareOptions)
        if (altComp.passed) {
          stdoutComparison = altComp
          break
        }
      }
    }

    // 2. Validate variable state and types
    let parsedVars: Record<string, { defined: boolean; value?: unknown; type?: string }> = {}
    try {
      parsedVars = JSON.parse(stateJsonStr)
    } catch {
      return {
        testId: testCase.id,
        description: testCase.description,
        passed: false,
        hidden: testCase.hidden,
        expected: testCase.description,
        actual: 'Failed to parse variables from Python harness.',
        executionTimeMs
      }
    }

    const variableErrors: string[] = []
    const actualVarSummary: string[] = []
    const expectedVarSummary: string[] = []

    for (const [vName, spec] of Object.entries(varMap)) {
      const actualVar = parsedVars[vName]
      const expValStr = spec.value !== undefined ? JSON.stringify(spec.value) : 'any'
      const expTypeStr = spec.type ? ` (${spec.type})` : ''
      expectedVarSummary.push(`${vName} = ${expValStr}${expTypeStr}`)

      if (!actualVar || !actualVar.defined) {
        variableErrors.push(`Variable '${vName}' is not defined`)
        actualVarSummary.push(`${vName}: not defined`)
      } else {
        const actValStr = JSON.stringify(actualVar.value)
        const actTypeStr = actualVar.type ? ` (${actualVar.type})` : ''
        actualVarSummary.push(`${vName} = ${actValStr}${actTypeStr}`)

        if (spec.value !== undefined && !areValuesEqual(actualVar.value, spec.value)) {
          variableErrors.push(`Variable '${vName}' has value ${actValStr}, expected ${expValStr}`)
        }
        if (spec.type && actualVar.type !== spec.type) {
          variableErrors.push(
            `Variable '${vName}' has type '${actualVar.type}', expected type '${spec.type}'`
          )
        }
      }
    }

    const allVariablesPassed = variableErrors.length === 0
    const stdoutPassed = stdoutComparison.passed
    const allPassed = allVariablesPassed && stdoutPassed

    const expectedDisplay = [
      expectedStdoutStr !== ''
        ? `stdout: ${JSON.stringify(stdoutComparison.normalizedExpected)}`
        : '',
      expectedVarSummary.length > 0 ? `vars: ${expectedVarSummary.join(', ')}` : ''
    ]
      .filter(Boolean)
      .join(' | ')

    const actualDisplay = [
      !stdoutPassed
        ? `stdout: ${JSON.stringify(stdoutComparison.normalizedActual || '(no output)')}`
        : `stdout: ${JSON.stringify(stdoutComparison.normalizedActual)}`,
      actualVarSummary.length > 0 ? `vars: ${actualVarSummary.join(', ')}` : '',
      variableErrors.length > 0 ? `[${variableErrors.join('; ')}]` : ''
    ]
      .filter(Boolean)
      .join(' | ')

    return {
      testId: testCase.id,
      description: testCase.description,
      passed: allPassed,
      hidden: testCase.hidden,
      expected: testCase.hidden && !allPassed ? '[Hidden Test Case]' : expectedDisplay,
      actual: testCase.hidden && !allPassed ? '[Hidden Test Failed]' : actualDisplay,
      errorMessage: !allPassed
        ? variableErrors.length > 0
          ? variableErrors.join('; ')
          : !stdoutPassed
            ? `Output mismatch: expected ${JSON.stringify(stdoutComparison.normalizedExpected)}, got ${JSON.stringify(stdoutComparison.normalizedActual)}`
            : undefined
        : undefined,
      executionTimeMs
    }
  }

  // Fallback
  return {
    testId: testCase.id,
    description: testCase.description,
    passed: false,
    expected: 'Valid test evaluation',
    actual: 'Unknown test type',
    executionTimeMs: 0
  }
}

export async function runTestSuite(
  userCode: string,
  testCases: TestCase[],
  runCodeFn: CodeRunnerFn
): Promise<TestSuiteResult> {
  const results: TestResult[] = []
  let totalTime = 0

  for (const tc of testCases) {
    const res = await runSingleTest(userCode, tc, runCodeFn)
    results.push(res)
    totalTime += res.executionTimeMs || 0
  }

  const passedCount = results.filter((r) => r.passed).length
  const allPassed = passedCount === testCases.length && testCases.length > 0

  return {
    passedCount,
    totalCount: testCases.length,
    allPassed,
    results,
    totalExecutionTimeMs: totalTime
  }
}
