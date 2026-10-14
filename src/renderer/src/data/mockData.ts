import { Chapter, UserStats } from '../types/curriculum'

export type {
  Lesson,
  Chapter,
  UserStats,
  TestCase,
  TestResult,
  TestSuiteResult,
  TestType
} from '../types/curriculum'

export const initialStats: UserStats = {
  streakDays: 3,
  xp: 150,
  completedCount: 1,
  totalLessons: 4
}

export const mockChapters: Chapter[] = [
  {
    id: 'ch-1',
    chapterNumber: 1,
    title: 'Chapter 1: Getting Started',
    description: 'Learn the fundamentals of Python syntax and your very first commands.',
    lessons: [
      {
        id: 'lesson-1-1',
        chapterId: 'ch-1',
        chapterTitle: 'Getting Started',
        lessonNumber: '1.1',
        title: 'Hello, World!',
        difficulty: 'Beginner',
        duration: '5 mins',
        xp: 50,
        status: 'completed',
        theory: [
          {
            heading: 'Your First Python Program',
            paragraphs: [
              'Welcome to your Python journey! Python is one of the most popular, versatile, and beginner-friendly programming languages in the world.',
              'In programming, the traditional way to start learning any new language is by writing a script that prints "Hello, World!" to the screen. In Python, this is accomplished using the built-in print() function.'
            ],
            codeSnippets: [
              {
                language: 'python',
                code: 'print("Hello, World!")',
                caption:
                  'The print function displays whatever text is placed inside the parentheses.'
              }
            ]
          },
          {
            heading: 'Understanding Strings',
            paragraphs: [
              'Text in Python is enclosed inside quotes (either double quotes "..." or single quotes \'...\'). This data type is called a string.',
              'Remember that Python is case-sensitive! You must write print in lowercase; writing Print or PRINT will produce an error.'
            ]
          }
        ],
        taskObjective: 'Print "Hello, World!" to the console using Python\'s print() function.',
        taskInstructions: [
          'Use the built-in print() function.',
          'Pass the string "Hello, World!" inside the parentheses.',
          'Click "Run Code" or press Ctrl+Enter to test output, then "Submit & Run Tests".'
        ],
        hints: [
          {
            id: 'hint-1-1-1',
            title: 'Syntax check',
            content: 'Make sure the text is enclosed in double quotation marks: "Hello, World!"'
          },
          {
            id: 'hint-1-1-2',
            title: 'Function casing',
            content: 'Ensure print is in all lowercase letters: print("Hello, World!")'
          }
        ],
        starterCode: '# Print your first message to the world below:\n',
        solutionCode: 'print("Hello, World!")\n',
        expectedOutput: 'Hello, World!',
        testCases: [
          {
            id: 'tc-1-1-1',
            description: 'Prints exact "Hello, World!" to stdout',
            type: 'stdout',
            expectedOutput: 'Hello, World!',
            trimWhitespace: true,
            caseSensitive: true
          }
        ]
      },
      {
        id: 'lesson-1-2',
        chapterId: 'ch-1',
        chapterTitle: 'Getting Started',
        lessonNumber: '1.2',
        title: 'Variables & Data Types',
        difficulty: 'Beginner',
        duration: '7 mins',
        xp: 50,
        status: 'active',
        theory: [
          {
            heading: 'What are Variables?',
            paragraphs: [
              'Variables are containers used to store data values in memory. Unlike many other programming languages, Python does not require you to declare variable types explicitly.',
              'To assign a value to a variable, use the assignment operator (=).'
            ],
            codeSnippets: [
              {
                language: 'python',
                code: 'name = "Alice"\nage = 25\nprint(name, age)',
                caption: 'Assigning a string and integer to variables.'
              }
            ]
          },
          {
            heading: 'Variable Types',
            paragraphs: [
              'Strings (str) store textual characters enclosed in quotes. Integers (int) store whole numerical values without quotes.',
              'Make sure variable names match the required naming conventions.'
            ]
          }
        ],
        taskObjective:
          'Create two variables: name with string value "Alice", and age with integer value 25.',
        taskInstructions: [
          'Create a variable called name and assign "Alice" to it.',
          'Create a variable called age and assign 25 to it.',
          'Print both variables.'
        ],
        hints: [
          {
            id: 'hint-1-2-1',
            title: 'String variable',
            content: 'name = "Alice"'
          },
          {
            id: 'hint-1-2-2',
            title: 'Integer variable',
            content: 'age = 25 (notice: no quotation marks around numbers)'
          }
        ],
        starterCode: '# Declare name and age variables below\n\n\n# Print both variables below\n',
        solutionCode: 'name = "Alice"\nage = 25\nprint(name, age)\n',
        expectedOutput: 'Alice 25',
        testCases: [
          {
            id: 'tc-1-2-1',
            description: 'Variable "name" is declared as "Alice"',
            type: 'variable',
            variableName: 'name',
            expectedValue: 'Alice',
            expectedType: 'str'
          },
          {
            id: 'tc-1-2-2',
            description: 'Variable "age" is declared as 25',
            type: 'variable',
            variableName: 'age',
            expectedValue: 25,
            expectedType: 'int'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-2',
    chapterNumber: 2,
    title: 'Chapter 2: Functions & Math',
    description: 'Learn how to write reusable functions and perform computations.',
    lessons: [
      {
        id: 'lesson-2-1',
        chapterId: 'ch-2',
        chapterTitle: 'Functions & Math',
        lessonNumber: '2.1',
        title: 'Writing Functions: Multiply',
        difficulty: 'Beginner',
        duration: '8 mins',
        xp: 60,
        status: 'locked',
        theory: [
          {
            heading: 'Defining Functions in Python',
            paragraphs: [
              'Functions are reusable blocks of code that take inputs (arguments), perform operations, and return an output using the return statement.',
              'Functions in Python are declared with the def keyword followed by the function name, parentheses containing parameters, and a colon (:).'
            ],
            codeSnippets: [
              {
                language: 'python',
                code: 'def multiply(a, b):\n    return a * b\n\nresult = multiply(4, 5)\nprint(result)  # 20',
                caption: 'Function that multiplies two numbers and returns the product.'
              }
            ]
          }
        ],
        taskObjective:
          'Define a function named multiply(a, b) that returns the product of a and b.',
        taskInstructions: [
          'Use def multiply(a, b): on line 1.',
          'Indent the function body with 4 spaces.',
          'Return the mathematical product of a and b using return a * b.'
        ],
        hints: [
          {
            id: 'hint-2-1-1',
            title: 'Function header',
            content: 'def multiply(a, b):'
          },
          {
            id: 'hint-2-1-2',
            title: 'Return statement',
            content: 'return a * b'
          }
        ],
        starterCode:
          '# Define the multiply function below\n\n\n# Test call:\nprint(multiply(3, 7))\n',
        solutionCode: 'def multiply(a, b):\n    return a * b\n',
        expectedOutput: '21',
        testCases: [
          {
            id: 'tc-2-1-1',
            description: 'multiply(3, 7) returns 21',
            type: 'function',
            functionName: 'multiply',
            args: [3, 7],
            expectedReturn: 21,
            hidden: false
          },
          {
            id: 'tc-2-1-2',
            description: 'multiply(10, 5) returns 50',
            type: 'function',
            functionName: 'multiply',
            args: [10, 5],
            expectedReturn: 50,
            hidden: false
          },
          {
            id: 'tc-2-1-3',
            description: 'Handles edge cases: zero and negative numbers',
            type: 'function',
            functionName: 'multiply',
            args: [-4, 6],
            expectedReturn: -24,
            hidden: true
          }
        ]
      },
      {
        id: 'lesson-2-2',
        chapterId: 'ch-2',
        chapterTitle: 'Functions & Math',
        lessonNumber: '2.2',
        title: 'String Formatting (F-Strings)',
        difficulty: 'Beginner',
        duration: '10 mins',
        xp: 75,
        status: 'locked',
        theory: [
          {
            heading: 'Modern String Formatting',
            paragraphs: [
              'Python 3.6 introduced f-strings (formatted string literals). They provide an elegant, readable way to embed variables directly inside strings.',
              'Prefix the string with the letter f and place variable expressions inside curly brackets {}.'
            ],
            codeSnippets: [
              {
                language: 'python',
                code: 'player = "Guido"\nscore = 100\nprint(f"Player {player} reached {score} points!")',
                caption: 'F-strings evaluate expressions inside {} automatically.'
              }
            ]
          }
        ],
        taskObjective:
          'Create a variable name = "Ada" and print a personalized welcome message using an f-string: "Welcome to Python, Ada!".',
        taskInstructions: [
          'Set name = "Ada".',
          'Use an f-string: f"Welcome to Python, {name}!"',
          'Print the resulting string.'
        ],
        hints: [
          {
            id: 'hint-2-2-1',
            title: 'F-String syntax',
            content:
              'Place the f immediately before the quotation mark: f"Welcome to Python, {name}!"'
          }
        ],
        starterCode: 'name = "Ada"\n\n# Print message using f-string below:\n',
        solutionCode: 'name = "Ada"\nprint(f"Welcome to Python, {name}!")\n',
        expectedOutput: 'Welcome to Python, Ada!',
        testCases: [
          {
            id: 'tc-2-2-1',
            description: 'Outputs personalized f-string greeting',
            type: 'stdout',
            expectedOutput: 'Welcome to Python, Ada!',
            trimWhitespace: true,
            caseSensitive: true
          }
        ]
      }
    ]
  }
]
