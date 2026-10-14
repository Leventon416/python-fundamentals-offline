import React from 'react'
import {
  Trophy,
  Sparkles,
  Flame,
  ArrowRight,
  X,
  CheckCircle2,
  Award,
  Lightbulb
} from 'lucide-react'
import { Lesson } from '../../types/curriculum'
import { cn } from '../../lib/utils'

interface LessonCompletedModalProps {
  isOpen: boolean
  onClose: () => void
  lesson: Lesson
  xpEarned: number
  totalXp: number
  streak: number
  isFirstTimeCompleted: boolean
  hasNextLesson: boolean
  onNextLesson: () => void
  isTrackCompleted?: boolean
  completionKind?: 'independent' | 'assisted'
}

export const LessonCompletedModal: React.FC<LessonCompletedModalProps> = ({
  isOpen,
  onClose,
  lesson,
  xpEarned,
  totalXp,
  streak,
  isFirstTimeCompleted,
  hasNextLesson,
  onNextLesson,
  isTrackCompleted = false,
  completionKind = 'independent'
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-emerald-500/30 bg-coddy-dark shadow-2xl shadow-emerald-500/10 z-10 transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Glow Accent Header */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-linear-to-tr from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg border border-coddy-border text-slate-400 hover:bg-[#1e293b] hover:text-white transition-colors"
          title="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 text-center space-y-5">
          {/* Hero Icon Badge */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-tr from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30">
            {isTrackCompleted ? (
              <Trophy className="h-8 w-8 text-white animate-bounce" />
            ) : (
              <CheckCircle2 className="h-8 w-8 text-white" />
            )}
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
              <span>{isTrackCompleted ? 'Track Complete! 🏆' : 'Lesson Completed! 🎉'}</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-mono">
              {lesson.lessonNumber}: {lesson.title}
            </p>
          </div>

          {/* Completion Kind Badge */}
          <div className="flex justify-center">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm',
                completionKind === 'independent'
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-purple-500/15 text-purple-300 border-purple-500/30'
              )}
            >
              {completionKind === 'independent' ? (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
                  <span>Independent Completion ⭐</span>
                </>
              ) : (
                <>
                  <Lightbulb className="h-3.5 w-3.5 text-purple-400" />
                  <span>Assisted Completion (Solution Revealed) 🤝</span>
                </>
              )}
            </span>
          </div>

          {/* Gamification Stats Card */}
          <div className="grid grid-cols-3 gap-2.5 rounded-xl border border-coddy-border bg-[#1e293b]/70 p-3.5 shadow-inner">
            {/* XP Earned */}
            <div className="flex flex-col items-center">
              <span className="flex items-center space-x-1 text-amber-400 font-bold text-sm">
                <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
                <span>{isFirstTimeCompleted ? `+${xpEarned}` : '+0'}</span>
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">XP Earned</span>
            </div>

            {/* Total XP */}
            <div className="flex flex-col items-center border-x border-coddy-border/80">
              <span className="flex items-center space-x-1 text-emerald-400 font-bold text-sm">
                <Award className="h-3.5 w-3.5" />
                <span>{totalXp}</span>
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">Total XP</span>
            </div>

            {/* Streak */}
            <div className="flex flex-col items-center">
              <span className="flex items-center space-x-1 text-orange-400 font-bold text-sm">
                <Flame className="h-3.5 w-3.5 fill-orange-400" />
                <span>{streak}d</span>
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">Streak</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-coddy-border bg-[#1e293b] py-2.5 text-xs font-semibold text-slate-300 hover:bg-coddy-border hover:text-white transition-all active:scale-95"
            >
              Review Code
            </button>

            {hasNextLesson ? (
              <button
                onClick={() => {
                  onNextLesson()
                  onClose()
                }}
                className="flex-[1.5] flex items-center justify-center space-x-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500 transition-all active:scale-95"
              >
                <span>Next Challenge</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex-[1.5] flex items-center justify-center space-x-2 rounded-xl bg-linear-to-r from-amber-500 to-yellow-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-amber-500/25 transition-all active:scale-95"
              >
                <span>You Finished All Chapters! 🏆</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
