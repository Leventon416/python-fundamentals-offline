import React from 'react'
import {
  ToggleLeft,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  SkipForward,
  AlertCircle,
  Check,
  X
} from 'lucide-react'
import { TrueFalseStep } from '../../../types/curriculum'
import { StepSubmission } from '../../../store/useQuizStore'
import { cn } from '../../../lib/utils'

interface TrueFalseStepViewProps {
  step: TrueFalseStep
  submission?: StepSubmission
  isReviewMode?: boolean
  onSelectBoolean: (value: boolean) => void
  onSubmit: () => void
  onRetry: () => void
  onSkip: () => void
  onContinue: () => void
}

export const TrueFalseStepView: React.FC<TrueFalseStepViewProps> = ({
  step,
  submission,
  isReviewMode,
  onSelectBoolean,
  onSubmit,
  onRetry,
  onSkip,
  onContinue
}) => {
  const isSubmitted = !!submission?.isSubmitted
  const isCorrect = !!submission?.isCorrect
  const isSkipped = !!submission?.isSkipped
  const selectedBoolean = submission?.selectedBoolean
  const hasSelection = selectedBoolean !== undefined

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-emerald-500/30 bg-linear-to-r from-emerald-950/30 via-[#1e293b] to-coddy-dark p-5 shadow-lg shadow-black/20">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2.5 text-emerald-400">
            <ToggleLeft className="h-4 w-4 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {isReviewMode ? 'Mistake Review • True or False' : 'Concept Check • True or False'}
            </span>
          </div>
          {isReviewMode && (
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
              Review Queue
            </span>
          )}
        </div>
        <h2 className="text-sm font-semibold text-slate-300">Evaluate the statement below:</h2>
      </div>

      {/* Statement Card */}
      <div className="rounded-2xl border border-coddy-border bg-[#0a0f1d] p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-1.5 bg-emerald-500/60" />
        <p className="text-sm text-white font-medium leading-relaxed pl-2">
          &ldquo;{step.statement}&rdquo;
        </p>
      </div>

      {/* True / False Pill Cards */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* TRUE Option */}
        <button
          onClick={() => {
            if (!isSubmitted) onSelectBoolean(true)
          }}
          disabled={isSubmitted}
          className={cn(
            'flex flex-col items-center justify-center rounded-2xl border p-5 transition-all text-center space-y-2',
            selectedBoolean === true && !isSubmitted
              ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10'
              : isSubmitted
                ? step.correctAnswer === true
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-2 ring-emerald-500/30'
                  : selectedBoolean === true
                    ? 'border-rose-500 bg-rose-950/40 text-rose-200'
                    : 'border-coddy-border/60 bg-coddy-dark/50 text-slate-500 opacity-60'
                : 'border-coddy-border bg-[#1e293b]/70 hover:border-emerald-500/50 hover:bg-[#1e293b] text-slate-200 cursor-pointer active:scale-[0.98]'
          )}
        >
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl border',
              selectedBoolean === true
                ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                : 'border-coddy-border bg-coddy-dark text-slate-400'
            )}
          >
            <Check className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="text-sm font-extrabold tracking-wide uppercase">True</span>
        </button>

        {/* FALSE Option */}
        <button
          onClick={() => {
            if (!isSubmitted) onSelectBoolean(false)
          }}
          disabled={isSubmitted}
          className={cn(
            'flex flex-col items-center justify-center rounded-2xl border p-5 transition-all text-center space-y-2',
            selectedBoolean === false && !isSubmitted
              ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/10'
              : isSubmitted
                ? step.correctAnswer === false
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-2 ring-emerald-500/30'
                  : selectedBoolean === false
                    ? 'border-rose-500 bg-rose-950/40 text-rose-200'
                    : 'border-coddy-border/60 bg-coddy-dark/50 text-slate-500 opacity-60'
                : 'border-coddy-border bg-[#1e293b]/70 hover:border-cyan-500/50 hover:bg-[#1e293b] text-slate-200 cursor-pointer active:scale-[0.98]'
          )}
        >
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl border',
              selectedBoolean === false
                ? 'border-cyan-500/40 bg-cyan-500/20 text-cyan-300'
                : 'border-coddy-border bg-coddy-dark text-slate-400'
            )}
          >
            <X className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="text-sm font-extrabold tracking-wide uppercase">False</span>
        </button>
      </div>

      {/* Feedback Banner upon submission */}
      {isSubmitted && (
        <div
          className={cn(
            'rounded-2xl border p-4 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200',
            isCorrect
              ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200'
              : isSkipped
                ? 'border-amber-500/40 bg-amber-950/30 text-amber-200'
                : 'border-rose-500/40 bg-rose-950/30 text-rose-200'
          )}
        >
          <div className="flex items-center space-x-2 font-bold text-xs">
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-300">
                  {submission?.firstAttemptCorrect
                    ? 'Spot on! Correct! 🎉'
                    : 'Correct! Well done on reviewing!'}
                </span>
              </>
            ) : isSkipped ? (
              <>
                <AlertCircle className="h-4 w-4 text-amber-400" />
                <span className="text-amber-300">Question Skipped</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-rose-400" />
                <span className="text-rose-300">
                  The statement is {step.correctAnswer ? 'True' : 'False'}
                </span>
              </>
            )}
          </div>

          <p className="text-xs leading-relaxed text-slate-300">{submission?.feedback}</p>

          {!isCorrect && !isSkipped && !isReviewMode && (
            <p className="text-[11px] text-amber-400/90 font-medium">
              💡 Don&apos;t worry! This rule will be queued for mistake review before coding.
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-coddy-border/60">
        {!isSubmitted ? (
          <>
            <button
              onClick={onSkip}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <SkipForward className="h-3.5 w-3.5" />
              <span>Skip Question</span>
            </button>

            <button
              onClick={onSubmit}
              disabled={!hasSelection}
              className={cn(
                'flex items-center space-x-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all shadow-md',
                hasSelection
                  ? 'bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-emerald-500/20 active:scale-95'
                  : 'bg-coddy-border/50 text-slate-500 border border-coddy-border cursor-not-allowed'
              )}
            >
              <span>Submit Answer</span>
            </button>
          </>
        ) : (
          <>
            {!isCorrect ? (
              <button
                onClick={onRetry}
                className="flex items-center space-x-1.5 rounded-lg border border-coddy-border bg-[#1e293b] px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-coddy-border hover:text-white transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Try Again</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={onContinue}
              className="flex items-center space-x-2 rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-cyan-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Continue</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
