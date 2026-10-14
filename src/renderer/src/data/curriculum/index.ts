import { Chapter, Lesson, UserStats } from '../../types/curriculum'
import { chapter1 } from './chapter1'
import { chapter2 } from './chapter2'
import { chapter3 } from './chapter3'
import { chapter4 } from './chapter4'
import { chapter5 } from './chapter5'
import { chapter6 } from './chapter6'
import { chapter7 } from './chapter7'
import { chapter8 } from './chapter8'
import { chapter9 } from './chapter9'

export { chapter1 } from './chapter1'
export { chapter2 } from './chapter2'
export { chapter3 } from './chapter3'
export { chapter4 } from './chapter4'
export { chapter5 } from './chapter5'
export { chapter6 } from './chapter6'
export { chapter7 } from './chapter7'
export { chapter8 } from './chapter8'
export { chapter9 } from './chapter9'

export const chapters: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8,
  chapter9
]

/**
 * Returns a flattened array of all lessons across all 8 chapters.
 */
export function getAllLessons(): Lesson[] {
  return chapters.flatMap((chapter) => chapter.lessons)
}

/**
 * Finds a lesson by its unique identifier (e.g. 'lesson-1-1').
 */
export function getLessonById(id: string): Lesson | undefined {
  return getAllLessons().find((lesson) => lesson.id === id)
}

/**
 * Finds the next lesson in sequence, or undefined if at the end of the course.
 */
export function getNextLesson(currentId: string): Lesson | undefined {
  const all = getAllLessons()
  const idx = all.findIndex((l) => l.id === currentId)
  if (idx >= 0 && idx < all.length - 1) {
    return all[idx + 1]
  }
  return undefined
}

/**
 * Finds the previous lesson in sequence, or undefined if at the beginning.
 */
export function getPreviousLesson(currentId: string): Lesson | undefined {
  const all = getAllLessons()
  const idx = all.findIndex((l) => l.id === currentId)
  if (idx > 0) {
    return all[idx - 1]
  }
  return undefined
}

/**
 * Finds a chapter by its ID (e.g. 'ch-1').
 */
export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((ch) => ch.id === id)
}

/**
 * Default initial gamification statistics for a fresh journey.
 */
export const initialStats: UserStats = {
  streakDays: 3,
  xp: 150,
  completedCount: 0,
  totalLessons: getAllLessons().length
}
