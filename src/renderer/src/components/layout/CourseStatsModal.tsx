import React, { useEffect, useState } from 'react'
import { Trophy, Flame, Zap, X, CheckCircle2, Lock, Award, BookOpen, Check } from 'lucide-react'
import { Chapter } from '../../types/curriculum'
import { cn } from '../../lib/utils'
import { useCourseStore } from '../../store/useCourseStore'

interface CourseStatsModalProps {
  isOpen: boolean
  onClose: () => void
  chapters: Chapter[]
  completedLessonIds: string[]
  totalXp: number
  streak: number
  totalLessons: number
  onResetAllProgress?: () => void
}

export const CourseStatsModal: React.FC<CourseStatsModalProps> = ({
  isOpen,
  onClose,
  chapters,
  completedLessonIds,
  totalXp,
  streak,
  totalLessons,
  onResetAllProgress
}) => {
  const [activeTab, setActiveTab] = useState<'chapters' | 'badges'>('chapters')
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false)

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const completionKind = useCourseStore((state) => state.completionKind)

  if (!isOpen) return null

  const completedCount = completedLessonIds.length
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  const independentCount = completedLessonIds.filter(
    (id) => (completionKind[id] || 'independent') === 'independent'
  ).length
  const assistedCount = completedLessonIds.filter((id) => completionKind[id] === 'assisted').length

  // Chapter 3 math wizard check
  const ch3 = chapters.find((c) => c.chapterNumber === 3)
  const ch3Total = ch3?.lessons.length || 3
  const ch3Completed = ch3 ? ch3.lessons.filter((l) => completedLessonIds.includes(l.id)).length : 0
  const mathWizardUnlocked = ch3Total > 0 && ch3Completed === ch3Total

  // Chapter 4 string master check
  const ch4 = chapters.find((c) => c.chapterNumber === 4)
  const ch4Total = ch4?.lessons.length || 3
  const ch4Completed = ch4 ? ch4.lessons.filter((l) => completedLessonIds.includes(l.id)).length : 0
  const stringMasterUnlocked = ch4Total > 0 && ch4Completed === ch4Total

  // Chapter 7 loop hero check
  const ch7 = chapters.find((c) => c.chapterNumber === 7)
  const ch7Total = ch7?.lessons.length || 3
  const ch7Completed = ch7 ? ch7.lessons.filter((l) => completedLessonIds.includes(l.id)).length : 0
  const loopHeroUnlocked = ch7Total > 0 && ch7Completed === ch7Total

  // Lesson 1.1 first step check
  const firstStepUnlocked = completedLessonIds.includes('lesson-1-1')

  // All 25 lessons journeyman check
  const pythonJourneymanUnlocked = completedCount >= totalLessons && totalLessons > 0

  const badges = [
    {
      id: 'first-step',
      title: 'First Step',
      emoji: '🐣',
      description: 'Complete Lesson 1.1 (Hello World)',
      isUnlocked: firstStepUnlocked,
      progress: firstStepUnlocked ? '1 / 1' : '0 / 1'
    },
    {
      id: 'math-wizard',
      title: 'Math Wizard',
      emoji: '🧮',
      description: 'Complete all lessons in Chapter 3: Numbers & Basic Operators',
      isUnlocked: mathWizardUnlocked,
      progress: `${ch3Completed} / ${ch3Total}`
    },
    {
      id: 'string-master',
      title: 'String Master',
      emoji: '🔤',
      description: 'Complete all lessons in Chapter 4: Strings & Text Operations',
      isUnlocked: stringMasterUnlocked,
      progress: `${ch4Completed} / ${ch4Total}`
    },
    {
      id: 'loop-hero',
      title: 'Loop Hero',
      emoji: '🔄',
      description: 'Complete all lessons in Chapter 7: Loops & Iteration',
      isUnlocked: loopHeroUnlocked,
      progress: `${ch7Completed} / ${ch7Total}`
    },
    {
      id: 'python-journeyman',
      title: 'Python Journeyman',
      emoji: '🐍',
      description: 'Complete all 25 lessons of Python Fundamentals',
      isUnlocked: pythonJourneymanUnlocked,
      progress: `${completedCount} / ${totalLessons}`
    }
  ]

  const unlockedBadgesCount = badges.filter((b) => b.isUnlocked).length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden rounded-2xl border border-coddy-border bg-coddy-dark shadow-2xl shadow-emerald-500/10 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Glow Accent Header */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-linear-to-tr from-emerald-500/15 via-cyan-500/15 to-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-coddy-border bg-[#1e293b]/80 px-6 py-4">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-emerald-500 to-teal-500 shadow-md shadow-emerald-500/20">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Course Progress & Achievements
              </h2>
              <p className="text-[11px] text-slate-400">
                Track your journey through Python Fundamentals
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-coddy-border text-slate-400 hover:bg-coddy-border hover:text-white transition-colors"
            title="Close modal (Esc)"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Hero Stats Overview */}
        <div className="p-6 border-b border-coddy-border bg-[#1e293b]/40">
          <div className="grid grid-cols-3 gap-3">
            {/* Total Progress */}
            <div className="rounded-xl border border-coddy-border bg-coddy-dark/80 p-3.5 text-center">
              <div className="flex items-center justify-center space-x-1 text-emerald-400 font-extrabold text-base">
                <CheckCircle2 className="h-4 w-4" />
                <span>{progressPercent}%</span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium mt-1">
                {completedCount} / {totalLessons} Lessons
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono mt-1">
                <span className="text-emerald-400">⭐ {independentCount} Indep.</span>
                <span>•</span>
                <span className="text-purple-400">🤝 {assistedCount} Assist.</span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-[#1e293b] rounded-full overflow-hidden border border-coddy-border/50">
                <div
                  className="h-full bg-linear-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Total XP */}
            <div className="rounded-xl border border-coddy-border bg-coddy-dark/80 p-3.5 text-center">
              <div className="flex items-center justify-center space-x-1 text-amber-400 font-extrabold text-base">
                <Zap className="h-4 w-4 fill-amber-400" />
                <span>{totalXp} XP</span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium mt-1">Total Accumulated</div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                {completedCount * 50} Max Earned
              </div>
            </div>

            {/* Streak & Badges */}
            <div className="rounded-xl border border-coddy-border bg-coddy-dark/80 p-3.5 text-center">
              <div className="flex items-center justify-center space-x-1 text-orange-400 font-extrabold text-base">
                <Flame className="h-4 w-4 fill-orange-400" />
                <span>{streak} Days</span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium mt-1">Active Streak</div>
              <div className="text-[10px] text-purple-400 mt-1 font-semibold">
                {unlockedBadgesCount} / 5 Badges
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-2 mt-5 border-b border-coddy-border/60 pb-1">
            <button
              onClick={() => setActiveTab('chapters')}
              className={cn(
                'flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                activeTab === 'chapters'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-coddy-border/40'
              )}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Chapter Breakdown (8 Chapters)</span>
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={cn(
                'flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                activeTab === 'badges'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-coddy-border/40'
              )}
            >
              <Award className="h-3.5 w-3.5" />
              <span>Unlockable Badges ({unlockedBadgesCount}/5)</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'chapters' && (
            <div className="space-y-3">
              {chapters.map((chapter) => {
                const chapterCompleted = chapter.lessons.filter((l) =>
                  completedLessonIds.includes(l.id)
                ).length
                const chapterIndependent = chapter.lessons.filter(
                  (l) =>
                    completedLessonIds.includes(l.id) &&
                    (completionKind[l.id] || 'independent') === 'independent'
                ).length
                const chapterAssisted = chapter.lessons.filter(
                  (l) => completedLessonIds.includes(l.id) && completionKind[l.id] === 'assisted'
                ).length
                const chapterTotal = chapter.lessons.length
                const isComplete = chapterTotal > 0 && chapterCompleted === chapterTotal
                const chapterPct =
                  chapterTotal > 0 ? Math.round((chapterCompleted / chapterTotal) * 100) : 0

                return (
                  <div
                    key={chapter.id}
                    className={cn(
                      'rounded-xl border p-4 transition-all',
                      isComplete
                        ? 'border-emerald-500/40 bg-emerald-950/20 shadow-md shadow-emerald-500/5'
                        : chapterCompleted > 0
                          ? 'border-cyan-500/30 bg-[#1e293b]/70'
                          : 'border-coddy-border bg-[#1e293b]/40'
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2.5">
                        <span
                          className={cn(
                            'flex h-6 w-6 items-center justify-center rounded-lg font-mono text-xs font-bold border',
                            isComplete
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          )}
                        >
                          {chapter.chapterNumber}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{chapter.title}</span>
                            {isComplete && (
                              <span className="flex items-center text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/30">
                                <Check className="h-2.5 w-2.5 mr-0.5 inline" /> Completed
                              </span>
                            )}
                          </h4>
                          <p className="text-[11px] text-slate-400 truncate max-w-sm">
                            {chapter.description}
                          </p>
                          {chapterCompleted > 0 && (
                            <div className="flex items-center gap-2 mt-1 text-[10px] font-mono">
                              <span className="text-emerald-400">
                                ⭐ {chapterIndependent} Independent
                              </span>
                              {chapterAssisted > 0 && (
                                <span className="text-purple-400">
                                  🤝 {chapterAssisted} Assisted
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={cn(
                            'font-mono text-xs font-bold',
                            isComplete ? 'text-emerald-400' : 'text-slate-300'
                          )}
                        >
                          {chapterCompleted} / {chapterTotal}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          {chapterPct}%
                        </span>
                      </div>
                    </div>

                    {/* Chapter Progress Bar */}
                    <div className="h-1.5 w-full bg-coddy-dark rounded-full overflow-hidden border border-coddy-border/60">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-300',
                          isComplete
                            ? 'bg-linear-to-r from-emerald-500 to-teal-400'
                            : 'bg-linear-to-r from-cyan-500 to-blue-500'
                        )}
                        style={{ width: `${chapterPct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={cn(
                    'relative rounded-xl border p-4 transition-all',
                    badge.isUnlocked
                      ? 'border-amber-500/40 bg-linear-to-br from-amber-950/30 via-[#1e293b] to-coddy-dark shadow-lg shadow-amber-500/10'
                      : 'border-coddy-border bg-[#1e293b]/40 opacity-70'
                  )}
                >
                  <div className="flex items-start space-x-3">
                    {/* Badge Emoji / Icon */}
                    <div
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl border shadow-inner',
                        badge.isUnlocked
                          ? 'border-amber-500/40 bg-amber-500/20 shadow-amber-500/20'
                          : 'border-slate-700 bg-slate-800/80 grayscale'
                      )}
                    >
                      {badge.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-white truncate">{badge.title}</h4>
                        {badge.isUnlocked ? (
                          <span className="flex items-center space-x-0.5 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                            <Check className="h-2.5 w-2.5" />
                            <span>Unlocked</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-[10px] text-slate-500 font-mono">
                            <Lock className="h-2.5 w-2.5" />
                            <span>Locked</span>
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        {badge.description}
                      </p>

                      <div className="mt-2 text-[10px] font-mono text-slate-400">
                        Progress:{' '}
                        <span className="text-cyan-400 font-semibold">{badge.progress}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Double-Confirmation Dialog Modal for Resetting All Progress */}
        {showResetConfirm && (
          <div className="border-t border-rose-500/40 bg-rose-950/40 p-4 space-y-3 animate-in fade-in duration-150">
            <div className="flex items-start space-x-3 text-xs text-rose-200">
              <div className="rounded-lg bg-rose-500/20 p-1.5 border border-rose-500/30 text-rose-300 shrink-0">
                <X className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">Reset Entire Course Progress?</h4>
                <p className="text-[11px] text-rose-300/90 mt-1 leading-relaxed">
                  This will permanently delete all saved code drafts, earned XP, daily streak, and
                  lesson completion status. Are you sure you want to proceed?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-1 border-t border-rose-500/20">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="rounded-lg border border-coddy-border bg-coddy-dark px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-coddy-border hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false)
                  onResetAllProgress?.()
                  onClose()
                }}
                className="rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md hover:bg-rose-500 transition-colors active:scale-95"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="shrink-0 flex items-center justify-between border-t border-coddy-border bg-[#1e293b] px-6 py-3">
          <div className="flex items-center space-x-3">
            <span className="text-[11px] text-slate-400">
              Press{' '}
              <kbd className="rounded bg-coddy-dark px-1.5 py-0.5 border border-coddy-border text-slate-300 font-mono">
                Esc
              </kbd>{' '}
              to close
            </span>
            <span>•</span>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-[11px] text-rose-400/80 hover:text-rose-300 transition-colors underline underline-offset-2 hover:no-underline cursor-pointer"
            >
              Reset Entire Course Progress
            </button>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 transition-all active:scale-95"
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  )
}
