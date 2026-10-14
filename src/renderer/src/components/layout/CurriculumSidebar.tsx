import React from 'react'
import {
  CheckCircle2,
  Play,
  Lock,
  X,
  ChevronDown,
  Sparkles,
  BookOpen,
  Clock,
  Check,
  FolderGit2
} from 'lucide-react'
import { Chapter, Lesson } from '../../types/curriculum'
import { cn } from '../../lib/utils'
import { useCourseStore } from '../../store/useCourseStore'

interface CurriculumSidebarProps {
  chapters: Chapter[]
  activeLessonId: string
  isOpen: boolean
  onClose: () => void
  onSelectLesson: (lesson: Lesson) => void
}

export const CurriculumSidebar: React.FC<CurriculumSidebarProps> = ({
  chapters,
  activeLessonId,
  isOpen,
  onClose,
  onSelectLesson
}) => {
  const completedLessonIds = useCourseStore((state) => state.completedLessonIds)
  const completionKind = useCourseStore((state) => state.completionKind)
  const isLessonUnlocked = useCourseStore((state) => state.isLessonUnlocked)

  return (
    <>
      {/* Backdrop overlay for smaller viewports or click-away */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={cn(
          'fixed inset-y-14 left-0 z-40 flex w-80 flex-col border-r border-coddy-border bg-coddy-dark shadow-2xl transition-all duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-coddy-border bg-[#1e293b]/70 px-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold text-sm text-white">Course Curriculum</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-coddy-border text-slate-400 hover:bg-coddy-border hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Chapters list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {chapters.map((chapter) => {
            const completedCount = chapter.lessons.filter((l) =>
              completedLessonIds.includes(l.id)
            ).length
            const isChapterComplete =
              chapter.lessons.length > 0 && completedCount === chapter.lessons.length

            return (
              <div key={chapter.id} className="space-y-2">
                {/* Chapter Header Card */}
                <div className="flex items-center justify-between rounded-lg bg-[#1e293b]/50 px-3 py-2 border border-coddy-border/60">
                  <div className="flex items-center space-x-2 min-w-0">
                    <span
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-[10px] font-bold border',
                        isChapterComplete
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      )}
                    >
                      {chapter.chapterNumber}
                    </span>
                    <span className="font-semibold text-xs text-slate-200 truncate">
                      {chapter.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 shrink-0 pl-2">
                    <span
                      className={cn(
                        'font-mono text-[10px]',
                        isChapterComplete
                          ? 'text-emerald-400 font-bold flex items-center gap-0.5'
                          : 'text-slate-400'
                      )}
                    >
                      {completedCount}/{chapter.lessons.length}
                      {isChapterComplete && (
                        <Check className="h-2.5 w-2.5 inline text-emerald-400" />
                      )}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>

                {/* Lesson Items */}
                <div className="space-y-1 pl-2">
                  {chapter.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLessonId
                    const isCompleted = completedLessonIds.includes(lesson.id)
                    const isUnlocked = isLessonUnlocked(lesson.id)
                    const isLocked = !isUnlocked

                    return (
                      <button
                        key={lesson.id}
                        disabled={isLocked}
                        onClick={() => {
                          if (isLocked) return
                          onSelectLesson(lesson)
                        }}
                        title={
                          isLocked
                            ? 'Complete previous lesson to unlock'
                            : `${lesson.lessonNumber} ${lesson.title}`
                        }
                        className={cn(
                          'group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all duration-150 border',
                          isActive
                            ? 'border-cyan-500/50 bg-[#1e293b] shadow-md shadow-cyan-500/5'
                            : isLocked
                              ? 'border-transparent bg-transparent opacity-45 cursor-not-allowed'
                              : 'border-transparent hover:border-coddy-border hover:bg-[#1e293b]/40 cursor-pointer'
                        )}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          {/* Status Icon Indicator */}
                          <div
                            className={cn(
                              'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-medium',
                              isCompleted &&
                                'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
                              isActive &&
                                !isCompleted &&
                                (lesson.category === 'project_step'
                                  ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300'
                                  : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400'),
                              isLocked && 'border-slate-800 bg-slate-900/60 text-slate-600',
                              !isCompleted &&
                                !isActive &&
                                !isLocked &&
                                (lesson.category === 'project_step'
                                  ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
                                  : 'border-coddy-border bg-[#1e293b] text-slate-300')
                            )}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : isLocked ? (
                              <Lock className="h-3.5 w-3.5" />
                            ) : lesson.category === 'project_step' ? (
                              <FolderGit2 className="h-3.5 w-3.5" />
                            ) : isActive ? (
                              <Play className="h-3.5 w-3.5 fill-current" />
                            ) : (
                              <span className="font-mono text-[11px]">{lesson.lessonNumber}</span>
                            )}
                          </div>

                          {/* Title & Metadata */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-1.5">
                              <span
                                className={cn(
                                  'text-xs font-semibold truncate',
                                  isActive
                                    ? lesson.category === 'project_step'
                                      ? 'text-indigo-300'
                                      : 'text-cyan-300'
                                    : isLocked
                                      ? 'text-slate-500'
                                      : 'text-slate-200 group-hover:text-white'
                                )}
                              >
                                {lesson.lessonNumber} {lesson.title}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                              {lesson.category === 'project_step' ? (
                                <span className="flex items-center space-x-1 rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-bold text-indigo-300 border border-indigo-500/30">
                                  <FolderGit2 className="h-2.5 w-2.5 text-indigo-400" />
                                  <span>
                                    Milestone {lesson.milestoneIndex}/{lesson.totalMilestones || 4}
                                  </span>
                                </span>
                              ) : (
                                <span className="flex items-center space-x-0.5">
                                  <Clock className="h-2.5 w-2.5" />
                                  <span>{lesson.duration}</span>
                                </span>
                              )}
                              <span>•</span>
                              <span className="text-amber-400 font-medium">+{lesson.xp} XP</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Tag/Badge */}
                        {isActive ? (
                          <div
                            className={cn(
                              'shrink-0 flex items-center space-x-1 rounded px-1.5 py-0.5 text-[10px] font-bold border',
                              lesson.category === 'project_step'
                                ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/35'
                                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                            )}
                          >
                            <span>
                              {lesson.category === 'project_step'
                                ? `Milestone ${lesson.milestoneIndex}`
                                : 'Current'}
                            </span>
                          </div>
                        ) : isCompleted ? (
                          <div
                            className={cn(
                              'shrink-0 flex items-center space-x-1 rounded px-1.5 py-0.5 text-[10px] font-medium border',
                              completionKind[lesson.id] === 'assisted'
                                ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            )}
                          >
                            <span>
                              {completionKind[lesson.id] === 'assisted' ? 'Assisted' : 'Done'}
                            </span>
                          </div>
                        ) : isLocked ? (
                          <div className="shrink-0 flex items-center space-x-1 text-[10px] text-slate-600">
                            <Lock className="h-3 w-3" />
                          </div>
                        ) : lesson.category === 'project_step' ? (
                          <div className="shrink-0 flex items-center space-x-1 rounded bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/25">
                            <span>M{lesson.milestoneIndex}</span>
                          </div>
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer info */}
        <div className="border-t border-coddy-border bg-[#1e293b]/40 p-3 text-center text-[11px] text-slate-400">
          <div className="flex items-center justify-center space-x-1.5 text-emerald-400 font-medium">
            <Sparkles className="h-3 w-3" />
            <span>Interactive Offline Curriculum</span>
          </div>
        </div>
      </aside>
    </>
  )
}
