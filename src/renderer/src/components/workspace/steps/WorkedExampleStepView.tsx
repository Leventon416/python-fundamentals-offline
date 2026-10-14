import React, { useState } from 'react'
import { Code2, Play, Check, ChevronRight, Terminal, Copy } from 'lucide-react'
import { WorkedExampleStep } from '../../../types/curriculum'
import { playClickSound, playSuccessSound } from '../../../lib/soundEffects'
import { cn } from '../../../lib/utils'

interface WorkedExampleStepViewProps {
  step: WorkedExampleStep
  onContinue: () => void
  onRunCode?: (
    code: string
  ) => Promise<{ stdout: string; error?: string; executionTimeMs?: number }>
}

export const WorkedExampleStepView: React.FC<WorkedExampleStepViewProps> = ({
  step,
  onContinue,
  onRunCode
}) => {
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [output, setOutput] = useState<string | null>(null)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  const handleRunExample = async (): Promise<void> => {
    playClickSound()
    setIsRunning(true)
    try {
      if (onRunCode) {
        const result = await onRunCode(step.code)
        setOutput(result.stdout || (result.error ? `Error: ${result.error}` : '(No output)'))
        setExecutionTime(result.executionTimeMs ?? 10)
      } else {
        // Fallback simulation
        await new Promise((res) => setTimeout(res, 250))
        setOutput(step.expectedStdout)
        setExecutionTime(12)
      }
      playSuccessSound()
    } catch {
      setOutput(step.expectedStdout)
    } finally {
      setIsRunning(false)
    }
  }

  const handleCopyCode = (): void => {
    navigator.clipboard.writeText(step.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-indigo-500/30 bg-linear-to-r from-indigo-950/30 to-[#1e293b] p-5 shadow-lg shadow-black/20">
        <div className="flex items-center space-x-2.5 text-indigo-400 mb-1">
          <Code2 className="h-4 w-4 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider">Worked Example</span>
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">{step.title}</h2>
        {step.description && (
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{step.description}</p>
        )}
      </div>

      {/* Code Snippet Box */}
      <div className="rounded-2xl border border-coddy-border bg-[#0a0f1d] overflow-hidden shadow-xl">
        <div className="flex items-center justify-between border-b border-coddy-border bg-[#1e293b]/70 px-4 py-2.5 text-xs">
          <span className="font-mono text-cyan-400 font-semibold">example.py</span>
          <button
            onClick={handleCopyCode}
            className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-[11px] text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-4 font-mono text-sm text-emerald-300 leading-relaxed overflow-x-auto">
          <code>{step.code}</code>
        </pre>
      </div>

      {/* Interactive Execution Controls & Terminal Output */}
      <div className="rounded-2xl border border-coddy-border bg-[#1e293b]/60 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span>Standard Output Console</span>
          </div>

          <button
            onClick={handleRunExample}
            disabled={isRunning}
            className={cn(
              'flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-md active:scale-95',
              isRunning
                ? 'bg-emerald-600/50 text-white cursor-wait'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20 hover:scale-[1.02]'
            )}
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run Example'}</span>
          </button>
        </div>

        {/* Console display */}
        <div className="rounded-xl border border-black/40 bg-black/60 p-3.5 font-mono text-xs">
          {output !== null ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1 border-b border-white/5 pb-1">
                <span>Output</span>
                {executionTime !== null && <span>⚡ {executionTime}ms</span>}
              </div>
              <div className="text-emerald-400 whitespace-pre-wrap">{output}</div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-slate-500">
              <span>Expected Output:</span>
              <span className="text-slate-400 font-semibold">{step.expectedStdout}</span>
            </div>
          )}
        </div>

        {step.explanation && (
          <div className="text-xs text-slate-300 bg-coddy-dark/70 p-3 rounded-xl border border-coddy-border/60 leading-relaxed">
            <span className="font-semibold text-cyan-400">Explanation: </span>
            {step.explanation}
          </div>
        )}
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onContinue}
          className="flex items-center space-x-2 rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-cyan-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Continue to Concept Check</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
