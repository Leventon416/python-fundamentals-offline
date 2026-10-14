import React, { useState } from 'react'
import { LessonPanel } from './LessonPanel'
import { EditorPanel } from './EditorPanel'
import { ConsoleLog } from './ConsoleDock'
import { Lesson, LessonStep, TestCase, TestResult } from '../../types/curriculum'

interface WorkspaceProps {
  lesson: Lesson
  hasPrevious: boolean
  hasNext: boolean
  onPrevious: () => void
  onNext: () => void
  code: string
  onChangeCode: (newCode: string) => void
  onResetCode: () => void
  activeConsoleTab: 'console' | 'tests'
  onChangeConsoleTab: (tab: 'console' | 'tests') => void
  isDockExpanded: boolean
  onToggleDockExpanded: () => void
  consoleOutput: ConsoleLog[]
  onClearConsole: () => void
  testCases: TestCase[]
  testResults: TestResult[]
  hasRunTests: boolean
  isRunning: boolean
  isEvaluatingTests?: boolean
  isPyodideReady: boolean
  onRunCode: () => void
  onSubmitTests: () => void
  onRunExample?: (
    code: string
  ) => Promise<{ stdout: string; error?: string; executionTimeMs?: number }>
  hasMilestoneStarter?: boolean
  onRestoreMilestoneStarter?: () => void
}

export const Workspace: React.FC<WorkspaceProps> = ({
  lesson,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  code,
  onChangeCode,
  onResetCode,
  activeConsoleTab,
  onChangeConsoleTab,
  isDockExpanded,
  onToggleDockExpanded,
  consoleOutput,
  onClearConsole,
  testCases,
  testResults,
  hasRunTests,
  isRunning,
  isEvaluatingTests,
  isPyodideReady,
  onRunCode,
  onSubmitTests,
  onRunExample,
  hasMilestoneStarter,
  onRestoreMilestoneStarter
}) => {
  const [activeStep, setActiveStep] = useState<LessonStep | null>(null)
  const isEditorEnabled = !activeStep || activeStep.type === 'code_task'

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Left Pane: Lesson & Instructions (~45% width) */}
      <div className="w-[45%] h-full shrink-0 flex flex-col min-w-90 max-w-170">
        <LessonPanel
          lesson={lesson}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          onPrevious={onPrevious}
          onNext={onNext}
          onApplySolution={onChangeCode}
          onRunExample={onRunExample}
          onStepChange={setActiveStep}
        />
      </div>

      {/* Right Pane: Editor & Execution Dock (~55% width) */}
      <div className="flex-1 h-full min-w-0 flex flex-col">
        <EditorPanel
          code={code}
          onChangeCode={onChangeCode}
          onResetCode={onResetCode}
          activeConsoleTab={activeConsoleTab}
          onChangeConsoleTab={onChangeConsoleTab}
          isDockExpanded={isDockExpanded}
          onToggleDockExpanded={onToggleDockExpanded}
          consoleOutput={consoleOutput}
          onClearConsole={onClearConsole}
          testCases={testCases}
          testResults={testResults}
          hasRunTests={hasRunTests}
          isRunning={isRunning}
          isEvaluatingTests={isEvaluatingTests}
          isPyodideReady={isPyodideReady}
          onRunCode={onRunCode}
          onSubmitTests={onSubmitTests}
          lessonXp={lesson.xp}
          isEditorEnabled={isEditorEnabled}
          hasMilestoneStarter={hasMilestoneStarter}
          onRestoreMilestoneStarter={onRestoreMilestoneStarter}
        />
      </div>
    </div>
  )
}
