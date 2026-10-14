import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getAllLessons, getLessonById, getNextLesson } from '../data/curriculum'

export interface CourseState {
  // Persistent State
  completedLessonIds: string[]
  completionKind: Record<string, 'independent' | 'assisted'>
  revealedSolutionLessonIds: string[]
  acceptedMilestoneSnapshots: Record<string, string>
  savedCode: Record<string, string>
  activeLessonId: string
  xp: number
  streak: number
  lastActiveDate: string
  soundEnabled: boolean

  // Actions
  setActiveLesson: (lessonId: string) => void
  saveLessonCode: (lessonId: string, code: string) => void
  recordSolutionRevealed: (lessonId: string) => void
  saveMilestoneSnapshot: (lessonId: string, code: string) => void
  getMilestoneStarterCode: (lessonId: string) => string | null
  restoreMilestoneStarter: (lessonId: string) => string | null
  hasMilestoneStarter: (lessonId: string) => boolean
  markLessonCompleted: (
    lessonId: string,
    xpEarned: number,
    passingCode?: string
  ) => {
    isFirstTime: boolean
    newXp: number
    nextLessonId: string | null
    completionKind: 'independent' | 'assisted'
  }
  resetLessonCode: (lessonId: string) => void
  unlockNextLesson: (currentLessonId: string) => string | null
  getLessonCode: (lessonId: string) => string
  isLessonUnlocked: (lessonId: string) => boolean
  isLessonCompleted: (lessonId: string) => boolean
  getLessonCompletionKind: (lessonId: string) => 'independent' | 'assisted' | null
  checkAndUpdateStreak: () => void
  toggleSound: () => void
  setSoundEnabled: (enabled: boolean) => void
  resetAllProgress: () => void
}

function calculateStreak(
  lastActiveDate: string,
  currentStreak: number
): { streak: number; todayStr: string } {
  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10) // 'YYYY-MM-DD'

  if (!lastActiveDate) {
    return { streak: 1, todayStr }
  }

  const lastDate = new Date(lastActiveDate)
  const lastDateStr = lastDate.toISOString().slice(0, 10)

  if (lastDateStr === todayStr) {
    return { streak: currentStreak > 0 ? currentStreak : 1, todayStr }
  }

  const oneDayMs = 24 * 60 * 60 * 1000
  const diffDays = Math.round(
    (new Date(todayStr).getTime() - new Date(lastDateStr).getTime()) / oneDayMs
  )

  if (diffDays === 1) {
    return { streak: (currentStreak > 0 ? currentStreak : 0) + 1, todayStr }
  } else if (diffDays > 1) {
    return { streak: 1, todayStr }
  }

  return { streak: currentStreak > 0 ? currentStreak : 1, todayStr }
}

/**
 * Sanitizes cached savedCode drafts:
 * - Compares savedCode[lessonId] against lesson.solutionCode.
 * - If savedCode[lessonId] exactly matches lesson.solutionCode AND the lesson is NOT marked completed,
 *   overwrites savedCode[lessonId] with the clean lesson.starterCode.
 * - Also handles legacy pre-filled solutions (e.g. for lesson-2-1 if previously saved).
 */
