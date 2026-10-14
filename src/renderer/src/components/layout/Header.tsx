import React from 'react'
import {
  Flame,
  Zap,
  Menu,
  ChevronRight,
  BookOpen,
  WifiOff,
  Trophy,
  Volume2,
  VolumeX,
  Search
} from 'lucide-react'
import { cn } from '../../lib/utils'

interface HeaderProps {
  currentLessonNumber: string
  currentLessonTitle: string
  completedCount: number
  totalCount: number
  streakDays: number
  xp: number
  isSidebarOpen: boolean
  onToggleSidebar: () => void
  isPyodideReady?: boolean
  onOpenStats?: () => void
  soundEnabled?: boolean
  onToggleSound?: () => void
  onOpenSearch?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  currentLessonNumber,
  currentLessonTitle,
  completedCount,
  totalCount,
  streakDays,
  xp,
  isSidebarOpen,
  onToggleSidebar,
  isPyodideReady = false,
  onOpenStats,
  soundEnabled = true,
  onToggleSound,
  onOpenSearch
}) => {
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-coddy-border bg-[#1e293b]/85 px-4 backdrop-blur-md select-none z-20">
      {/* Left: App Logo, Journey Title, and Breadcrumbs */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          title={isSidebarOpen ? 'Close Curriculum Sidebar' : 'Open Curriculum Sidebar'}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200',
            isSidebarOpen
              ? 'bg-coddy-border border-slate-600 text-emerald-400'
              : 'border-coddy-border bg-coddy-dark/60 text-slate-300 hover:bg-coddy-border hover:text-white'
          )}
        >
          {isSidebarOpen ? <BookOpen className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        {/* Python Badge */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-tr from-emerald-500 to-cyan-500 shadow-md shadow-emerald-500/20">
            <span className="font-mono text-xs font-black text-white">Py</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold tracking-tight text-white text-sm hidden sm:inline">
              Python Fundamentals
            </span>
            <ChevronRight className="h-4 w-4 text-slate-500" />
            <div className="flex items-center space-x-1.5 bg-coddy-dark/80 px-2.5 py-1 rounded-md border border-coddy-border/60">
              <span className="font-mono text-xs font-semibold text-cyan-400">
                {currentLessonNumber}
              </span>
              <span className="text-xs font-medium text-slate-200 max-w-40 truncate">
                {currentLessonTitle}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Search Button / Bar (Ctrl + K) */}
        <button
          onClick={onOpenSearch}
          title="Quick Search Lessons (Ctrl + K)"
          className="hidden md:flex items-center space-x-2 rounded-lg border border-coddy-border bg-coddy-dark/70 px-2.5 py-1 text-xs text-slate-400 hover:border-slate-500 hover:text-slate-200 transition-all cursor-pointer ml-1"
        >
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-[11px] font-medium hidden lg:inline">Search lessons...</span>
          <kbd className="rounded bg-[#1e293b] px-1.5 py-0.2 border border-coddy-border text-[10px] text-slate-400 font-mono">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Center: Compact Progress Indicator (Clickable to open Course Stats Modal) */}
      <button
        onClick={onOpenStats}
        title="View Course Progress & Breakdown"
        className="hidden md:flex flex-col items-center justify-center min-w-52.5 text-left hover:opacity-90 transition-all p-1.5 rounded-lg hover:bg-coddy-dark/60 cursor-pointer"
      >
        <div className="flex items-center justify-between w-full text-[11px] font-medium text-slate-400 mb-1 px-1">
          <span className="text-slate-300">Curriculum Progress</span>
          <span className="text-emerald-400 font-semibold font-mono">
            {completedCount} / {totalCount} ({progressPercent}%)
          </span>
        </div>
        <div className="h-1.5 w-full bg-coddy-dark rounded-full overflow-hidden border border-coddy-border/60">
          <div
            className="h-full bg-linear-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </button>

      {/* Right: Gamification Badges, Stats Button, Sound Toggle & Offline Indicator */}
      <div className="flex items-center space-x-2">
        {/* Sound FX Toggle Button */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-lg border transition-all cursor-pointer',
            soundEnabled
              ? 'border-coddy-border bg-coddy-dark/60 text-slate-300 hover:bg-coddy-border hover:text-white'
              : 'border-rose-500/40 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
          )}
        >
          {soundEnabled ? (
            <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <VolumeX className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Pyodide Engine / Offline Badge */}
        <div
          title={
            isPyodideReady
              ? 'Pyodide Python 3.12 WebAssembly Engine Ready (Offline)'
              : 'Initializing WebAssembly Python Engine...'
          }
          className={cn(
            'hidden xl:flex items-center space-x-1.5 rounded-md border px-2.5 py-1 text-[11px] font-semibold transition-all',
            isPyodideReady
              ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-950/50 border-amber-500/30 text-amber-300'
          )}
        >
          <span
            className={cn(
              'h-2 w-2 rounded-full',
              isPyodideReady ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
            )}
          />
          <span>{isPyodideReady ? 'Python 3.12 WASM' : 'Loading WASM...'}</span>
        </div>

        {/* Offline Badge */}
        <div className="hidden sm:flex items-center space-x-1 rounded-md bg-coddy-dark/80 border border-emerald-500/30 px-2 py-1 text-[11px] font-medium text-emerald-300">
          <WifiOff className="h-3 w-3 text-emerald-400" />
          <span>Offline</span>
        </div>

        {/* Streak Counter */}
        <div
          title={`${streakDays} Day Coding Streak`}
          className="flex items-center space-x-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-400 transition-transform hover:scale-105"
        >
          <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-400 animate-pulse" />
          <span>{streakDays}d</span>
        </div>

        {/* XP Counter (Clickable to open Course Stats Modal) */}
        <button
          onClick={onOpenStats}
          title={`${xp} Total XP Earned • Click to view course achievements`}
          className="flex items-center space-x-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-bold text-cyan-400 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Zap className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400" />
          <span>{xp} XP</span>
        </button>

        {/* Trophy / Stats Button */}
        <button
          onClick={onOpenStats}
          title="Course Overview & Achievements Modal"
          className="flex items-center space-x-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-xs font-bold text-purple-300 transition-all hover:bg-purple-500/20 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Trophy className="h-3.5 w-3.5 text-purple-400" />
          <span className="hidden sm:inline">Stats</span>
        </button>
      </div>
    </header>
  )
}
