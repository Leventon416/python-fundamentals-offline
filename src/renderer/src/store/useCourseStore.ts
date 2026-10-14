import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getAllLessons, getLessonById, getNextLesson } from '../data/curriculum'
import { Lesson } from '../types/curriculum'

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
 * Normalizes code by stripping Python comments (# ...), normalized newlines, and all whitespace.
 */
function normalizePythonCode(code: string | undefined): string {
  if (!code) return ''
  return code.replace(/#.*$/gm, '').replace(/\\n/g, '\n').replace(/\s+/g, '').trim()
}

/**
 * Known obsolete variables and snippets from legacy / pre-release curriculum builds.
 */
const KNOWN_LEGACY_OBSOLETE_PATTERNS = [
  'item_price',
  'tax_rate',
  'customer_name',
  'sum_val',
  'diff_val',
  'prod_val',
  'quot_val',
  'can_access',
  'is_locked',
  'has_key',
  'is_admin'
]

/**
 * Extracts all identifiers expected by a lesson (e.g. from test cases, expected variables, semantic constraints, function names).
 */
function getLessonExpectedIdentifiers(lesson: Lesson): string[] {
  const ids = new Set<string>()

  if (Array.isArray(lesson.testCases)) {
    for (const tc of lesson.testCases) {
      if (tc.variableName) ids.add(tc.variableName)
      if (tc.functionName) ids.add(tc.functionName)
      if (tc.expectedVariables) {
        Object.keys(tc.expectedVariables).forEach((k) => ids.add(k))
      }
      if (Array.isArray(tc.semanticConstraints)) {
        for (const sc of tc.semanticConstraints) {
          if (sc.target) ids.add(sc.target)
        }
      }
    }
  }

  if (Array.isArray(lesson.steps)) {
    for (const step of lesson.steps) {
      if (step.type === 'code_task' && Array.isArray(step.testCases)) {
        for (const tc of step.testCases) {
          if (tc.variableName) ids.add(tc.variableName)
          if (tc.functionName) ids.add(tc.functionName)
          if (tc.expectedVariables) {
            Object.keys(tc.expectedVariables).forEach((k) => ids.add(k))
          }
          if (Array.isArray(tc.semanticConstraints)) {
            for (const sc of tc.semanticConstraints) {
              if (sc.target) ids.add(sc.target)
            }
          }
        }
      }
    }
  }

  return Array.from(ids)
}

/**
 * Checks if saved code has legacy identifiers that do not belong to this lesson.
 */
function hasLegacyMismatch(lesson: Lesson, savedCode: string): boolean {
  if (lesson.id === 'lesson-2-2') {
    if (
      savedCode.includes('item_price') ||
      savedCode.includes('tax_rate') ||
      savedCode.includes('19.99') ||
      savedCode.includes('0.08')
    ) {
      return true
    }
  }
  if (lesson.id === 'lesson-2-1' && savedCode.includes('customer_name')) return true
  if (
    lesson.id === 'lesson-2-3' &&
    (savedCode.includes('is_active') || savedCode.includes('is_game_over'))
  ) {
    return true
  }
  if (
    lesson.id === 'lesson-3-1' &&
    (savedCode.includes('sum_val') || savedCode.includes('diff_val'))
  ) {
    return true
  }
  if (
    lesson.id === 'lesson-5-3' &&
    (savedCode.includes('can_access') ||
      savedCode.includes('has_key') ||
      savedCode.includes('is_admin') ||
      savedCode.includes('is_locked'))
  ) {
    return true
  }
  if (
    lesson.id.startsWith('lesson-8-') &&
    (savedCode.includes('def add(') || savedCode.includes('def is_even('))
  ) {
    return true
  }

  const expectedIds = getLessonExpectedIdentifiers(lesson)
  for (const legacyId of KNOWN_LEGACY_OBSOLETE_PATTERNS) {
    if (savedCode.includes(legacyId) && !expectedIds.includes(legacyId)) {
      return true
    }
  }
  return false
}

/**
 * Detects whether a cached code draft for an uncompleted lesson represents:
 * 1. The full current solution (exact match, trimmed match, or comment-stripped normalized match).
 * 2. Any solution across the entire curriculum.
 * 3. A known legacy / obsolete pre-filled solution from previous builds (e.g. item_price in 2.2).
 * 4. Stale code that doesn't mention any of the lesson's target variables or objectives.
 */
export function isInvalidOrPreFilledDraft(lesson: Lesson, savedCode: string | undefined): boolean {
  if (savedCode === undefined || savedCode === null) return true
  if (typeof savedCode !== 'string') return true

  const trimmedSaved = savedCode.trim()
  if (!trimmedSaved) return false

  // If it's an exact match to the clean starterCode, it's valid starterCode
  if (trimmedSaved === lesson.starterCode.trim()) return false

  const normSaved = normalizePythonCode(savedCode)
  const normStarter = normalizePythonCode(lesson.starterCode)
  if (normSaved === normStarter) return false

  // 1. Matches this lesson's solutionCode
  if (lesson.solutionCode) {
    if (trimmedSaved === lesson.solutionCode.trim()) return true
    const normSolution = normalizePythonCode(lesson.solutionCode)
    if (normSolution.length > 0 && normSaved === normSolution) return true
    if (normSolution.length > 15 && normSaved.includes(normSolution)) return true
  }

  // 2. Matches ANY lesson's solutionCode across the curriculum
  const allLessons = getAllLessons()
  const matchesAnySolution = allLessons.some((l) => {
    if (!l.solutionCode) return false
    const norm = normalizePythonCode(l.solutionCode)
    return norm.length > 10 && normSaved === norm
  })
  if (matchesAnySolution) return true

  // 3. Known legacy solution patterns
  if (hasLegacyMismatch(lesson, savedCode)) {
    return true
  }

  // Specific legacy per-lesson known pre-filled solutions
  if (lesson.id === 'lesson-1-3' && savedCode.includes('score = 12')) return true
  if (
    lesson.id === 'lesson-1-5' &&
    (savedCode.includes('level = 2') || savedCode.includes('level = 5'))
  ) {
    return true
  }
  if (lesson.id === 'lesson-2-1' && savedCode.includes('Arthur') && savedCode.includes('42')) {
    return true
  }

  // 4. Semantic relevance check:
  // If the lesson specifies expected identifiers (e.g. ['distance_miles', 'pace_minutes']),
  // and the savedCode contains assignment operations (=) or function definitions (def),
  // but mentions NONE of the expected identifiers or starterCode variables:
  const expectedIds = getLessonExpectedIdentifiers(lesson)
  if (expectedIds.length > 0) {
    const hasAnyExpected = expectedIds.some((id) => savedCode.includes(id))
    if (!hasAnyExpected) {
      const hasAssignments = /^[a-zA-Z_][a-zA-Z0-9_]*\s*=/m.test(savedCode)
      const hasDefs = /def\s+[a-zA-Z_]/m.test(savedCode)
      if (hasAssignments || hasDefs) {
        return true
      }
    }
  }

  return false
}

/**
 * Sanitizes cached savedCode drafts:
 * - Removes orphaned keys that don't match any valid lesson ID.
 * - Replaces any pre-filled or legacy solution in uncompleted lessons with the clean lesson.starterCode.
 * - Replaces obsolete legacy code in completed lessons with lesson.solutionCode.
 */
export function sanitizeSavedCode(
  savedCode: Record<string, string>,
  completedLessonIds: string[]
): Record<string, string> {
  if (!savedCode || typeof savedCode !== 'object') return {}
  const allLessons = getAllLessons()
  const validLessonIds = new Set(allLessons.map((l) => l.id))
  const sanitized: Record<string, string> = {}

  for (const [key, value] of Object.entries(savedCode)) {
    if (validLessonIds.has(key)) {
      sanitized[key] = value
    }
  }

  for (const lesson of allLessons) {
    const saved = sanitized[lesson.id]
    if (saved === undefined) continue

    const isCompleted = completedLessonIds.includes(lesson.id)
    if (isCompleted) {
      if (hasLegacyMismatch(lesson, saved)) {
        sanitized[lesson.id] = lesson.solutionCode
      }
      continue
    }

    if (isInvalidOrPreFilledDraft(lesson, saved)) {
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

        // Runtime check: if cached code matches solution code or legacy draft for uncompleted lesson, return clean starterCode
        if (lesson && !state.completedLessonIds.includes(lessonId)) {
          if (isInvalidOrPreFilledDraft(lesson, saved)) {
            if (saved !== lesson.starterCode) {
              set((s) => ({
                savedCode: {
                  ...s.savedCode,
                  [lessonId]: lesson.starterCode
                }
              }))
            }
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
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: unknown, version: number) => {
        const state = (persistedState || {}) as Partial<CourseState>
        if (version < 1) {
          state.savedCode = sanitizeSavedCode(state.savedCode || {}, state.completedLessonIds || [])
        }
        return state as CourseState
      },
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
