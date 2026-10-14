import React from 'react'
import {
  Edit3,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  SkipForward,
  AlertCircle
} from 'lucide-react'
import { FillBlankStep } from '../../../types/curriculum'
import { StepSubmission } from '../../../store/useQuizStore'
import { cn } from '../../../lib/utils'

interface FillBlankStepViewProps {
  step: FillBlankStep
  submission?: StepSubmission
  isReviewMode?: boolean
  onChangeAnswer: (answer: string) => void
  onSubmit: () => void
  onRetry: () => void
  onSkip: () => void
  onContinue: () => void
}

export const FillBlankStepView: React.FC<FillBlankStepViewProps> = ({
  step,
  submission,
  isReviewMode,
  onChangeAnswer,
  onSubmit,
  onRetry,
  onSkip,
  onContinue
}) => {
  const isSubmitted = !!submission?.isSubmitted
  const isCorrect = !!submission?.isCorrect
  const isSkipped = !!submission?.isSkipped
  const blankAnswer = submission?.blankAnswer || ''
  const hasAnswer = blankAnswer.trim().length > 0

  // Split code template around {{blank}}
  const parts = step.codeTemplate.split('{{blank}}')

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-cyan-500/30 bg-linear-to-r from-cyan-950/30 via-[#1e293b] to-coddy-dark p-5 shadow-lg shadow-black/20">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2.5 text-cyan-400">
            <Edit3 className="h-4 w-4 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {isReviewMode
                ? 'Mistake Review • Fill in the Blank'
                : 'Concept Check • Fill in the Blank'}
            </span>
          </div>
          {isReviewMode && (
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
              Review Queue
            </span>
          )}
        </div>
        <h2 className="text-sm font-semibold text-slate-200">{step.prompt}</h2>
      </div>

      {/* Code Template Box with Embedded Input */}
      <div className="rounded-2xl border border-coddy-border bg-[#0a0f1d] p-5 shadow-xl font-mono text-sm leading-relaxed overflow-x-auto">
        <div className="flex flex-wrap items-center gap-1.5 text-slate-200">
          {parts[0] && <span className="text-cyan-300 whitespace-pre">{parts[0]}</span>}

          {/* Embedded Interactive Input */}
          <input
            type="text"
            value={blankAnswer}
            onChange={(e) => {
              if (!isSubmitted) onChangeAnswer(e.target.value)
            }}
            disabled={isSubmitted}
            placeholder="fill in blank"
            className={cn(
              'rounded-lg px-2.5 py-1 font-mono text-sm border transition-all min-w-30 max-w-60',
              isSubmitted
                ? isCorrect
                  ? 'border-emerald-500 bg-emerald-950/50 text-emerald-300'
                  : 'border-rose-500 bg-rose-950/50 text-rose-300'
                : 'border-cyan-500/50 bg-[#1e293b] text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30'
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && hasAnswer && !isSubmitted) {
                onSubmit()
              }
            }}
          />

          {parts[1] && <span className="text-cyan-300 whitespace-pre">{parts[1]}</span>}
        </div>
      </div>

      {step.hint && !isSubmitted && (
        <div className="text-xs text-slate-400 bg-[#1e293b]/60 p-3 rounded-xl border border-coddy-border/60 flex items-center space-x-2">
          <span className="font-semibold text-amber-400">Hint:</span>
          <span>{step.hint}</span>
        </div>
      )}

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
                    ? 'Perfect! Syntax matches! 🎉'
                    : 'Correct! Great correction!'}
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
                <span className="text-rose-300">Not quite matching</span>
              </>
            )}
          </div>

          <p className="text-xs leading-relaxed text-slate-300">{submission?.feedback}</p>
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
              disabled={!hasAnswer}
              className={cn(
                'flex items-center space-x-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all shadow-md',
                hasAnswer
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
