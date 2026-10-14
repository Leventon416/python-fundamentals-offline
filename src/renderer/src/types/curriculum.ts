export type TestType = 'stdout' | 'function' | 'variable' | 'state_and_stdout'

export interface SemanticConstraint {
  type: 'variable_assigned' | 'pattern_present' | 'pattern_absent'
  target: string
  message?: string
}

export interface ExpectedVariableSpec {
  value?: unknown
  type?: string
}

export interface GradingConfig {
  mode?: 'state_and_stdout' | 'stdout' | 'variable' | 'function'
  caseSensitive?: boolean
  normalizeLineEndings?: boolean
  ignoreOneFinalNewline?: boolean
  trimLines?: boolean
  semanticConstraints?: SemanticConstraint[]
}

export interface TestCase {
  id: string
  description: string
  type: TestType
  mode?: 'state_and_stdout' | 'stdout' | 'variable' | 'function'
  hidden?: boolean // Hidden test cases (revealed only upon failure or kept masked like Coddy)

  // Stdout & strict comparison rules:
  expectedOutput?: string | string[]
  expectedStdout?: string | string[]
  alternativeExpectedStdout?: string[]
  trimWhitespace?: boolean
  trimLines?: boolean
  caseSensitive?: boolean
  normalizeLineEndings?: boolean
  ignoreOneFinalNewline?: boolean

  // Variable inspection options:
  variableName?: string
  expectedValue?: unknown
  expectedType?: string // 'int', 'str', 'float', 'list', 'dict', 'bool'
  expectedVariables?: Record<string, ExpectedVariableSpec>

  // Function evaluation options:
  functionName?: string
  args?: unknown[]
  expectedReturn?: unknown

  // Static checks & composite grading config:
  semanticConstraints?: SemanticConstraint[]
  gradingConfig?: GradingConfig
}

export interface TestResult {
  testId: string
  description: string
  passed: boolean
  hidden?: boolean
  expected: string
  actual: string
  errorMessage?: string
  executionTimeMs?: number
}

export interface TestSuiteResult {
  passedCount: number
  totalCount: number
  allPassed: boolean
  results: TestResult[]
  totalExecutionTimeMs: number
}

export interface Hint {
  id?: string
  level?: number
  title?: string
  text?: string
  content?: string
}

export interface TheorySnippet {
  language: string
  code: string
  caption?: string
}

export interface TheorySection {
  heading: string
  paragraphs: string[]
  codeSnippets?: TheorySnippet[]
}

export interface LessonTask {
  objective: string
  instructions: string[]
}

// ---------------------------------------------------------------------------
// Discriminated Union Step Schema
// ---------------------------------------------------------------------------

export type LessonCategory = 'concept' | 'practice' | 'recap' | 'project_step' | 'checkpoint'

export type StepType =
  | 'explanation'
  | 'worked_example'
  | 'predict_output'
  | 'fill_blank'
  | 'true_false'
  | 'identify_error'
  | 'code_task'

// 1. Explanation Step
export interface ExplanationStep {
  id: string
  type: 'explanation'
  title: string
  content: string
}

// 2. Worked Example Step
export interface WorkedExampleStep {
  id: string
  type: 'worked_example'
  title: string
  description?: string
  code: string
  expectedStdout: string
  explanation?: string
}

// 3. Predict Output Step
export interface PredictOutputOption {
  id: string
  text: string
  isCorrect: boolean
  explanation: string
}

export interface PredictOutputStep {
  id: string
  type: 'predict_output'
  title: string
  question: string
  codeSnippet: string
  options: PredictOutputOption[]
}

// 4. Fill in the Blank Step
export interface FillBlankStep {
  id: string
  type: 'fill_blank'
  title: string
  prompt: string
  codeTemplate: string // Contains {{blank}}
  acceptedAnswers: string[]
  explanation: string
  hint?: string
}