export function sanitizeSavedCode(
  savedCode: Record<string, string>,
  completedLessonIds: string[]
): Record<string, string> {
  if (!savedCode || typeof savedCode !== 'object') return {}
  const allLessons = getAllLessons()
  const sanitized = { ...savedCode }

  for (const lesson of allLessons) {
    const saved = sanitized[lesson.id]
    if (saved === undefined) continue

    const isCompleted = completedLessonIds.includes(lesson.id)
    if (isCompleted) continue

    const exactMatch = Boolean(lesson.solutionCode) && saved === lesson.solutionCode
    const trimmedMatch = Boolean(lesson.solutionCode) && saved.trim() === lesson.solutionCode.trim()
    const isLegacyLesson21Solution =
      lesson.id === 'lesson-2-1' &&
      (saved.includes('customer_name') || saved.includes('character_name'))

    if (exactMatch || trimmedMatch || isLegacyLesson21Solution) {
      sanitized[lesson.id] = lesson.starterCode
    }
  }

  return sanitized
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      completedLessonIds: [],
      completionKind: {},
      revealedSolutionLessonIds: [],
      acceptedMilestoneSnapshots: {},
      savedCode: {},
      activeLessonId: 'lesson-1-1',
      xp: 0,
      streak: 1,
      lastActiveDate: new Date().toISOString().slice(0, 10),
      soundEnabled: true,

      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }))
      },

      setSoundEnabled: (enabled: boolean) => {
        set({ soundEnabled: enabled })
      },

      resetAllProgress: () => {
        set({
          completedLessonIds: [],
          completionKind: {},
          revealedSolutionLessonIds: [],
          acceptedMilestoneSnapshots: {},
          savedCode: {},
          activeLessonId: 'lesson-1-1',
          xp: 0,
          streak: 1,
          lastActiveDate: new Date().toISOString().slice(0, 10)
        })
      },

      setActiveLesson: (lessonId: string) => {
        set({ activeLessonId: lessonId })
        get().checkAndUpdateStreak()
      },

      saveLessonCode: (lessonId: string, code: string) => {
        set((state) => ({
          savedCode: {
            ...state.savedCode,
            [lessonId]: code
          }
        }))
      },

      recordSolutionRevealed: (lessonId: string) => {
        set((state) => {
          if (!state.revealedSolutionLessonIds.includes(lessonId)) {
            return {
              revealedSolutionLessonIds: [...state.revealedSolutionLessonIds, lessonId]
            }
          }
          return state
        })
      },

      saveMilestoneSnapshot: (lessonId: string, code: string) => {
        set((state) => ({
          acceptedMilestoneSnapshots: {
            ...state.acceptedMilestoneSnapshots,
            [lessonId]: code
          }
        }))
      },

      getMilestoneStarterCode: (lessonId: string) => {
        const lesson = getLessonById(lessonId)
        if (!lesson || lesson.category !== 'project_step') return null

        let prevId = lesson.previousMilestoneLessonId
        if (!prevId && lesson.projectId && lesson.milestoneIndex && lesson.milestoneIndex > 1) {
          const all = getAllLessons()
          const prev = all.find(
            (l) =>
              l.projectId === lesson.projectId && l.milestoneIndex === lesson.milestoneIndex! - 1
          )
          if (prev) prevId = prev.id
        }

        if (!prevId) return null
        const state = get()
        if (state.acceptedMilestoneSnapshots[prevId] !== undefined) {
          return state.acceptedMilestoneSnapshots[prevId]
        }
        const prevLesson = getLessonById(prevId)
        return prevLesson ? prevLesson.solutionCode || prevLesson.starterCode || null : null
      },

      hasMilestoneStarter: (lessonId: string) => {
        return get().getMilestoneStarterCode(lessonId) !== null
      },

      restoreMilestoneStarter: (lessonId: string) => {
        const starter = get().getMilestoneStarterCode(lessonId)
        if (starter !== null) {
          set((state) => ({
            savedCode: {
              ...state.savedCode,
              [lessonId]: starter
            }
          }))
          return starter
        }
        return null
      },

      markLessonCompleted: (lessonId: string, xpEarned: number, passingCode?: string) => {
        const state = get()
        const isFirstTime = !state.completedLessonIds.includes(lessonId)
        const next = getNextLesson(lessonId)
        const nextLessonId = next ? next.id : null

        const isAssisted = state.revealedSolutionLessonIds.includes(lessonId)
        const currentKind: 'independent' | 'assisted' = isAssisted ? 'assisted' : 'independent'

        const updatedCompletionKind = {
          ...state.completionKind,
          [lessonId]: currentKind
        }

        const updatedSnapshots = { ...state.acceptedMilestoneSnapshots }
        if (passingCode !== undefined) {
          updatedSnapshots[lessonId] = passingCode
        }

        const { streak: newStreak, todayStr } = calculateStreak(state.lastActiveDate, state.streak)

        if (isFirstTime) {
          const newXp = state.xp + xpEarned
          set({
            completedLessonIds: [...state.completedLessonIds, lessonId],
            completionKind: updatedCompletionKind,
            acceptedMilestoneSnapshots: updatedSnapshots,
            xp: newXp,
            streak: newStreak,
            lastActiveDate: todayStr
          })
          return { isFirstTime: true, newXp, nextLessonId, completionKind: currentKind }
        } else {
          set({
            completionKind: updatedCompletionKind,
            acceptedMilestoneSnapshots: updatedSnapshots,
            streak: newStreak,
            lastActiveDate: todayStr
          })
          return { isFirstTime: false, newXp: state.xp, nextLessonId, completionKind: currentKind }
        }
      },

      resetLessonCode: (lessonId: string) => {
        const lesson = getLessonById(lessonId)
        const defaultCode = lesson ? lesson.starterCode : ''
        set((s) => ({
          savedCode: {
            ...s.savedCode,
            [lessonId]: defaultCode
          }
        }))
      },

      unlockNextLesson: (currentLessonId: string) => {
        const next = getNextLesson(currentLessonId)
        if (next) {
          set({ activeLessonId: next.id })
          return next.id
        }
        return null
      },

      getLessonCode: (lessonId: string) => {
        const state = get()
        const saved = state.savedCode[lessonId]
        const lesson = getLessonById(lessonId)

        // Runtime check: if cached code matches solution code for uncompleted lesson, return clean starterCode
        if (lesson && !state.completedLessonIds.includes(lessonId)) {
          const exactMatch = Boolean(lesson.solutionCode) && saved === lesson.solutionCode
          const trimmedMatch =
            Boolean(lesson.solutionCode) && saved?.trim() === lesson.solutionCode.trim()
          const isLegacyLesson21Solution =
            lessonId === 'lesson-2-1' &&
            Boolean(saved) &&
            (saved.includes('customer_name') || saved.includes('character_name'))

          if (exactMatch || trimmedMatch || isLegacyLesson21Solution) {
            return lesson.starterCode
          }
        }

        if (saved !== undefined) {
          return saved
        }
        const milestoneStarter = state.getMilestoneStarterCode(lessonId)
        if (milestoneStarter !== null) {
          return milestoneStarter
        }
        return lesson ? lesson.starterCode : ''
      },

      isLessonUnlocked: (lessonId: string) => {
        const all = getAllLessons()
        const idx = all.findIndex((l) => l.id === lessonId)
        if (idx === 0) return true // Lesson 1.1 is always unlocked
        if (idx < 0) return false

        const state = get()
        if (state.completedLessonIds.includes(lessonId)) return true

        const prevLesson = all[idx - 1]
        return state.completedLessonIds.includes(prevLesson.id)
      },

      isLessonCompleted: (lessonId: string) => {
        return get().completedLessonIds.includes(lessonId)
      },

      getLessonCompletionKind: (lessonId: string) => {
        return get().completionKind[lessonId] ?? null
      },

      checkAndUpdateStreak: () => {
        const state = get()
        const { streak: newStreak, todayStr } = calculateStreak(state.lastActiveDate, state.streak)
        if (newStreak !== state.streak || todayStr !== state.lastActiveDate) {
          set({ streak: newStreak, lastActiveDate: todayStr })
        }
      }
    }),
    {
      name: 'python-journey-course-storage',
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState, currentState) => {
        const merged = {
          ...currentState,
          ...(persistedState as Partial<CourseState>)
        }
        merged.savedCode = sanitizeSavedCode(
          merged.savedCode || {},
          merged.completedLessonIds || []
        )
        return merged
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.savedCode = sanitizeSavedCode(state.savedCode || {}, state.completedLessonIds || [])
        }
      }
    }
  )
)
