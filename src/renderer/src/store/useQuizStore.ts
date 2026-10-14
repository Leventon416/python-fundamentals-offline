import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { LessonStep } from '../types/curriculum'
import { playSuccessSound, playFailureSound, playClickSound } from '../lib/soundEffects'

export interface StepSubmission {
  selectedOptionId?: string
  selectedBoolean?: boolean
  blankAnswer?: string
  isSubmitted: boolean
  isCorrect: boolean
  isSkipped: boolean
  feedback: string
  firstAttemptCorrect?: boolean
  attemptsCount: number
}

export interface LessonQuizState {
  activeStepIndex: number
  submissions: Record<string, StepSubmission>
  missedQuestionIds: string[]
  reviewQueue: string[]
  inReviewPhase: boolean
  mistakesReviewed: boolean
}

export interface QuizStoreState {
  lessons: Record<string, LessonQuizState>

  // Selectors & state helpers
  getLessonState: (lessonId: string) => LessonQuizState
  getActiveStepSubmission: (lessonId: string, stepId: string) => StepSubmission | undefined

  // User input actions
  setActiveStepIndex: (lessonId: string, index: number) => void
  selectOption: (lessonId: string, stepId: string, optionId: string) => void
  selectBoolean: (lessonId: string, stepId: string, value: boolean) => void
  setBlankAnswer: (lessonId: string, stepId: string, answer: string) => void

  // Submission & evaluation
  submitStep: (lessonId: string, step: LessonStep) => { isCorrect: boolean; feedback: string }
  retryStep: (lessonId: string, stepId: string) => void
  skipStep: (lessonId: string, step: LessonStep) => void

  // Stepper navigation & review queue
  nextStep: (lessonId: string, steps: LessonStep[]) => void
  prevStep: (lessonId: string) => void
  canAccessStep: (lessonId: string, targetIndex: number, steps: LessonStep[]) => boolean
  startReviewPhase: (lessonId: string, steps: LessonStep[]) => void
  resetLessonQuiz: (lessonId: string) => void
}

