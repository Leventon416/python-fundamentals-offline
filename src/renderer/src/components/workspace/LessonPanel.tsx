import React, { useState, useEffect, useMemo } from 'react'
import {
  Target,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  Lightbulb,
  Code2,
  KeyRound,
  AlertTriangle,
  ArrowDownToLine,
  Eye,
  RotateCcw,
  FolderGit2
} from 'lucide-react'
import { Lesson, LessonStep, getLessonSteps } from '../../types/curriculum'
import { cn } from '../../lib/utils'
import { MarkdownRenderer } from '../common/MarkdownRenderer'
import { useQuizStore } from '../../store/useQuizStore'
import { StepProgressIndicator } from './steps/StepProgressIndicator'
import { ExplanationStepView } from './steps/ExplanationStepView'
import { WorkedExampleStepView } from './steps/WorkedExampleStepView'
import { PredictOutputStepView } from './steps/PredictOutputStepView'
import { FillBlankStepView } from './steps/FillBlankStepView'
import { TrueFalseStepView } from './steps/TrueFalseStepView'
import { IdentifyErrorStepView } from './steps/IdentifyErrorStepView'
import { useCourseStore } from '../../store/useCourseStore'

interface LessonPanelProps {
  lesson: Lesson
  hasPrevious: boolean
  hasNext: boolean
  onPrevious: () => void
  onNext: () => void
  onApplySolution?: (solutionCode: string) => void
  onRunExample?: (
    code: string
  ) => Promise<{ stdout: string; error?: string; executionTimeMs?: number }>
  onStepChange?: (step: LessonStep, stepIndex: number) => void
}

