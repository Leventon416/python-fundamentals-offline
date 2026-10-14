import React from 'react'
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  SkipForward,
  AlertCircle
} from 'lucide-react'
import { PredictOutputStep } from '../../../types/curriculum'
import { StepSubmission } from '../../../store/useQuizStore'
import { cn } from '../../../lib/utils'

interface PredictOutputStepViewProps {
  step: PredictOutputStep
  submission?: StepSubmission
  isReviewMode?: boolean
  onSelectOption: (optionId: string) => void
  onSubmit: () => void
  onRetry: () => void
  onSkip: () => void
  onContinue: () => void
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export const PredictOutputStepView: React.FC<PredictOutputStepViewProps> = ({
  step,
  submission,
  isReviewMode,
  onSelectOption,
  onSubmit,
  onRetry,
  onSkip,
  onContinue
}) => {
  const isSubmitted = !!submission?.isSubmitted
  const isCorrect = !!submission?.isCorrect
  const isSkipped = !!submission?.isSkipped
  const selectedOptionId = submission?.selectedOptionId
  const hasSelection = !!selectedOptionId

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-cyan-500/30 bg-linear-to-r from-cyan-950/30 via-[#1e293b] to-coddy-dark p-5 shadow-lg shadow-black/20">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2.5 text-cyan-400">
            <HelpCircle className="h-4 w-4 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {isReviewMode ? 'Mistake Review • Predict Output' : 'Concept Check • Predict Output'}
            </span>
          </div>
          {isReviewMode && (
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
              Review Queue
            </span>
          )}
        </div>
        <h2 className="text-base font-bold text-white tracking-tight">{step.question}</h2>
      </div>

      {/* Code Snippet Box */}
      <div className="rounded-2xl border border-coddy-border bg-[#0a0f1d] p-4 shadow-xl font-mono text-sm text-cyan-300 leading-relaxed overflow-x-auto">
        <code>{step.codeSnippet}</code>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Select the correct prediction:
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {step.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id
            const letter = OPTION_LETTERS[idx] || `${idx + 1}`

            // Visual state calculation when submitted
            let cardStateClasses =
              'border-[#334155] bg-[#1e293b]/70 hover:border-cyan-500/50 hover:bg-[#1e293b] text-slate-200'

            if (isSelected && !isSubmitted) {
              cardStateClasses =
                'border-cyan-500 bg-cyan-950/40 text-white ring-2 ring-cyan-500/30 shadow-md shadow-cyan-500/10'
            } else if (isSubmitted) {
              if (option.isCorrect) {
                cardStateClasses =
                  'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 ring-2 ring-emerald-500/30'
              } else if (isSelected && !option.isCorrect) {
                cardStateClasses =
                  'border-rose-500/80 bg-rose-950/40 text-rose-200 ring-2 ring-rose-500/30'
              } else {
                cardStateClasses = 'border-[#334155]/60 bg-[#0f172a]/50 text-slate-500 opacity-60'
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => {
                  if (!isSubmitted) onSelectOption(option.id)
                }}
                disabled={isSubmitted}
                className={cn(
                  'flex items-center space-x-3 rounded-xl border p-3.5 text-left transition-all',
                  cardStateClasses,
                  isSubmitted ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                )}
              >
                {/* Letter badge */}
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors',
                    isSelected && !isSubmitted
                      ? 'bg-cyan-500 text-slate-950'
                      : isSubmitted && option.isCorrect
                        ? 'bg-emerald-500 text-slate-950'
                        : isSubmitted && isSelected && !option.isCorrect
                          ? 'bg-rose-500 text-white'
                          : 'bg-coddy-dark text-slate-400 border border-coddy-border'
                  )}
                >
                  {letter}
                </span>

                {/* Option text */}
                <span className="flex-1 font-mono text-xs font-medium">{option.text}</span>

                {/* Status icon after submit */}
                {isSubmitted && option.isCorrect && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                )}
                {isSubmitted && isSelected && !option.isCorrect && (
                  <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                )}
              </button>
            )
          })}
        </div>
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
                    ? 'Correct on First Try! 🎉'
                    : 'Correct! Excellent recovery!'}
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
                <span className="text-rose-300">Not quite right</span>
              </>
            )}
          </div>

          <p className="text-xs leading-relaxed text-slate-300">{submission?.feedback}</p>

          {!isCorrect && !isSkipped && !isReviewMode && (
            <p className="text-[11px] text-amber-400/90 font-medium">
              💡 Don&apos;t worry! This question is queued in your Mistake Review to reinforce
              before coding.
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
                  ? 'bg-linear-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white shadow-cyan-500/20 active:scale-95'
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
