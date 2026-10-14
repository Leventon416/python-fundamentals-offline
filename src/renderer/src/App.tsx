import React, { useState, useMemo, useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { Header } from './components/layout/Header'
import { CurriculumSidebar } from './components/layout/CurriculumSidebar'
import { Workspace } from './components/workspace/Workspace'
import { ConsoleLog } from './components/workspace/ConsoleDock'
import { LessonCompletedModal } from './components/workspace/LessonCompletedModal'
import { CourseStatsModal } from './components/layout/CourseStatsModal'
import { CommandPalette } from './components/layout/CommandPalette'
import { usePythonRunner } from './hooks/usePythonRunner'
import { useGlobalShortcuts } from './hooks/useGlobalShortcuts'
import { playSuccessSound, playFailureSound } from './lib/soundEffects'
import { chapters as initialCurriculumChapters } from './data/curriculum'
import { Lesson, TestCase, TestResult } from './types/curriculum'
import { runTestSuite } from './lib/testRunner'
import { useCourseStore } from './store/useCourseStore'

export default function App(): React.JSX.Element {
  // Course store state & actions
  const {
    completedLessonIds,
    activeLessonId,
    xp,
    streak,
    soundEnabled,
    toggleSound,
    resetAllProgress,
    setActiveLesson,
    saveLessonCode,
    markLessonCompleted,
    resetLessonCode,
    unlockNextLesson,
    isLessonUnlocked,
    checkAndUpdateStreak,
    getLessonCode,
    hasMilestoneStarter,
    restoreMilestoneStarter,
    saveMilestoneSnapshot
  } = useCourseStore()

  // Update streak if needed on app mount
  useEffect(() => {
    checkAndUpdateStreak()
  }, [checkAndUpdateStreak])

  // Curriculum chapters
  const chapters = initialCurriculumChapters

  // Sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  // Real offline Pyodide Web Worker runner
  const { isReady: isPyodideReady, isRunning: isPyRunning, runCode } = usePythonRunner()

  // Flattened lessons list for sequential navigation
  const allLessons = useMemo(() => {
    return chapters.flatMap((c) => c.lessons)
  }, [chapters])

  // Current active lesson object (fallback to lesson 1.1 if not found)
  const currentLesson = useMemo(() => {
    return allLessons.find((l) => l.id === activeLessonId) || allLessons[0]
  }, [allLessons, activeLessonId])

  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id)
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < allLessons.length - 1
  const nextLessonObj = hasNext ? allLessons[currentIndex + 1] : null
  const hasNextLessonUnlocked = hasNext && !!nextLessonObj && isLessonUnlocked(nextLessonObj.id)

  // Editor draft code state (initialized from persistent store or carried-forward starter)
  const [editorCode, setEditorCode] = useState<string>(() => {
    return getLessonCode(currentLesson.id)
  })

  // Ref to track lesson ID transitions
  const prevLessonIdRef = useRef<string>(currentLesson.id)

  // Synchronize editor code when active lesson changes
  useEffect(() => {
    if (prevLessonIdRef.current !== currentLesson.id) {
      const codeToLoad = getLessonCode(currentLesson.id)
      setEditorCode(codeToLoad)
      prevLessonIdRef.current = currentLesson.id
    }
  }, [currentLesson.id, getLessonCode])

  // Auto-save code draft into store (debounced 300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveLessonCode(currentLesson.id, editorCode)
    }, 300)
    return () => clearTimeout(timer)
  }, [editorCode, currentLesson.id, saveLessonCode])

  // Console & execution state per lesson
  const [activeConsoleTab, setActiveConsoleTab] = useState<'console' | 'tests'>('console')
  const [isDockExpanded, setIsDockExpanded] = useState<boolean>(false)

  const [consoleOutputMap, setConsoleOutputMap] = useState<Record<string, ConsoleLog[]>>({
    'lesson-1-1': [
      {
        id: 'init-1',
        type: 'stdout',
        text: 'Hello, World!'
      },
      {
        id: 'init-2',
        type: 'info',
        text: '⚡ Real Python 3.12 WebAssembly Engine Active',
        executionTimeMs: 12
      }
    ]
  })

  const [testResultsMap, setTestResultsMap] = useState<Record<string, TestResult[]>>({})
  const [isEvaluatingTests, setIsEvaluatingTests] = useState<boolean>(false)
  const [hasRunTestsMap, setHasRunTestsMap] = useState<Record<string, boolean>>({})

  // Celebratory Completion Modal state
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState<boolean>(false)
  const [completedModalData, setCompletedModalData] = useState<{
    lesson: Lesson
    xpEarned: number
    totalXp: number
    streak: number
    isFirstTimeCompleted: boolean
    hasNextLesson: boolean
    isTrackCompleted: boolean
    completionKind?: 'independent' | 'assisted'
  } | null>(null)

  // Course Progress & Achievements Stats Modal state
  const [isStatsModalOpen, setIsStatsModalOpen] = useState<boolean>(false)

  // Quick Lesson Command Palette state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false)

  const currentConsoleOutput = consoleOutputMap[currentLesson.id] ?? []
  const currentTestCases = currentLesson.testCases
  const currentTestResults = testResultsMap[currentLesson.id] ?? []
  const currentHasRunTests = !!hasRunTestsMap[currentLesson.id]

  // Handlers
  const handleSelectLesson = (lesson: Lesson): void => {
    if (!isLessonUnlocked(lesson.id)) return
    // Immediately persist current draft before switching
    saveLessonCode(currentLesson.id, editorCode)
    setActiveLesson(lesson.id)
    setIsSidebarOpen(false)
  }

  const handlePreviousLesson = (): void => {
    if (hasPrevious) {
      saveLessonCode(currentLesson.id, editorCode)
      setActiveLesson(allLessons[currentIndex - 1].id)
    }
  }

  const handleNextLesson = (): void => {
    if (hasNextLessonUnlocked && nextLessonObj) {
      saveLessonCode(currentLesson.id, editorCode)
      setActiveLesson(nextLessonObj.id)
    }
  }

  const handleResetAllProgress = (): void => {
    resetAllProgress()
    setEditorCode(allLessons[0].starterCode)
  }

  // Register Global Keyboard Shortcuts (Ctrl+Enter, Ctrl+[, Ctrl+], Ctrl+B, Ctrl+K, Esc)
  useGlobalShortcuts({
    onSubmitTests: () => {
      if (!isEvaluatingTests) {
        handleSubmitTests()
      }
    },
    onPreviousLesson: handlePreviousLesson,
    onNextLesson: handleNextLesson,
    onToggleSidebar: () => setIsSidebarOpen((prev) => !prev),
    onOpenCommandPalette: () => setIsCommandPaletteOpen(true),
    onCloseModals: () => {
      setIsCommandPaletteOpen(false)
      setIsStatsModalOpen(false)
      setIsCompletedModalOpen(false)
    }
  })

  const handleCodeChange = (newCode: string): void => {
    setEditorCode(newCode)
  }

  const handleResetCode = (): void => {
    resetLessonCode(currentLesson.id)
    setEditorCode(currentLesson.starterCode)
  }

  const handleRestoreMilestoneStarter = (): void => {
    const restored = restoreMilestoneStarter(currentLesson.id)
    if (restored !== null) {
      setEditorCode(restored)
    }
  }

  const handleClearConsole = (): void => {
    setConsoleOutputMap((prev) => ({
      ...prev,
      [currentLesson.id]: []
    }))
  }

  // Real offline Python execution handler
  const handleRunCode = async (): Promise<void> => {
    setActiveConsoleTab('console')
    const result = await runCode(editorCode)

    const newLogs: ConsoleLog[] = []
    if (result.error) {
      newLogs.push({
        id: Math.random().toString(36).substring(2, 9),
        type: 'stderr',
        text: result.error
      })
    } else {
      if (result.stdout) {
        newLogs.push({
          id: Math.random().toString(36).substring(2, 9),
          type: 'stdout',
          text: result.stdout
        })
      }
      newLogs.push({
        id: Math.random().toString(36).substring(2, 9),
        type: 'info',
        text: result.stdout ? '⚡ Script executed successfully' : 'Script executed with no output.',
        executionTimeMs: result.executionTimeMs
      })
    }

    setConsoleOutputMap((prev) => ({
      ...prev,
      [currentLesson.id]: [...(prev[currentLesson.id] ?? []), ...newLogs]
    }))
  }

  // Real offline Python test evaluation engine handler
  const handleSubmitTests = async (): Promise<void> => {
    setActiveConsoleTab('tests')
    setIsEvaluatingTests(true)

    try {
      const testCasesToRun = (() => {
        if (currentLesson.steps) {
          const codeTask = currentLesson.steps.find((s) => s.type === 'code_task') as
            { testCases?: TestCase[] } | undefined
          if (codeTask?.testCases && codeTask.testCases.length > 0) {
            return codeTask.testCases
          }
        }
        return currentLesson.testCases || []
      })()

      const suiteResult = await runTestSuite(editorCode, testCasesToRun, runCode)

      setTestResultsMap((prev) => ({
        ...prev,
        [currentLesson.id]: suiteResult.results
      }))

      setHasRunTestsMap((prev) => ({
        ...prev,
        [currentLesson.id]: true
      }))

      if (suiteResult.allPassed) {
        // Play synthesized ascending 2-tone audio chime
        playSuccessSound()

        // Trigger celebratory confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#06b6d4', '#38bdf8', '#34d399', '#fcd34d', '#f59e0b']
        })

        // Persist lesson completion and calculate single XP award & updated streak
        const { isFirstTime, newXp, completionKind } = markLessonCompleted(
          currentLesson.id,
          currentLesson.xp,
          editorCode
        )

        if (currentLesson.category === 'project_step') {
          saveMilestoneSnapshot(currentLesson.id, editorCode)
        }

        const isTrackCompleted = currentIndex === allLessons.length - 1

        setCompletedModalData({
          lesson: currentLesson,
          xpEarned: currentLesson.xp,
          totalXp: newXp,
          streak: useCourseStore.getState().streak,
          isFirstTimeCompleted: isFirstTime,
          hasNextLesson: hasNext,
          isTrackCompleted,
          completionKind
        })
        setIsCompletedModalOpen(true)
      } else {
        // Play subtle low soft tone on test failure
        playFailureSound()
      }
    } catch (err: unknown) {
      console.error('Error running test suite:', err)
    } finally {
      setIsEvaluatingTests(false)
    }
  }

  // Handle advancing from the celebratory modal
  const handleNextChallengeFromModal = (): void => {
    setIsCompletedModalOpen(false)
    const nextId = unlockNextLesson(currentLesson.id)
    if (nextId) {
      setActiveLesson(nextId)
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-coddy-dark text-slate-100 overflow-hidden font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Navigation Bar with persistent badges & progress bar */}
      <Header
        currentLessonNumber={currentLesson.lessonNumber}
        currentLessonTitle={currentLesson.title}
        completedCount={completedLessonIds.length}
        totalCount={allLessons.length}
        streakDays={streak}
        xp={xp}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isPyodideReady={isPyodideReady}
        onOpenStats={() => setIsStatsModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Workspace Area with Collapsible Sidebar */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Collapsible Left Curriculum Drawer with persistent locked/unlocked state */}
        <CurriculumSidebar
          chapters={chapters}
          activeLessonId={currentLesson.id}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSelectLesson={handleSelectLesson}
        />

        {/* Split Screen Workspace with real Python Runner */}
        <Workspace
          lesson={currentLesson}
          hasPrevious={hasPrevious}
          hasNext={hasNextLessonUnlocked}
          onPrevious={handlePreviousLesson}
          onNext={handleNextLesson}
          code={editorCode}
          onChangeCode={handleCodeChange}
          onResetCode={handleResetCode}
          activeConsoleTab={activeConsoleTab}
          onChangeConsoleTab={setActiveConsoleTab}
          isDockExpanded={isDockExpanded}
          onToggleDockExpanded={() => setIsDockExpanded((prev) => !prev)}
          consoleOutput={currentConsoleOutput}
          onClearConsole={handleClearConsole}
          testCases={currentTestCases}
          testResults={currentTestResults}
          hasRunTests={currentHasRunTests}
          isRunning={isPyRunning}
          isEvaluatingTests={isEvaluatingTests}
          isPyodideReady={isPyodideReady}
          onRunCode={handleRunCode}
          onSubmitTests={handleSubmitTests}
          onRunExample={runCode}
          hasMilestoneStarter={hasMilestoneStarter(currentLesson.id)}
          onRestoreMilestoneStarter={handleRestoreMilestoneStarter}
        />
      </div>

      {/* Celebratory Completion Modal */}
      {completedModalData && (
        <LessonCompletedModal
          isOpen={isCompletedModalOpen}
          onClose={() => setIsCompletedModalOpen(false)}
          lesson={completedModalData.lesson}
          xpEarned={completedModalData.xpEarned}
          totalXp={completedModalData.totalXp}
          streak={completedModalData.streak}
          isFirstTimeCompleted={completedModalData.isFirstTimeCompleted}
          hasNextLesson={completedModalData.hasNextLesson}
          onNextLesson={handleNextChallengeFromModal}
          isTrackCompleted={completedModalData.isTrackCompleted}
          completionKind={completedModalData.completionKind}
        />
      )}

      {/* Course Progress & Achievements Modal */}
      <CourseStatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        chapters={chapters}
        completedLessonIds={completedLessonIds}
        totalXp={xp}
        streak={streak}
        totalLessons={allLessons.length}
        onResetAllProgress={handleResetAllProgress}
      />

      {/* Quick Lesson Command Palette (Ctrl + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        chapters={chapters}
        activeLessonId={currentLesson.id}
        completedLessonIds={completedLessonIds}
        isLessonUnlocked={isLessonUnlocked}
        onSelectLesson={handleSelectLesson}
      />
    </div>
  )
}
