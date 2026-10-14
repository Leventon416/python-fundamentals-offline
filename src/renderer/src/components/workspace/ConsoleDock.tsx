import React from 'react'
import {
  Terminal,
  CheckCircle2,
  XCircle,
  Play,
  Maximize2,
  Minimize2,
  Trash2,
  Sparkles,
  AlertTriangle,
  Loader2,
  Lock
} from 'lucide-react'
import { TestCase, TestResult } from '../../types/curriculum'
import { cn } from '../../lib/utils'
import { cleanPythonError, getPythonErrorTitle } from '../../lib/errorUtils'

export interface ConsoleLog {
  id: string
  type: 'stdout' | 'stderr' | 'info'
  text: string
  executionTimeMs?: number
}

export interface ConsoleDockProps {
  activeTab: 'console' | 'tests'
  onTabChange: (tab: 'console' | 'tests') => void
  isExpanded: boolean
  onToggleExpand: () => void
  consoleOutput: ConsoleLog[]
  onClearConsole: () => void
  testCases: TestCase[]
  testResults: TestResult[]
  hasRunTests: boolean
  isRunning: boolean
  isEvaluatingTests?: boolean
  isPyodideReady: boolean
  onRunCode: () => void
  onSubmitTests: () => void
  lessonXp?: number
  isEditorEnabled?: boolean
}

