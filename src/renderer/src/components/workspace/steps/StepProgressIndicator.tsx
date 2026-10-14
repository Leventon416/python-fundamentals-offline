import React from 'react'
import {
  BookOpen,
  Code2,
  HelpCircle,
  Edit3,
  ToggleLeft,
  Bug,
  Target,
  Check,
  AlertCircle
} from 'lucide-react'
import { LessonStep, StepType } from '../../../types/curriculum'
import { StepSubmission } from '../../../store/useQuizStore'
import { cn } from '../../../lib/utils'

interface StepProgressIndicatorProps {
  steps: LessonStep[]
  activeStepIndex: number
  submissions: Record<string, StepSubmission>
  inReviewPhase: boolean
  reviewQueue: string[]
  canAccessStep: (index: number) => boolean
  onSelectStep: (index: number) => void
}

function getStepIcon(type: StepType): React.ReactNode {
  switch (type) {
    case 'explanation':
      return <BookOpen className="h-3.5 w-3.5" />
    case 'worked_example':
      return <Code2 className="h-3.5 w-3.5" />
    case 'predict_output':
      return <HelpCircle className="h-3.5 w-3.5" />
    case 'fill_blank':
      return <Edit3 className="h-3.5 w-3.5" />
    case 'true_false':
      return <ToggleLeft className="h-3.5 w-3.5" />
    case 'identify_error':
      return <Bug className="h-3.5 w-3.5" />
    case 'code_task':
      return <Target className="h-3.5 w-3.5" />
    default:
      return <BookOpen className="h-3.5 w-3.5" />
  }
}

function getStepLabel(step: LessonStep, index: number): string {
  switch (step.type) {
    case 'explanation':
      return 'Theory'
    case 'worked_example':
      return 'Example'
    case 'predict_output':
    case 'fill_blank':
    case 'true_false':
    case 'identify_error':
      return `Check ${index}`
    case 'code_task':
      return 'Code Task'
    default:
      return `Step ${index + 1}`
  }
}

export const StepProgressIndicator: React.FC<StepProgressIndicatorProps> = ({
  steps,
  activeStepIndex,
  submissions,
  inReviewPhase,
  reviewQueue,
  canAccessStep,
  onSelectStep
}) => {
  return (
    <div className="w-full bg-[#111827]/90 border-b border-coddy-border/80 px-4 py-2.5">
      {/* Review mode alert badge if active */}
      {inReviewPhase && (
        <div className="mb-2 flex items-center justify-between rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xs text-amber-300">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
            <span className="font-semibold">Review Mistakes Phase:</span>
            <span className="text-amber-200/90 text-[11px]">
              Reinforce questions missed on first attempt ({reviewQueue.length} remaining)
            </span>
          </div>
          <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">
            Retry Active
          </span>
        </div>
      )}

      {/* Horizontal Stepper Row */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
        {steps.map((step, idx) => {
          const isActive = idx === activeStepIndex
          const sub = submissions[step.id]
          const isPassed = sub?.isSubmitted && sub?.isCorrect
          const isSkipped = sub?.isSubmitted && sub?.isSkipped
          const isMissedInReview = reviewQueue.includes(step.id)
          const isAccessible = canAccessStep(idx)

          return (
            <React.Fragment key={step.id}>
              {idx > 0 && (
                <div
                  className={cn(
                    'h-0.5 w-3 shrink-0 rounded transition-colors',
                    idx <= activeStepIndex ? 'bg-emerald-500/50' : 'bg-coddy-border'
                  )}
                />
              )}

              <button
                onClick={() => {
                  if (isAccessible) onSelectStep(idx)
                }}
                disabled={!isAccessible}
                title={step.title}
                className={cn(
                  'group flex items-center space-x-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all shrink-0',
                  isActive
                    ? 'bg-linear-to-r from-emerald-500/20 to-cyan-500/20 text-white border border-cyan-500/50 shadow-sm shadow-cyan-500/20 ring-1 ring-cyan-500/40'
                    : isMissedInReview
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                      : isPassed
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20'
                        : isSkipped
                          ? 'bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-700'
                          : isAccessible
                            ? 'bg-[#1e293b] text-slate-300 border border-coddy-border hover:bg-coddy-border hover:text-white'
                            : 'bg-[#1e293b]/40 text-slate-600 border border-transparent cursor-not-allowed'
                )}
              >
                {/* Step icon / checkmark */}
                <span
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded-full text-[10px]',
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : isPassed
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isMissedInReview
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'text-slate-400'
                  )}
                >
                  {isPassed ? (
                    <Check className="h-2.5 w-2.5 stroke-3" />
                  ) : isMissedInReview ? (
                    <AlertCircle className="h-2.5 w-2.5" />
                  ) : (
                    getStepIcon(step.type)
                  )}
                </span>

                {/* Step label */}
                <span className="truncate max-w-22.5">{getStepLabel(step, idx)}</span>
              </button>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