export const LessonPanel: React.FC<LessonPanelProps> = ({
  lesson,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  onApplySolution,
  onRunExample,
  onStepChange
}) => {
  // Normalize lesson into steps
  const steps = useMemo(() => getLessonSteps(lesson), [lesson])

  // Connect to useQuizStore
  const {
    getLessonState,
    setActiveStepIndex,
    selectOption,
    selectBoolean,
    setBlankAnswer,
    submitStep,
    retryStep,
    skipStep,
    nextStep,
    prevStep,
    canAccessStep,
    resetLessonQuiz
  } = useQuizStore()

  const quizState = getLessonState(lesson.id)
  const rawActiveStepIndex = quizState.activeStepIndex ?? 0
  const activeStepIndex = Math.min(rawActiveStepIndex, Math.max(0, steps.length - 1))
  const activeStep = steps[activeStepIndex] || steps[0]

  // Inform parent workspace whenever active step changes
  useEffect(() => {
    if (activeStep) {
      onStepChange?.(activeStep, activeStepIndex)
    }
  }, [activeStep, activeStepIndex, onStepChange])

  // Hint drawer expansion for code_task
  const [showHints, setShowHints] = useState<boolean>(false)
  const [revealedTiers, setRevealedTiers] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false
  })
  const [showSolutionConfirm, setShowSolutionConfirm] = useState<boolean>(false)
  const [isSolutionRevealed, setIsSolutionRevealed] = useState<boolean>(false)
  const [copiedSolution, setCopiedSolution] = useState<boolean>(false)
  const [appliedSolution, setAppliedSolution] = useState<boolean>(false)

  // Reset hint reveals when lesson changes (adjusting state during render avoids cascading effect renders)
  const [prevLessonId, setPrevLessonId] = useState<string>(lesson.id)
  if (prevLessonId !== lesson.id) {
    setPrevLessonId(lesson.id)
    setRevealedTiers({ 1: false, 2: false, 3: false })
    setShowSolutionConfirm(false)
    setIsSolutionRevealed(false)
    setCopiedSolution(false)
    setAppliedSolution(false)
  }

  const recordSolutionRevealed = useCourseStore((state) => state.recordSolutionRevealed)

  const toggleTier = (tier: number): void => {
    setRevealedTiers((prev) => ({
      ...prev,
      [tier]: !prev[tier]
    }))
  }

  const handleConfirmRevealSolution = (): void => {
    recordSolutionRevealed(lesson.id)
    setShowSolutionConfirm(false)
    setIsSolutionRevealed(true)
    setRevealedTiers((prev) => ({ ...prev, 3: true }))
  }

  const handleCopySolution = (): void => {
    const solution =
      (activeStep.type === 'code_task' ? activeStep.solutionCode : undefined) || lesson.solutionCode
    if (solution) {
      navigator.clipboard.writeText(solution)
      setCopiedSolution(true)
      setTimeout(() => setCopiedSolution(false), 2000)
    }
  }

  const handlePasteSolution = (): void => {
    const solution =
      (activeStep.type === 'code_task' ? activeStep.solutionCode : undefined) || lesson.solutionCode
    if (solution && onApplySolution) {
      onApplySolution(solution)
      setAppliedSolution(true)
      setTimeout(() => setAppliedSolution(false), 2000)
    }
  }

  // Category display
  const categoryLabel = lesson.category
    ? lesson.category.charAt(0).toUpperCase() + lesson.category.slice(1).replace('_', ' ')
    : 'Concept'

  const activeSubmission = activeStep ? quizState.submissions[activeStep.id] : undefined
  const isReviewMode =
    quizState.inReviewPhase && quizState.reviewQueue.includes(activeStep?.id || '')

  const currentHints =
    activeStep.type === 'code_task' && activeStep.hints ? activeStep.hints : lesson.hints
  const tier1Hint = currentHints?.[0]
  const tier2Hint = currentHints?.[1]

  return (
    <div className="flex h-full flex-col bg-[#1e293b]/70 border-r border-coddy-border select-text">
      {/* Lesson Header */}
      <div className="shrink-0 border-b border-coddy-border p-5 bg-[#1e293b]">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2">
            <span className="rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              {lesson.chapterTitle || 'Python Fundamentals'}
            </span>
            {lesson.category === 'project_step' ? (
              <span className="flex items-center space-x-1 rounded-md bg-indigo-500/15 px-2.5 py-0.5 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                <FolderGit2 className="h-3 w-3 text-indigo-400" />
                <span>
                  Project Milestone{' '}
                  {lesson.milestoneIndex
                    ? `${lesson.milestoneIndex}/${lesson.totalMilestones || 4}`
                    : ''}
                </span>
              </span>
            ) : (
              <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-semibold text-purple-400 border border-purple-500/20">
                {categoryLabel}
              </span>
            )}
            <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
              {lesson.difficulty}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
              <span>+{lesson.xp} XP</span>
            </div>

            <button
              onClick={() => resetLessonQuiz(lesson.id)}
              title="Reset all quiz steps in this lesson"
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-coddy-border transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-white flex items-center space-x-2">
          <span className="font-mono text-emerald-400">{lesson.lessonNumber}</span>
          <span>{lesson.title}</span>
        </h1>

        {lesson.category === 'project_step' && (
          <div className="mt-3 flex items-start space-x-2.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 p-3 text-xs text-indigo-200">
            <FolderGit2 className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">
              <span className="font-semibold text-indigo-300">Code Carry-Forward: </span>
              {lesson.milestoneIndex && lesson.milestoneIndex > 1
                ? `Milestone ${lesson.milestoneIndex} preloads your accepted passing code from Milestone ${lesson.milestoneIndex - 1}. Earlier milestone features are carried forward and validated cumulatively.`
                : 'This is Milestone 1 of the Project. When you submit passing code, it will automatically carry forward as the starter code for subsequent milestones.'}
            </div>
          </div>
        )}
      </div>

      {/* Step Progress Indicator Stepper */}
      <StepProgressIndicator
        steps={steps}
        activeStepIndex={activeStepIndex}
        submissions={quizState.submissions}
        inReviewPhase={quizState.inReviewPhase}
        reviewQueue={quizState.reviewQueue}
        canAccessStep={(idx) => canAccessStep(lesson.id, idx, steps)}
        onSelectStep={(idx) => setActiveStepIndex(lesson.id, idx)}
      />

      {/* Main Dynamic Step Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Render Step View by Type */}
        {activeStep.type === 'explanation' && (
          <ExplanationStepView step={activeStep} onContinue={() => nextStep(lesson.id, steps)} />
        )}

        {activeStep.type === 'worked_example' && (
          <WorkedExampleStepView
            step={activeStep}
            onContinue={() => nextStep(lesson.id, steps)}
            onRunCode={onRunExample}
          />
        )}

        {activeStep.type === 'predict_output' && (
          <PredictOutputStepView
            step={activeStep}
            submission={activeSubmission}
            isReviewMode={isReviewMode}
            onSelectOption={(optId) => selectOption(lesson.id, activeStep.id, optId)}
            onSubmit={() => submitStep(lesson.id, activeStep)}
            onRetry={() => retryStep(lesson.id, activeStep.id)}
            onSkip={() => skipStep(lesson.id, activeStep)}
            onContinue={() => nextStep(lesson.id, steps)}
          />
        )}

        {activeStep.type === 'fill_blank' && (
          <FillBlankStepView
            step={activeStep}
            submission={activeSubmission}
            isReviewMode={isReviewMode}
            onChangeAnswer={(ans) => setBlankAnswer(lesson.id, activeStep.id, ans)}
            onSubmit={() => submitStep(lesson.id, activeStep)}
            onRetry={() => retryStep(lesson.id, activeStep.id)}
            onSkip={() => skipStep(lesson.id, activeStep)}
            onContinue={() => nextStep(lesson.id, steps)}
          />
        )}

        {activeStep.type === 'true_false' && (
          <TrueFalseStepView
            step={activeStep}
            submission={activeSubmission}
            isReviewMode={isReviewMode}
            onSelectBoolean={(val) => selectBoolean(lesson.id, activeStep.id, val)}
            onSubmit={() => submitStep(lesson.id, activeStep)}
            onRetry={() => retryStep(lesson.id, activeStep.id)}
            onSkip={() => skipStep(lesson.id, activeStep)}
            onContinue={() => nextStep(lesson.id, steps)}
          />
        )}

        {activeStep.type === 'identify_error' && (
          <IdentifyErrorStepView
            step={activeStep}
            submission={activeSubmission}
            isReviewMode={isReviewMode}
            onSelectOption={(optId) => selectOption(lesson.id, activeStep.id, optId)}
            onSubmit={() => submitStep(lesson.id, activeStep)}
            onRetry={() => retryStep(lesson.id, activeStep.id)}
            onSkip={() => skipStep(lesson.id, activeStep)}
            onContinue={() => nextStep(lesson.id, steps)}
          />
        )}

        {activeStep.type === 'code_task' && (
          <div className="space-y-6">
            {/* Task Callout Card with Emerald Target Styling */}
            <div className="rounded-2xl border-2 border-emerald-500/40 bg-linear-to-br from-emerald-950/40 via-[#1e293b] to-coddy-dark p-5 shadow-xl shadow-emerald-500/10">
              <div className="flex items-center space-x-2.5 text-emerald-400 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/40 shadow-sm shadow-emerald-500/20">
                  <Target className="h-4 w-4 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-wider uppercase text-white">
                    Your Task
                  </h3>
                  <span className="text-[11px] text-emerald-400/90 font-medium">
                    Read instructions carefully
                  </span>
                </div>
              </div>

              <div className="text-sm font-medium text-slate-100 mb-4 leading-relaxed bg-coddy-dark/60 p-3 rounded-xl border border-emerald-500/20">
                <MarkdownRenderer content={activeStep.objective || lesson.taskObjective} />
              </div>

              <div className="space-y-2 pl-0.5">
                {(activeStep.instructions || lesson.taskInstructions).map((instruction, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-2.5 text-xs text-slate-200 bg-[#1e293b]/70 p-2.5 rounded-lg border border-coddy-border/60"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <MarkdownRenderer content={instruction} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3-Tier Progressive Hint System & Solution Reveal */}
            <div className="rounded-2xl border border-coddy-border bg-coddy-dark/90 overflow-hidden shadow-lg shadow-black/40">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#1e293b]/60"
              >
                <div className="flex items-center space-x-2.5 text-xs font-semibold text-slate-200">
                  <HelpCircle className="h-4 w-4 text-amber-400" />
                  <span>Need Help? Hints & Solution</span>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                    3 Tiers Available
                  </span>
                </div>
                {showHints ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </button>

              {showHints && (
                <div className="border-t border-coddy-border p-4 space-y-4 bg-coddy-dark">
                  {/* Tier 1: Conceptual Nudge */}
                  <div className="rounded-xl border border-amber-500/30 bg-[#1e293b]/60 overflow-hidden">
                    <button
                      onClick={() => toggleTier(1)}
                      className="flex w-full items-center justify-between p-3 text-left hover:bg-coddy-border/40 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-500/20 text-amber-400 text-xs">
                          <Lightbulb className="h-3 w-3" />
                        </span>
                        <span className="text-xs font-bold text-amber-300">
                          Tier 1 • Conceptual Nudge
                        </span>
                        <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/20">
                          Free
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {revealedTiers[1] ? 'Hide' : 'Reveal Clue'}
                      </span>
                    </button>

                    {revealedTiers[1] && (
                      <div className="border-t border-amber-500/20 p-3 bg-coddy-dark/70 text-xs text-slate-300 space-y-1">
                        <div className="font-semibold text-amber-400 text-[11px]">
                          {tier1Hint?.title || 'Conceptual Clue'}
                        </div>
                        <MarkdownRenderer
                          content={
                            tier1Hint?.content ||
                            tier1Hint?.text ||
                            'Review the theory step for key concepts and syntax rules.'
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Tier 2: Syntax Skeleton */}
                  <div className="rounded-xl border border-cyan-500/30 bg-[#1e293b]/60 overflow-hidden">
                    <button
                      onClick={() => toggleTier(2)}
                      className="flex w-full items-center justify-between p-3 text-left hover:bg-coddy-border/40 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded bg-cyan-500/20 text-cyan-400 text-xs">
                          <Code2 className="h-3 w-3" />
                        </span>
                        <span className="text-xs font-bold text-cyan-300">
                          Tier 2 • Syntax Skeleton
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {revealedTiers[2] ? 'Hide' : 'Reveal Structure'}
                      </span>
                    </button>

                    {revealedTiers[2] && (
                      <div className="border-t border-cyan-500/20 p-3 bg-coddy-dark/70 text-xs text-slate-300 space-y-2">
                        <div className="font-semibold text-cyan-400 text-[11px]">
                          {tier2Hint?.title || 'Code Structure'}
                        </div>
                        <MarkdownRenderer
                          content={
                            tier2Hint?.content ||
                            tier2Hint?.text ||
                            'Use the exact function signature shown in the worked example.'
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Tier 3: Reference Solution */}
                  <div className="rounded-xl border border-purple-500/30 bg-[#1e293b]/60 overflow-hidden">
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded bg-purple-500/20 text-purple-400 text-xs">
                          <KeyRound className="h-3 w-3" />
                        </span>
                        <span className="text-xs font-bold text-purple-300">
                          Tier 3 • Full Reference Solution
                        </span>
                      </div>

                      {!isSolutionRevealed ? (
                        <button
                          onClick={() => setShowSolutionConfirm(true)}
                          className="flex items-center space-x-1 rounded-lg bg-purple-600/30 border border-purple-500/40 px-2.5 py-1 text-[11px] font-bold text-purple-200 hover:bg-purple-600/50 hover:text-white transition-all active:scale-95"
                        >
                          <Eye className="h-3 w-3" />
                          <span>Show Solution</span>
                        </button>
                      ) : (
                        <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                          <Check className="h-3 w-3" /> Revealed
                        </span>
                      )}
                    </div>

                    {showSolutionConfirm && !isSolutionRevealed && (
                      <div className="border-t border-purple-500/30 p-3.5 bg-purple-950/30 space-y-3">
                        <div className="flex items-start space-x-2.5 text-xs text-purple-200">
                          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-white text-xs">
                              Reveal full reference solution?
                            </p>
                            <p className="text-[11px] text-purple-300/90 mt-0.5 leading-relaxed">
                              We strongly recommend trying to solve it yourself first! Revealing the
                              solution will show the complete code.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-end space-x-2 pt-1">
                          <button
                            onClick={() => setShowSolutionConfirm(false)}
                            className="rounded-lg border border-coddy-border bg-coddy-dark px-3 py-1 text-xs font-medium text-slate-300 hover:bg-coddy-border hover:text-white transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleConfirmRevealSolution}
                            className="rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 px-3 py-1 text-xs font-bold text-white shadow-md hover:from-purple-500 hover:to-indigo-500 transition-colors active:scale-95"
                          >
                            Reveal Solution
                          </button>
                        </div>
                      </div>
                    )}

                    {isSolutionRevealed && (activeStep.solutionCode || lesson.solutionCode) && (
                      <div className="border-t border-purple-500/30 p-3.5 bg-coddy-dark space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                            Python Reference Solution
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={handleCopySolution}
                              className="flex items-center space-x-1 rounded bg-[#1e293b] border border-coddy-border px-2 py-1 text-[11px] font-medium text-slate-300 hover:text-white hover:bg-coddy-border transition-colors"
                              title="Copy reference solution to clipboard"
                            >
                              {copiedSolution ? (
                                <>
                                  <Check className="h-3 w-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>

                            {onApplySolution && (
                              <button
                                onClick={handlePasteSolution}
                                className="flex items-center space-x-1 rounded bg-emerald-600/30 border border-emerald-500/40 px-2 py-1 text-[11px] font-bold text-emerald-300 hover:bg-emerald-600/50 hover:text-white transition-colors active:scale-95"
                                title="Paste reference solution directly into Monaco Editor"
                              >
                                {appliedSolution ? (
                                  <>
                                    <Check className="h-3 w-3 text-emerald-300" />
                                    <span>Pasted!</span>
                                  </>
                                ) : (
                                  <>
                                    <ArrowDownToLine className="h-3 w-3" />
                                    <span>Paste into Editor</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="rounded-xl border border-purple-500/20 bg-[#0a0f1d] p-3 font-mono text-xs text-purple-200 overflow-x-auto leading-relaxed">
                          <pre>
                            <code>{activeStep.solutionCode || lesson.solutionCode}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation: Step & Lesson Controls */}
      <div className="shrink-0 flex items-center justify-between border-t border-coddy-border bg-[#1e293b] p-4">
        {activeStepIndex > 0 ? (
          <button
            onClick={() => prevStep(lesson.id)}
            className="flex items-center space-x-1.5 rounded-lg border border-coddy-border bg-coddy-dark px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-coddy-border hover:text-white transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Step</span>
          </button>
        ) : (
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={cn(
              'flex items-center space-x-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all',
              hasPrevious
                ? 'border-coddy-border bg-coddy-dark text-slate-200 hover:bg-coddy-border hover:text-white'
                : 'border-slate-800 bg-coddy-dark/40 text-slate-600 cursor-not-allowed'
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Lesson</span>
          </button>
        )}

        <div className="text-[11px] font-mono text-slate-400">
          Step {activeStepIndex + 1} of {steps.length}
        </div>

        {activeStepIndex < steps.length - 1 ? (
          <button
            onClick={() => nextStep(lesson.id, steps)}
            className="flex items-center space-x-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all"
          >
            <span>Next Step</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={cn(
              'flex items-center space-x-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all',
              hasNext
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300'
                : 'border-slate-800 bg-coddy-dark/40 text-slate-600 cursor-not-allowed'
            )}
          >
            <span>Next Lesson</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