export const ConsoleDock: React.FC<ConsoleDockProps> = ({
  activeTab,
  onTabChange,
  isExpanded,
  onToggleExpand,
  consoleOutput,
  onClearConsole,
  testCases,
  testResults,
  hasRunTests,
  isRunning,
  isEvaluatingTests = false,
  isPyodideReady,
  onRunCode,
  onSubmitTests,
  lessonXp = 50,
  isEditorEnabled = true
}) => {
  const passedCount = testResults.filter((r) => r.passed).length
  const totalTests = testResults.length > 0 ? testResults.length : testCases.length
  const allPassed = hasRunTests && testResults.length > 0 && passedCount === testResults.length

  return (
    <div
      className={cn(
        'flex flex-col border-t border-coddy-border bg-coddy-dark transition-all duration-300 ease-in-out',
        isExpanded ? 'h-84' : 'h-56'
      )}
    >
      {/* Top Dock Header & Tabs */}
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-coddy-border bg-[#1e293b]/80 px-4 select-none">
        {/* Left Tabs */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onTabChange('console')}
            className={cn(
              'flex items-center space-x-2 rounded-md px-3 py-1 text-xs font-semibold transition-all',
              activeTab === 'console'
                ? 'bg-coddy-dark text-cyan-400 border border-coddy-border'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Console Output</span>
            {consoleOutput.length > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] text-cyan-300">
                {consoleOutput.length}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('tests')}
            className={cn(
              'flex items-center space-x-2 rounded-md px-3 py-1 text-xs font-semibold transition-all',
              activeTab === 'tests'
                ? 'bg-coddy-dark text-emerald-400 border border-coddy-border'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Test Results</span>
            {isEvaluatingTests ? (
              <Loader2 className="h-3 w-3 animate-spin text-cyan-400" />
            ) : hasRunTests ? (
              <span
                className={cn(
                  'rounded px-1.5 py-0.2 text-[10px] font-bold border',
                  allPassed
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                )}
              >
                {passedCount}/{totalTests} Passed
              </span>
            ) : (
              <span className="flex h-4 px-1.5 items-center justify-center rounded-full bg-slate-800 text-[10px] text-slate-400">
                {testCases.length}
              </span>
            )}
          </button>
        </div>

        {/* Right Dock Controls */}
        <div className="flex items-center space-x-2">
          {activeTab === 'console' && consoleOutput.length > 0 && (
            <button
              onClick={onClearConsole}
              title="Clear Console Output"
              className="flex items-center space-x-1 rounded px-2 py-0.5 text-[11px] text-slate-400 hover:bg-coddy-border hover:text-white transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              <span>Clear</span>
            </button>
          )}

          <button
            onClick={onToggleExpand}
            title={isExpanded ? 'Collapse Dock' : 'Expand Dock'}
            className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-coddy-border hover:text-white transition-colors"
          >
            {isExpanded ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Dock Content Area */}
      <div className="flex-1 overflow-y-auto p-3 font-mono text-xs select-text space-y-2.5">
        {activeTab === 'console' ? (
          <div>
            {consoleOutput.length === 0 ? (
              <div className="flex h-28 flex-col items-center justify-center text-slate-500 space-y-1">
                <Terminal className="h-6 w-6 stroke-1 text-slate-600" />
                <p className="text-xs">
                  No output yet. Click &quot;Run Code&quot; or press Ctrl+Enter to execute Python.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {consoleOutput.map((item) => (
                  <div key={item.id}>
                    {item.type === 'stderr' ? (
                      <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 p-3 text-rose-300">
                        <div className="flex items-center space-x-1.5 text-[11px] font-bold text-rose-400 mb-1">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          <span>{getPythonErrorTitle(item.text)}</span>
                        </div>
                        <pre className="whitespace-pre-wrap font-mono text-xs text-rose-200">
                          {cleanPythonError(item.text)}
                        </pre>
                      </div>
                    ) : item.type === 'info' ? (
                      <div className="flex items-center space-x-2 text-[11px] text-cyan-400 italic py-0.5">
                        <span>{item.text}</span>
                        {item.executionTimeMs !== undefined && (
                          <span className="text-slate-400 not-italic font-mono">
                            ({item.executionTimeMs}ms)
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-start space-x-2 text-slate-200">
                        <span className="text-emerald-500 select-none font-bold">&gt;&gt;&gt;</span>
                        <pre className="whitespace-pre-wrap font-mono text-xs text-slate-200 flex-1">
                          {item.text}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            {/* Evaluating State */}
            {isEvaluatingTests && (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-3 text-cyan-300">
                  <Loader2 className="h-4 w-4 animate-spin text-cyan-400 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold">Evaluating Python Solution...</p>
                    <p className="text-[11px] text-cyan-400/70">
                      Running test suite through WebAssembly test harness
                    </p>
                  </div>
                </div>

                {testCases.map((tc, idx) => (
                  <div
                    key={tc.id}
                    className="flex items-center justify-between rounded-lg border border-slate-700/60 bg-[#1e293b]/40 p-2.5"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-300 text-xs">{tc.description}</p>
                        <span className="text-[10px] text-slate-500 font-sans">
                          Test case {idx + 1} of {testCases.length}
                        </span>
                      </div>
                    </div>
                    <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-400 border border-cyan-500/30">
                      RUNNING
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Not evaluated yet */}
            {!isEvaluatingTests && !hasRunTests && (
              <div className="space-y-2">
                <div className="flex h-24 flex-col items-center justify-center text-slate-400 space-y-1.5 border border-dashed border-coddy-border rounded-lg p-3">
                  <CheckCircle2 className="h-6 w-6 stroke-1 text-slate-500" />
                  <p className="text-xs font-medium text-slate-300">
                    Click &quot;Submit &amp; Run Tests&quot; to evaluate your solution.
                  </p>
                  <p className="text-[11px] text-slate-500 font-sans">
                    Includes {testCases.length} automated test{' '}
                    {testCases.length === 1 ? 'case' : 'cases'}.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1 font-sans">
                    Test Suite Checklist
                  </p>
                  {testCases.map((tc, idx) => (
                    <div
                      key={tc.id}
                      className="flex items-center justify-between rounded-lg border border-coddy-border/60 bg-[#1e293b]/30 p-2.5"
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] text-slate-400 font-mono">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-medium text-slate-300 text-xs">{tc.description}</p>
                          {tc.hidden && (
                            <span className="inline-flex items-center space-x-1 mt-0.5 rounded bg-indigo-500/20 px-1.5 py-0.2 text-[9px] font-semibold text-indigo-300 border border-indigo-500/30">
                              <Lock className="h-2.5 w-2.5" />
                              <span>Hidden Test</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-400 border border-slate-700">
                        READY
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Test Results Banner & Cards */}
            {!isEvaluatingTests && hasRunTests && (
              <div className="space-y-2.5">
                {/* Summary Banner */}
                {allPassed ? (
                  <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/30 p-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-300 text-xs">
                          All {testResults.length} {testResults.length === 1 ? 'test' : 'tests'}{' '}
                          passed! (+{lessonXp} XP)
                        </h4>
                        <p className="text-[11px] text-emerald-400/80 font-sans">
                          All test criteria satisfied. Your code passed all checks!
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-500/30 shrink-0">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                      <span>+{lessonXp} XP</span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 p-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 shrink-0">
                        <XCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-rose-300 text-xs">
                          {passedCount} of {testResults.length} tests passed. Check failed cases
                          below.
                        </h4>
                        <p className="text-[11px] text-rose-400/80 font-sans">
                          Compare the expected and actual outputs below to debug your solution.
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-rose-500/20 px-2.5 py-1 text-[11px] font-bold text-rose-300 border border-rose-500/30 shrink-0">
                      {testResults.length - passedCount} Failed
                    </span>
                  </div>
                )}

                {/* Individual Test Cards */}
                {testResults.map((res) => (
                  <div
                    key={res.testId}
                    className={cn(
                      'rounded-lg border p-3 transition-colors space-y-2',
                      res.passed
                        ? 'border-emerald-500/30 bg-emerald-950/20'
                        : 'border-rose-500/30 bg-rose-950/20'
                    )}
                  >
                    {/* Header: Test description, status badge, hidden badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {res.passed ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                        )}
                        <span className="font-semibold text-slate-200 text-xs">
                          {res.description}
                        </span>
                        {res.hidden && (
                          <span className="inline-flex items-center space-x-1 rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-medium text-indigo-300 border border-indigo-500/30">
                            <Lock className="h-2.5 w-2.5" />
                            <span>Hidden Test</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        {res.executionTimeMs !== undefined && (
                          <span className="text-[10px] text-slate-500 font-mono">
                            {res.executionTimeMs}ms
                          </span>
                        )}
                        <span
                          className={cn(
                            'rounded px-2 py-0.5 text-[10px] font-bold border',
                            res.passed
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          )}
                        >
                          {res.passed ? 'PASSED' : 'FAILED'}
                        </span>
                      </div>
                    </div>

                    {/* Visual Comparison for Failed Tests */}
                    {!res.passed && (
                      <div className="mt-2 space-y-2 pt-2 border-t border-coddy-border/60">
                        {res.hidden ? (
                          <div className="rounded bg-slate-900/90 border border-slate-700/60 p-2.5 text-slate-400 text-[11px] font-sans">
                            <div className="flex items-center space-x-1.5 text-amber-400 font-semibold mb-1">
                              <Lock className="h-3 w-3" />
                              <span>Hidden edge-case input failed</span>
                            </div>
                            <p className="text-slate-400">
                              Inputs and expected returns for this test are masked to test general
                              correctness. Make sure your logic handles edge cases (e.g. negative
                              numbers, zeros, or empty strings).
                            </p>
                            {res.errorMessage && (
                              <div className="mt-2 text-rose-300 font-mono text-xs bg-rose-950/40 p-2 rounded border border-rose-500/30">
                                Exception: {cleanPythonError(res.errorMessage)}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            {/* Expected Box: Green Border */}
                            <div className="rounded border border-emerald-500/30 bg-emerald-950/30 p-2.5 text-emerald-300">
                              <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                                <span>Expected</span>
                              </div>
                              <pre className="whitespace-pre-wrap font-mono text-xs text-emerald-200">
                                {res.expected}
                              </pre>
                            </div>

                            {/* Actual Box: Red Border */}
                            <div className="rounded border border-rose-500/30 bg-rose-950/30 p-2.5 text-rose-300">
                              <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                                <span>Actual Output</span>
                              </div>
                              <pre className="whitespace-pre-wrap font-mono text-xs text-rose-200">
                                {cleanPythonError(res.actual) || '(no output)'}
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Primary Action Footer */}
      <div className="flex h-14 shrink-0 items-center justify-between border-t border-coddy-border bg-[#1e293b] px-4 select-none">
        {/* Real Pyodide Engine Status Indicator */}
        <div className="flex items-center space-x-2 text-xs">
          <span
            className={cn(
              'h-2 w-2 rounded-full',
              isPyodideReady ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
            )}
          />
          <span
            className={cn(
              'font-semibold text-xs',
              isPyodideReady ? 'text-emerald-300' : 'text-amber-300'
            )}
          >
            {isPyodideReady ? 'Python 3.12 (WASM Ready)' : 'Loading WebAssembly Engine...'}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Secondary Action: Run Code */}
          <button
            onClick={onRunCode}
            disabled={isRunning || isEvaluatingTests || !isPyodideReady || !isEditorEnabled}
            title={
              !isEditorEnabled ? 'Complete interactive checks on left panel to unlock' : undefined
            }
            className="flex items-center space-x-1.5 rounded-lg border border-coddy-border bg-coddy-dark px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:bg-[#1e293b] hover:text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-current text-cyan-400" />
            )}
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>

          {/* Primary Action: Submit & Run Tests */}
          <button
            onClick={onSubmitTests}
            disabled={isRunning || isEvaluatingTests || !isPyodideReady || !isEditorEnabled}
            title={
              !isEditorEnabled ? 'Complete interactive checks on left panel to unlock' : undefined
            }
            className="flex items-center space-x-2 rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 hover:shadow-emerald-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEvaluatingTests ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            <span>{isEvaluatingTests ? 'Evaluating...' : 'Submit & Run Tests'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