// 5. True / False Step
export interface TrueFalseStep {
  id: string
  type: 'true_false'
  title: string
  statement: string
  correctAnswer: boolean
  explanation: string
}

// 6. Identify Error Step
export interface IdentifyErrorOption {
  id: string
  text: string
  isCorrect: boolean
  explanation: string
}

export interface IdentifyErrorStep {
  id: string
  type: 'identify_error'
  title: string
  question: string
  codeSnippet: string
  options: IdentifyErrorOption[]
}

// 7. Code Task Step
export interface CodeTaskStep {
  id: string
  type: 'code_task'
  title: string
  objective: string
  instructions: string[]
  starterCode?: string
  solutionCode?: string
  hints?: Hint[]
  testCases?: TestCase[]
  projectId?: string
  milestoneIndex?: number
  totalMilestones?: number
  previousMilestoneLessonId?: string
}

export type LessonStep =
  | ExplanationStep
  | WorkedExampleStep
  | PredictOutputStep
  | FillBlankStep
  | TrueFalseStep
  | IdentifyErrorStep
  | CodeTaskStep

export interface Lesson {
  id: string
  chapterId: string
  chapterTitle?: string
  lessonNumber: string
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category?: LessonCategory
  duration?: string
  durationMinutes?: number
  xp: number
  status?: 'completed' | 'active' | 'locked'
  steps?: LessonStep[]
  // Multi-milestone project step fields
  projectId?: string
  milestoneIndex?: number
  totalMilestones?: number
  previousMilestoneLessonId?: string
  // Legacy / single-task fields maintained for compatibility
  theory: TheorySection[]
  taskObjective: string
  taskInstructions: string[]
  task?: LessonTask
  hints: Hint[]
  starterCode: string
  solutionCode: string
  expectedOutput?: string
  testCases: TestCase[]
}

export interface Chapter {
  id: string
  chapterNumber: number
  title: string
  description: string
  lessons: Lesson[]
}

export interface UserStats {
  streakDays: number
  xp: number
  completedCount: number
  totalLessons: number
}

/**
 * Normalizes any lesson into a standard array of LessonStep objects.
 * If lesson.steps exists, returns it; otherwise synthesizes steps from legacy theory & task fields.
 */
export function getLessonSteps(lesson: Lesson): LessonStep[] {
  if (lesson.steps && lesson.steps.length > 0) {
    return lesson.steps
  }

  const steps: LessonStep[] = []

  if (lesson.theory && lesson.theory.length > 0) {
    const markdownContent = lesson.theory
      .map((sec) => {
        const text = sec.paragraphs.join('\n\n')
        const snippets =
          sec.codeSnippets
            ?.map(
              (s) => `\`\`\`${s.language}\n${s.code}\n\`\`\`${s.caption ? `\n*${s.caption}*` : ''}`
            )
            .join('\n\n') ?? ''
        return `### ${sec.heading}\n\n${text}${snippets ? `\n\n${snippets}` : ''}`
      })
      .join('\n\n---\n\n')

    steps.push({
      id: `${lesson.id}-step-theory`,
      type: 'explanation',
      title: 'Theory & Concept',
      content: markdownContent || lesson.title
    })
  }

  steps.push({
    id: `${lesson.id}-step-code`,
    type: 'code_task',
    title: 'Coding Task',
    objective: lesson.taskObjective || lesson.task?.objective || 'Complete the exercise.',
    instructions: lesson.taskInstructions || lesson.task?.instructions || [],
    starterCode: lesson.starterCode,
    solutionCode: lesson.solutionCode,
    hints: lesson.hints,
    testCases: lesson.testCases,
    projectId: lesson.projectId,
    milestoneIndex: lesson.milestoneIndex,
    totalMilestones: lesson.totalMilestones,
    previousMilestoneLessonId: lesson.previousMilestoneLessonId
  })

  return steps
}

export type CompletionKind = 'independent' | 'assisted'
