import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  Search,
  CheckCircle2,
  Play,
  Lock,
  X,
  BookOpen,
  CornerDownLeft,
  ArrowUpDown
} from 'lucide-react'
import { Chapter, Lesson } from '../../types/curriculum'
import { cn } from '../../lib/utils'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  chapters: Chapter[]
  activeLessonId: string
  completedLessonIds: string[]
  isLessonUnlocked: (lessonId: string) => boolean
  onSelectLesson: (lesson: Lesson) => void
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  chapters,
  activeLessonId,
  completedLessonIds,
  isLessonUnlocked,
  onSelectLesson
}) => {
  const [query, setQuery] = useState<string>('')
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Flattened all lessons
  const allLessons = useMemo(() => {
    return chapters.flatMap((ch) => ch.lessons)
  }, [chapters])

  // Filter lessons based on search query
  const filteredLessons = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allLessons

    return allLessons.filter((lesson) => {
      const titleMatch = lesson.title.toLowerCase().includes(q)
      const numMatch = lesson.lessonNumber.toLowerCase().includes(q)
      const chapterMatch = (lesson.chapterTitle || '').toLowerCase().includes(q)
      const taskMatch = lesson.taskObjective.toLowerCase().includes(q)
      const diffMatch = lesson.difficulty.toLowerCase().includes(q)
      return titleMatch || numMatch || chapterMatch || taskMatch || diffMatch
    })
  }, [allLessons, query])

  // Reset query and selected index on open (adjusting during render avoids cascading renders)
  const [prevIsOpen, setPrevIsOpen] = useState<boolean>(isOpen)
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen)
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
    }
  }

  const [prevQuery, setPrevQuery] = useState<string>(query)
  if (prevQuery !== query) {
    setPrevQuery(query)
    setSelectedIndex(0)
  }

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      return (): void => clearTimeout(timer)
    }
    return undefined
  }, [isOpen])

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return
    const activeElement = listRef.current.children[selectedIndex] as HTMLElement
    if (activeElement) {
      activeElement.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  // Handle arrow keys and Enter
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (filteredLessons.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % filteredLessons.length)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (filteredLessons.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + filteredLessons.length) % filteredLessons.length)
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const target = filteredLessons[selectedIndex]
      if (target) {
        if (isLessonUnlocked(target.id)) {
          onSelectLesson(target)
          onClose()
        }
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Palette Dialog Card */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-coddy-border bg-coddy-dark shadow-2xl shadow-emerald-500/10 z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Glow Accent */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-linear-to-tr from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-coddy-border bg-[#1e293b]/70 px-4 py-3.5">
          <Search className="h-4 w-4 text-emerald-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search all 25 lessons by title, topic, or chapter... (Esc to close)"
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 outline-none font-medium"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="rounded bg-coddy-dark px-1.5 py-0.5 border border-coddy-border text-[10px] text-slate-400 font-mono">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-95 overflow-y-auto p-2 space-y-1 select-none divide-y divide-coddy-border/20"
        >
          {filteredLessons.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <BookOpen className="h-8 w-8 mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-medium text-slate-300">No lessons found</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for keywords like &quot;loops&quot;, &quot;print&quot;, or
                &quot;strings&quot;
              </p>
            </div>
          ) : (
            filteredLessons.map((lesson, idx) => {
              const isSelected = idx === selectedIndex
              const isCompleted = completedLessonIds.includes(lesson.id)
              const isActive = lesson.id === activeLessonId
              const isUnlocked = isLessonUnlocked(lesson.id)
              const isLocked = !isUnlocked

              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    if (isUnlocked) {
                      onSelectLesson(lesson)
                      onClose()
                    }
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    'group flex items-center justify-between rounded-xl px-3 py-2.5 transition-all text-left cursor-pointer border',
                    isSelected
                      ? 'bg-[#1e293b] border-cyan-500/50 shadow-md shadow-cyan-500/5'
                      : 'border-transparent hover:bg-[#1e293b]/40',
                    isLocked && 'opacity-60 cursor-not-allowed'
                  )}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    {/* Status Icon */}
                    <div
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-mono font-bold',
                        isCompleted && 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
                        isActive &&
                          !isCompleted &&
                          'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
                        isLocked && 'border-slate-800 bg-slate-900/80 text-slate-600',
                        !isCompleted &&
                          !isActive &&
                          !isLocked &&
                          'border-coddy-border bg-[#1e293b] text-slate-300'
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : isActive ? (
                        <Play className="h-3.5 w-3.5 fill-current" />
                      ) : isLocked ? (
                        <Lock className="h-3.5 w-3.5" />
                      ) : (
                        <span>{lesson.lessonNumber}</span>
                      )}
                    </div>

                    {/* Lesson Details */}
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-slate-400">
                          {lesson.lessonNumber}
                        </span>
                        <span
                          className={cn(
                            'text-xs font-semibold truncate',
                            isSelected ? 'text-white' : 'text-slate-200'
                          )}
                        >
                          {lesson.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                        <span className="truncate">{lesson.chapterTitle}</span>
                        <span>•</span>
                        <span className="text-amber-400 font-medium">+{lesson.xp} XP</span>
                        <span>•</span>
                        <span>{lesson.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Pills */}
                  <div className="shrink-0 flex items-center space-x-2 pl-2">
                    {isCompleted ? (
                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                        Completed
                      </span>
                    ) : isActive ? (
                      <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold text-cyan-400 border border-cyan-500/30">
                        Active
                      </span>
                    ) : isLocked ? (
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-500 border border-slate-700/60 flex items-center gap-1">
                        <Lock className="h-2.5 w-2.5" /> Locked
                      </span>
                    ) : (
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-700">
                        Unlocked
                      </span>
                    )}

                    {isSelected && !isLocked && (
                      <CornerDownLeft className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="flex items-center justify-between border-t border-coddy-border bg-[#1e293b]/70 px-4 py-2.5 text-[11px] text-slate-400">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <ArrowUpDown className="h-3 w-3" />
              <span>Navigate</span>
            </span>
            <span className="flex items-center space-x-1">
              <CornerDownLeft className="h-3 w-3" />
              <span>Select Lesson</span>
            </span>
          </div>
          <span>
            {filteredLessons.length} of {allLessons.length} Lessons
          </span>
        </div>
      </div>
    </div>
  )
}