export function normalizeAnswer(ans: string): string {
  return ans.trim().replace(/\s+/g, ' ').replace(/['"]/g, '"')
}

export function isAnswerAccepted(input: string, acceptedAnswers: string[]): boolean {
  const normInput = normalizeAnswer(input)
  return acceptedAnswers.some((accepted) => {
    const normAccepted = normalizeAnswer(accepted)
    return normInput === normAccepted || normInput.toLowerCase() === normAccepted.toLowerCase()
  })
}

const defaultLessonState: LessonQuizState = {
  activeStepIndex: 0,
  submissions: {},
  missedQuestionIds: [],
  reviewQueue: [],
  inReviewPhase: false,
  mistakesReviewed: false
}

export const useQuizStore = create<QuizStoreState>()(
  persist(
    (set, get) => ({
      lessons: {},

      getLessonState: (lessonId: string): LessonQuizState => {
        return get().lessons[lessonId] || defaultLessonState
      },

      getActiveStepSubmission: (lessonId: string, stepId: string): StepSubmission | undefined => {
        const state = get().lessons[lessonId]
        return state?.submissions[stepId]
      },

      setActiveStepIndex: (lessonId: string, index: number) => {
        set((state) => {
          const lessonState = state.lessons[lessonId] || { ...defaultLessonState }
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...lessonState,
                activeStepIndex: index
              }
            }
          }
        })
      },

      selectOption: (lessonId: string, stepId: string, optionId: string) => {
        playClickSound()
        set((state) => {
          const lessonState = state.lessons[lessonId] || { ...defaultLessonState }
          const currentSub = lessonState.submissions[stepId] || {
            isSubmitted: false,
            isCorrect: false,
            isSkipped: false,
            feedback: '',
            attemptsCount: 0
          }

          if (currentSub.isSubmitted) return state

          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...lessonState,
                submissions: {
                  ...lessonState.submissions,
                  [stepId]: {
                    ...currentSub,
                    selectedOptionId: optionId
                  }
                }
              }
            }
          }
        })
      },

      selectBoolean: (lessonId: string, stepId: string, value: boolean) => {
        playClickSound()
        set((state) => {
          const lessonState = state.lessons[lessonId] || { ...defaultLessonState }
          const currentSub = lessonState.submissions[stepId] || {
            isSubmitted: false,
            isCorrect: false,
            isSkipped: false,
            feedback: '',
            attemptsCount: 0
          }

          if (currentSub.isSubmitted) return state

          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...lessonState,
                submissions: {
                  ...lessonState.submissions,
                  [stepId]: {
                    ...currentSub,
                    selectedBoolean: value
                  }
                }
              }
            }
          }
        })
      },

      setBlankAnswer: (lessonId: string, stepId: string, answer: string) => {
        set((state) => {
          const lessonState = state.lessons[lessonId] || { ...defaultLessonState }
          const currentSub = lessonState.submissions[stepId] || {
            isSubmitted: false,
            isCorrect: false,
            isSkipped: false,
            feedback: '',
            attemptsCount: 0
          }

          if (currentSub.isSubmitted) return state

          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...lessonState,
                submissions: {
                  ...lessonState.submissions,
                  [stepId]: {
                    ...currentSub,
                    blankAnswer: answer
                  }
                }
              }
            }
          }
        })
      },

      submitStep: (lessonId: string, step: LessonStep) => {
        const state = get()
        const lessonState = state.lessons[lessonId] || { ...defaultLessonState }
        const currentSub = lessonState.submissions[step.id] || {
          isSubmitted: false,
          isCorrect: false,
          isSkipped: false,
          feedback: '',
          attemptsCount: 0
        }

        let isCorrect = false
        let feedback = ''

        switch (step.type) {
          case 'predict_output': {
            const selectedOpt = step.options.find((o) => o.id === currentSub.selectedOptionId)
            isCorrect = !!selectedOpt?.isCorrect
            feedback =
              selectedOpt?.explanation || (isCorrect ? 'Correct!' : 'Incorrect option selected.')
            break
          }
          case 'fill_blank': {
            isCorrect = isAnswerAccepted(currentSub.blankAnswer || '', step.acceptedAnswers)
            feedback = isCorrect
              ? step.explanation || 'Great job! Syntax matches perfectly.'
              : `Not quite right. ${step.explanation || 'Review the expected syntax.'}`
            break
          }
          case 'true_false': {
            isCorrect = currentSub.selectedBoolean === step.correctAnswer
            feedback =
              step.explanation ||
              (isCorrect
                ? 'Correct assessment!'
                : `Incorrect. The statement is ${step.correctAnswer ? 'True' : 'False'}.`)
            break
          }
          case 'identify_error': {
            const selectedOpt = step.options.find((o) => o.id === currentSub.selectedOptionId)
            isCorrect = !!selectedOpt?.isCorrect
            feedback =
              selectedOpt?.explanation ||
              (isCorrect ? 'Correct bug identified!' : 'Misconception not quite right.')
            break
          }
          default:
            isCorrect = true
            feedback = 'Completed.'
            break
        }

        const isFirstAttempt = currentSub.attemptsCount === 0
        const firstAttemptCorrect = isFirstAttempt ? isCorrect : currentSub.firstAttemptCorrect

        const updatedMissed = [...lessonState.missedQuestionIds]
        const updatedReviewQueue = [...lessonState.reviewQueue]

        if (isFirstAttempt && !isCorrect) {
          if (!updatedMissed.includes(step.id)) {
            updatedMissed.push(step.id)
          }
          if (!updatedReviewQueue.includes(step.id)) {
            updatedReviewQueue.push(step.id)
          }
        }

        // If in review mode and answered correctly, remove from review queue
        if (lessonState.inReviewPhase && isCorrect) {
          const idx = updatedReviewQueue.indexOf(step.id)
          if (idx !== -1) {
            updatedReviewQueue.splice(idx, 1)
          }
        }

        if (isCorrect) {
          playSuccessSound()
        } else {
          playFailureSound()
        }

        const newSub: StepSubmission = {
          ...currentSub,
          isSubmitted: true,
          isCorrect,
          feedback,
          firstAttemptCorrect,
          attemptsCount: currentSub.attemptsCount + 1
        }

        set((s) => ({
          lessons: {
            ...s.lessons,
            [lessonId]: {
              ...lessonState,
              submissions: {
                ...lessonState.submissions,
                [step.id]: newSub
              },
              missedQuestionIds: updatedMissed,
              reviewQueue: updatedReviewQueue
            }
          }
        }))

        return { isCorrect, feedback }
      },

      retryStep: (lessonId: string, stepId: string) => {
        playClickSound()
        set((state) => {
          const lessonState = state.lessons[lessonId] || { ...defaultLessonState }
          const currentSub = lessonState.submissions[stepId]
          if (!currentSub) return state

          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...lessonState,
                submissions: {
                  ...lessonState.submissions,
                  [stepId]: {
                    ...currentSub,
                    isSubmitted: false
                  }
                }
              }
            }
          }
        })
      },

      skipStep: (lessonId: string, step: LessonStep) => {
        playClickSound()
        set((state) => {
          const lessonState = state.lessons[lessonId] || { ...defaultLessonState }
          const currentSub = lessonState.submissions[step.id] || {
            isSubmitted: false,
            isCorrect: false,
            isSkipped: false,
            feedback: '',
            attemptsCount: 0
          }

          let explanation = ''
          if (step.type === 'predict_output' || step.type === 'identify_error') {
            const correctOpt = step.options.find((o) => o.isCorrect)
            explanation = correctOpt
              ? `Correct answer: "${correctOpt.text}". ${correctOpt.explanation}`
              : 'Question skipped.'
          } else if (step.type === 'fill_blank') {
            explanation = `Accepted answer: "${step.acceptedAnswers[0]}". ${step.explanation}`
          } else if (step.type === 'true_false') {
            explanation = `The statement is ${step.correctAnswer ? 'True' : 'False'}. ${step.explanation}`
          } else {
            explanation = 'Step skipped.'
          }

          const updatedReviewQueue = lessonState.reviewQueue.filter((id) => id !== step.id)

          const newSub: StepSubmission = {
            ...currentSub,
            isSubmitted: true,
            isCorrect: false,
            isSkipped: true,
            feedback: `Skipped: ${explanation}`,
            firstAttemptCorrect:
              currentSub.attemptsCount === 0 ? false : currentSub.firstAttemptCorrect,
            attemptsCount: currentSub.attemptsCount + 1
          }

          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...lessonState,
                submissions: {
                  ...lessonState.submissions,
                  [step.id]: newSub
                },
                reviewQueue: updatedReviewQueue
              }
            }
          }
        })
      },

      nextStep: (lessonId: string, steps: LessonStep[]) => {
        playClickSound()
        const state = get()
        const lessonState = state.lessons[lessonId] || { ...defaultLessonState }
        const { activeStepIndex, inReviewPhase, reviewQueue } = lessonState

        // Case 1: In Review Phase
        if (inReviewPhase) {
          if (reviewQueue.length === 0) {
            // All mistakes reviewed! Jump to code_task
            const codeTaskIndex = steps.findIndex((s) => s.type === 'code_task')
            const target = codeTaskIndex !== -1 ? codeTaskIndex : steps.length - 1
            set((s) => ({
              lessons: {
                ...s.lessons,
                [lessonId]: {
                  ...lessonState,
                  inReviewPhase: false,
                  mistakesReviewed: true,
                  activeStepIndex: target
                }
              }
            }))
            return
          }

          // Go to the first remaining question in review queue
          const nextReviewStepId = reviewQueue[0]
          const nextIndex = steps.findIndex((s) => s.id === nextReviewStepId)
          if (nextIndex !== -1) {
            // Unlock it for fresh submission if currently submitted
            const sub = lessonState.submissions[nextReviewStepId]
            const updatedSubs = { ...lessonState.submissions }
            if (sub && sub.isSubmitted && !sub.isCorrect) {
              updatedSubs[nextReviewStepId] = {
                ...sub,
                isSubmitted: false
              }
            }

            set((s) => ({
              lessons: {
                ...s.lessons,
                [lessonId]: {
                  ...lessonState,
                  submissions: updatedSubs,
                  activeStepIndex: nextIndex
                }
              }
            }))
          }
          return
        }

        // Case 2: Normal Progression
        const nextIndex = activeStepIndex + 1
        if (nextIndex >= steps.length) return

        const nextStepObj = steps[nextIndex]

        // If next step is code_task, check if we need to review mistakes first!
        if (nextStepObj.type === 'code_task' && reviewQueue.length > 0) {
          // Enter Review Mistakes Phase!
          const reviewTargetId = reviewQueue[0]
          const reviewStepIndex = steps.findIndex((s) => s.id === reviewTargetId)
          const targetIndex = reviewStepIndex !== -1 ? reviewStepIndex : activeStepIndex

          // Unlock that question for retry
          const sub = lessonState.submissions[reviewTargetId]
          const updatedSubs = { ...lessonState.submissions }
          if (sub && sub.isSubmitted) {
            updatedSubs[reviewTargetId] = {
              ...sub,
              isSubmitted: false
            }
          }

          set((s) => ({
            lessons: {
              ...s.lessons,
              [lessonId]: {
                ...lessonState,
                submissions: updatedSubs,
                inReviewPhase: true,
                activeStepIndex: targetIndex
              }
            }
          }))
          return
        }

        // Standard forward progression
        set((s) => ({
          lessons: {
            ...s.lessons,
            [lessonId]: {
              ...lessonState,
              activeStepIndex: nextIndex
            }
          }
        }))
      },

      prevStep: (lessonId: string) => {
        playClickSound()
        const state = get()
        const lessonState = state.lessons[lessonId] || { ...defaultLessonState }
        if (lessonState.activeStepIndex > 0) {
          set((s) => ({
            lessons: {
              ...s.lessons,
              [lessonId]: {
                ...lessonState,
                activeStepIndex: lessonState.activeStepIndex - 1
              }
            }
          }))
        }
      },

      canAccessStep: (lessonId: string, targetIndex: number, steps: LessonStep[]): boolean => {
        const state = get()
        const lessonState = state.lessons[lessonId] || { ...defaultLessonState }

        // Past and current steps are always accessible
        if (targetIndex <= lessonState.activeStepIndex) return true

        const targetStep = steps[targetIndex]
        if (!targetStep) return false

        // If targeting code_task, must have completed all quiz steps and cleared review queue
        if (targetStep.type === 'code_task') {
          if (lessonState.reviewQueue.length > 0) return false
          const quizSteps = steps.filter((s) =>
            ['predict_output', 'fill_blank', 'true_false', 'identify_error'].includes(s.type)
          )
          return quizSteps.every((s) => {
            const sub = lessonState.submissions[s.id]
            return sub && sub.isSubmitted
          })
        }

        // For intermediate steps, require all prior steps to have been completed/viewed
        for (let i = 0; i < targetIndex; i++) {
          const s = steps[i]
          if (['predict_output', 'fill_blank', 'true_false', 'identify_error'].includes(s.type)) {
            const sub = lessonState.submissions[s.id]
            if (!sub || !sub.isSubmitted) return false
          }
        }

        return true
      },

      startReviewPhase: (lessonId: string, steps: LessonStep[]) => {
        playClickSound()
        const state = get()
        const lessonState = state.lessons[lessonId] || { ...defaultLessonState }
        if (lessonState.reviewQueue.length === 0) return

        const firstMistakeId = lessonState.reviewQueue[0]
        const targetIndex = steps.findIndex((s) => s.id === firstMistakeId)

        const sub = lessonState.submissions[firstMistakeId]
        const updatedSubs = { ...lessonState.submissions }
        if (sub && sub.isSubmitted) {
          updatedSubs[firstMistakeId] = {
            ...sub,
            isSubmitted: false
          }
        }

        set((s) => ({
          lessons: {
            ...s.lessons,
            [lessonId]: {
              ...lessonState,
              submissions: updatedSubs,
              inReviewPhase: true,
              activeStepIndex: targetIndex !== -1 ? targetIndex : lessonState.activeStepIndex
            }
          }
        }))
      },

      resetLessonQuiz: (lessonId: string) => {
        set((state) => ({
          lessons: {
            ...state.lessons,
            [lessonId]: { ...defaultLessonState }
          }
        }))
      }
    }),
    {
      name: 'python-journey-quiz-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
