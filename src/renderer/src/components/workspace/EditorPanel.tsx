import React, { useState, useRef, useEffect } from 'react'
import Editor, { OnMount } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { RotateCcw, Copy, Check, AlertCircle, Target } from 'lucide-react'
import { CODDY_DARK_THEME } from '../../lib/monaco'
import { ConsoleDock, ConsoleLog } from './ConsoleDock'
import { TestCase, TestResult } from '../../types/curriculum'

interface EditorPanelProps {
  code: string
  onChangeCode: (newCode: string) => void
  onResetCode: () => void
  activeConsoleTab: 'console' | 'tests'
  onChangeConsoleTab: (tab: 'console' | 'tests') => void
  isDockExpanded: boolean
  onToggleDockExpanded: () => void
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
  hasMilestoneStarter?: boolean
  onRestoreMilestoneStarter?: () => void
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  code,
  onChangeCode,
  onResetCode,
  activeConsoleTab,
  onChangeConsoleTab,
  isDockExpanded,
  onToggleDockExpanded,
  consoleOutput,
  onClearConsole,
  testCases,
  testResults,
  hasRunTests,
  isRunning,
  isEvaluatingTests,
  isPyodideReady,
  onRunCode,
  onSubmitTests,
  lessonXp,
  isEditorEnabled = true,
  hasMilestoneStarter,
  onRestoreMilestoneStarter
}) => {
  const [copied, setCopied] = useState<boolean>(false)
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false)
  const [showRestoreMilestoneConfirm, setShowRestoreMilestoneConfirm] = useState<boolean>(false)
  const [cursorPosition, setCursorPosition] = useState<{ line: number; col: number }>({
    line: 1,
    col: 1
  })

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const onRunCodeRef = useRef(onRunCode)

  useEffect(() => {
    onRunCodeRef.current = onRunCode
  }, [onRunCode])

  const handleCopy = (): void => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEditorMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor

    // Track cursor movements for the status bar
    editor.onDidChangeCursorPosition((e) => {
      setCursorPosition({
        line: e.position.lineNumber,
        col: e.position.column
      })
    })

    // Register Ctrl + Enter (and Cmd + Enter on macOS) shortcut to trigger Run Code
    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter, () => {
      onRunCodeRef.current()
    })

    editor.focus()
  }

  return (
    <div className="relative flex h-full flex-col bg-coddy-dark overflow-hidden">
      {/* Top Editor Toolbar */}
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-coddy-border bg-[#1e293b] px-4 select-none z-10">
        {/* Active File Tab */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 rounded-t-lg bg-coddy-dark px-3 py-1.5 border-t border-x border-coddy-border text-xs font-semibold text-emerald-400">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-emerald-500/20 text-[10px] font-mono text-emerald-300 font-bold">
              Py
            </span>
            <span>main.py</span>
          </div>
        </div>

        {/* Editor Actions: Reset, Restore Milestone, & Copy */}
        <div className="relative flex items-center space-x-1.5">
          {hasMilestoneStarter && (
            <button
              onClick={() => setShowRestoreMilestoneConfirm(true)}
              title="Restore previous milestone's accepted code"
              className="flex items-center space-x-1 rounded-md px-2 py-1 text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 hover:bg-indigo-500/20 hover:text-indigo-300 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Restore Milestone Starter</span>
            </button>
          )}

          <button
            onClick={() => setShowResetConfirm(true)}
            title="Reset code to original starter template"
            className="flex items-center space-x-1 rounded-md px-2 py-1 text-xs text-slate-400 hover:bg-coddy-border hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset Code</span>
          </button>

          <button
            onClick={handleCopy}
            title="Copy entire code to clipboard"
            className="flex items-center space-x-1 rounded-md px-2 py-1 text-xs text-slate-400 hover:bg-coddy-border hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Reset Confirmation Popover Modal */}
      {showResetConfirm && (
        <div className="absolute top-12 right-6 z-50 flex flex-col space-y-3 rounded-xl border border-amber-500/40 bg-[#1e293b] p-4 shadow-2xl shadow-black/80 backdrop-blur-md max-w-sm">
          <div className="flex items-start space-x-2.5">
            <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Reset Code to Template?</h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                Reset code to original starter template? All current changes will be lost.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-coddy-border">
            <button
              onClick={() => setShowResetConfirm(false)}
              className="rounded-md border border-coddy-border bg-coddy-dark px-3 py-1 text-xs font-medium text-slate-300 hover:bg-coddy-border hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onResetCode()
                setShowResetConfirm(false)
              }}
              className="rounded-md bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow-md hover:bg-rose-500 transition-colors"
            >
              Confirm Reset
            </button>
          </div>
        </div>
      )}

      {/* Restore Milestone Starter Confirmation Modal */}
      {showRestoreMilestoneConfirm && (
        <div className="absolute top-12 right-6 z-50 flex flex-col space-y-3 rounded-xl border border-indigo-500/40 bg-[#1e293b] p-4 shadow-2xl shadow-black/80 backdrop-blur-md max-w-sm">
          <div className="flex items-start space-x-2.5">
            <AlertCircle className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Restore Previous Milestone Code?</h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                Safely restore your accepted passing code from the previous milestone? Any
                uncommitted changes in your current draft will be overwritten.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-coddy-border">
            <button
              onClick={() => setShowRestoreMilestoneConfirm(false)}
              className="rounded-md border border-coddy-border bg-coddy-dark px-3 py-1 text-xs font-medium text-slate-300 hover:bg-coddy-border hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onRestoreMilestoneStarter?.()
                setShowRestoreMilestoneConfirm(false)
              }}
              className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition-colors"
            >
              Confirm Restore
            </button>
          </div>
        </div>
      )}

      {/* Monaco Code Editor Area */}
      <div className="relative flex-1 w-full overflow-hidden bg-coddy-dark">
        <Editor
          height="100%"
          language="python"
          theme={CODDY_DARK_THEME}
          value={code}
          onChange={(value) => onChangeCode(value || '')}
          onMount={handleEditorMount}
          loading={
            <div className="flex h-full w-full items-center justify-center font-mono text-xs text-slate-400">
              Loading Monaco Editor...
            </div>
          }
          options={{
            readOnly: !isEditorEnabled,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
            fontLigatures: true,
            fontSize: 14,
            lineHeight: 22,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            renderLineHighlight: 'line',
            padding: { top: 12, bottom: 12 },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            formatOnType: true,
            formatOnPaste: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
              useShadows: false
            }
          }}
        />

        {/* Focus guidance overlay when on concept check / interactive step */}
        {!isEditorEnabled && (
          <div className="absolute inset-0 bg-coddy-dark/70 backdrop-blur-[1.5px] z-20 flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in duration-200">
            <div className="max-w-sm rounded-2xl border border-cyan-500/30 bg-[#1e293b]/95 p-6 shadow-2xl space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Interactive Step in Progress
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Complete the interactive checks and examples on the left panel. The Python code
                editor will unlock when you reach the Coding Task!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Editor Status Bar */}
      <div className="flex h-6 shrink-0 items-center justify-between border-t border-coddy-border bg-coddy-dark px-3 text-[11px] font-mono text-slate-400 select-none">
        <div className="flex items-center space-x-2">
          <span className="flex items-center space-x-1 text-slate-500">
            <kbd className="rounded bg-[#1e293b] px-1.5 py-0.5 border border-coddy-border text-[10px] text-slate-300 font-sans">
              Ctrl+Enter
            </kbd>
            <span className="text-[10px]">to Run</span>
          </span>
        </div>
        <div className="flex items-center space-x-2.5">
          <span>
            Ln {cursorPosition.line}, Col {cursorPosition.col}
          </span>
          <span className="text-slate-600">•</span>
          <span>Spaces: 4</span>
          <span className="text-slate-600">•</span>
          <span>UTF-8</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-semibold">Python</span>
        </div>
      </div>

      {/* Bottom Dock: Output & Verification Panel */}
      <ConsoleDock
        activeTab={activeConsoleTab}
        onTabChange={onChangeConsoleTab}
        isExpanded={isDockExpanded}
        onToggleExpand={onToggleDockExpanded}
        consoleOutput={consoleOutput}
        onClearConsole={onClearConsole}
        testCases={testCases}
        testResults={testResults}
        hasRunTests={hasRunTests}
        isRunning={isRunning}
        isEvaluatingTests={isEvaluatingTests}
        isPyodideReady={isPyodideReady}
        onRunCode={onRunCode}
        onSubmitTests={onSubmitTests}
        lessonXp={lessonXp}
        isEditorEnabled={isEditorEnabled}
      />
    </div>
  )
}
