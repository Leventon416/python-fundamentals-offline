import { Chapter } from '../../types/curriculum'

export const chapter3: Chapter = {
  id: 'ch-3',
  chapterNumber: 3,
  title: 'Chapter 3: Numbers & Basic Operators',
  description:
    'Master mathematical calculations in Python: arithmetic operations, integer floor division, modulo, and exponentiation with operator precedence.',
  lessons: [
    // -------------------------------------------------------------------------
    // Lesson 3.1: Basic Math Operations
    // -------------------------------------------------------------------------
    {
      id: 'lesson-3-1',
      chapterId: 'ch-3',
      chapterTitle: 'Numbers & Basic Operators',
      lessonNumber: '3.1',
      title: 'Basic Math Operations',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '8 mins',
      durationMinutes: 8,
      xp: 60,
      status: 'locked',
      steps: [
        {
          id: 'l3-1-step-explanation',
          type: 'explanation',
          title: 'Python as a Calculator',
          content: `Python excels at mathematical calculations using standard arithmetic operators:
- **Addition (\`+\`):** Adds two numbers.
- **Subtraction (\`-\`):** Subtracts the right operand from the left.
- **Multiplication (\`*\`):** Multiplies numbers.
- **Division (\`/\`):** Divides numbers.

### Division Always Produces a Float
An important rule in Python: standard division with a single slash (\`/\`) **always returns a float**, even if the numbers divide evenly!
For instance, \`20 / 4\` produces \`5.0\`, not \`5\`.`
        },
        {
          id: 'l3-1-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Bakery Production Calculations',
          description:
            'Observe how arithmetic operators calculate flour additions, batch differences, product totals, and portions.',
          code: 'flour_kg = 50\nbatch_size = 5\nprint(flour_kg + batch_size)\nprint(flour_kg - batch_size)\nprint(flour_kg * batch_size)\nprint(flour_kg / batch_size)',
          expectedStdout: '55\n45\n250\n10.0',
          explanation:
            'Notice that 50 / 5 evaluates to 10.0 (a float with .0), while +, -, and * on integers yield integers.'
        },
        {
          id: 'l3-1-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Division Result Type',
          question: 'What will the following code output to the console?',
          codeSnippet: 'volts = 24\namps = 3\nprint(volts / amps)',
          options: [
            {
              id: 'opt-3-1-correct',
              text: '8.0',
              isCorrect: true,
              explanation:
                'Correct! In Python 3, single-slash division (/) always returns a float (8.0).'
            },
            {
              id: 'opt-3-1-int',
              text: '8',
              isCorrect: false,
              explanation:
                'Incorrect: Regular division / always produces a decimal float, never an integer.'
            },
            {
              id: 'opt-3-1-str',
              text: '24/3',
              isCorrect: false,
              explanation: 'Incorrect: Python computes the mathematical result of the expression.'
            },
            {
              id: 'opt-3-1-err',
              text: 'Error',
              isCorrect: false,
              explanation: 'Incorrect: Dividing integers is completely valid Python syntax.'
            }
          ]
        },
        {
          id: 'l3-1-step-true-false',
          type: 'true_false',
          title: 'Concept Check 2: Division Behavior',
          statement:
            'In Python, dividing two integers with a single slash (/) always returns a floating-point number.',
          correctAnswer: true,
          explanation:
            'Correct! Single slash division always produces a float in Python 3, even if the result divides evenly.'
        },
        {
          id: 'l3-1-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Travel Budget Calculations',
          objective:
            'Given budget = 100 and daily_rate = 20, calculate four variables: total_fund (budget + daily_rate), remaining_fund (budget - daily_rate), boosted_fund (budget * daily_rate), and trip_days (budget / daily_rate). Print all four variables separated by spaces.',
          instructions: [
            'Compute total_fund as the sum: budget + daily_rate (120).',
            'Compute remaining_fund as the difference: budget - daily_rate (80).',
            'Compute boosted_fund as the product: budget * daily_rate (2000).',
            'Compute trip_days as the division: budget / daily_rate (5.0).',
            'Print all four variables: print(total_fund, remaining_fund, boosted_fund, trip_days).'
          ],
          starterCode:
            'budget = 100\ndaily_rate = 20\n\n# Calculate total_fund, remaining_fund, boosted_fund, and trip_days below:\n',
          solutionCode:
            'budget = 100\ndaily_rate = 20\ntotal_fund = budget + daily_rate\nremaining_fund = budget - daily_rate\nboosted_fund = budget * daily_rate\ntrip_days = budget / daily_rate\nprint(total_fund, remaining_fund, boosted_fund, trip_days)\n',
          hints: [
            {
              id: 'h-3-1-1',
              level: 1,
              title: 'Operator symbols',
              text: 'Use + for addition, - for subtraction, * for multiplication, and / for division.',
              content:
                'Use + for addition, - for subtraction, * for multiplication, and / for division.'
            },
            {
              id: 'h-3-1-2',
              level: 2,
              title: 'Code skeleton',
              text: 'total_fund = budget + daily_rate\nremaining_fund = budget - daily_rate\nboosted_fund = budget * daily_rate\ntrip_days = budget / daily_rate\nprint(total_fund, remaining_fund, boosted_fund, trip_days)',
              content:
                'total_fund = budget + daily_rate\nremaining_fund = budget - daily_rate\nboosted_fund = budget * daily_rate\ntrip_days = budget / daily_rate\nprint(total_fund, remaining_fund, boosted_fund, trip_days)'
            }
          ],
          testCases: [
            {
              id: 'tc-3-1-1',
              description:
                'Calculates total_fund=120, remaining_fund=80, boosted_fund=2000, trip_days=5.0',
              type: 'state_and_stdout',
              expectedStdout: '120 80 2000 5.0',
              expectedVariables: {
                total_fund: { value: 120, type: 'int' },
                remaining_fund: { value: 80, type: 'int' },
                boosted_fund: { value: 2000, type: 'int' },
                trip_days: { value: 5.0, type: 'float' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'total_fund',
                  message: "Make sure you calculate 'total_fund'."
                },
                {
                  type: 'variable_assigned',
                  target: 'trip_days',
                  message: "Make sure you calculate 'trip_days'."
                }
              ]
            },
            {
              id: 'tc-3-1-2',
              description: 'Verifies trip_days is float 5.0 and arithmetic operations match',
              type: 'state_and_stdout',
              expectedStdout: '120 80 2000 5.0',
              expectedVariables: {
                total_fund: { value: 120, type: 'int' },
                remaining_fund: { value: 80, type: 'int' },
                boosted_fund: { value: 2000, type: 'int' },
                trip_days: { value: 5.0, type: 'float' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              hidden: true
            }
          ]
        }
      ],
      theory: [
        {
          heading: 'Python as a Calculator',
          paragraphs: [
            'Python excels at mathematical calculations using standard arithmetic operators: addition (+), subtraction (-), multiplication (*), and division (/).',
            'An important rule in Python: standard division with a single slash (/) always returns a float (decimal), even if the numbers divide evenly. For instance, 50 / 5 produces 10.0, not 10.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'flour_kg = 50\nbatch_size = 5\nprint(flour_kg + batch_size)  # 55\nprint(flour_kg - batch_size)  # 45\nprint(flour_kg * batch_size)  # 250\nprint(flour_kg / batch_size)  # 10.0 (always a float!)',
              caption: 'Basic arithmetic operators in Python.'
            }
          ]
        }
      ],
      taskObjective:
        'Given budget = 100 and daily_rate = 20, calculate four variables: total_fund (budget + daily_rate), remaining_fund (budget - daily_rate), boosted_fund (budget * daily_rate), and trip_days (budget / daily_rate). Print all four variables separated by spaces.',
      taskInstructions: [
        'Compute total_fund as the sum: budget + daily_rate (120).',
        'Compute remaining_fund as the difference: budget - daily_rate (80).',
        'Compute boosted_fund as the product: budget * daily_rate (2000).',
        'Compute trip_days as the division: budget / daily_rate (5.0).',
        'Print all four variables: print(total_fund, remaining_fund, boosted_fund, trip_days).'
      ],
      hints: [
        {
          id: 'h-3-1-1',
          level: 1,
          title: 'Operator symbols',
          text: 'Use + for addition, - for subtraction, * for multiplication, and / for division.',
          content:
            'Use + for addition, - for subtraction, * for multiplication, and / for division.'
        },
        {
          id: 'h-3-1-2',
          level: 2,
          title: 'Code skeleton',
          text: 'total_fund = budget + daily_rate\nremaining_fund = budget - daily_rate\nboosted_fund = budget * daily_rate\ntrip_days = budget / daily_rate\nprint(total_fund, remaining_fund, boosted_fund, trip_days)',
          content:
            'total_fund = budget + daily_rate\nremaining_fund = budget - daily_rate\nboosted_fund = budget * daily_rate\ntrip_days = budget / daily_rate\nprint(total_fund, remaining_fund, boosted_fund, trip_days)'
        }
      ],
      starterCode:
        'budget = 100\ndaily_rate = 20\n\n# Calculate total_fund, remaining_fund, boosted_fund, and trip_days below:\n',
      solutionCode:
        'budget = 100\ndaily_rate = 20\ntotal_fund = budget + daily_rate\nremaining_fund = budget - daily_rate\nboosted_fund = budget * daily_rate\ntrip_days = budget / daily_rate\nprint(total_fund, remaining_fund, boosted_fund, trip_days)\n',
      expectedOutput: '120 80 2000 5.0',
      testCases: [
        {
          id: 'tc-3-1-1',
          description:
            'Calculates total_fund=120, remaining_fund=80, boosted_fund=2000, trip_days=5.0',
          type: 'state_and_stdout',
          expectedStdout: '120 80 2000 5.0',
          expectedVariables: {
            total_fund: { value: 120, type: 'int' },
            remaining_fund: { value: 80, type: 'int' },
            boosted_fund: { value: 2000, type: 'int' },
            trip_days: { value: 5.0, type: 'float' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'total_fund',
              message: "Make sure you calculate 'total_fund'."
            },
            {
              type: 'variable_assigned',
              target: 'trip_days',
              message: "Make sure you calculate 'trip_days'."
            }
          ]
        },
        {
          id: 'tc-3-1-2',
          description: 'Verifies trip_days is float 5.0 and arithmetic operations match',
          type: 'state_and_stdout',
          expectedStdout: '120 80 2000 5.0',
          expectedVariables: {
            total_fund: { value: 120, type: 'int' },
            remaining_fund: { value: 80, type: 'int' },
            boosted_fund: { value: 2000, type: 'int' },
            trip_days: { value: 5.0, type: 'float' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          hidden: true
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Lesson 3.2: Floor Division & Modulo
    // -------------------------------------------------------------------------
    {
      id: 'lesson-3-2',
      chapterId: 'ch-3',
      chapterTitle: 'Numbers & Basic Operators',
      lessonNumber: '3.2',
      title: 'Floor Division & Modulo',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '8 mins',
      durationMinutes: 8,
      xp: 70,
      status: 'locked',
      steps: [
        {
          id: 'l3-2-step-explanation',
          type: 'explanation',
          title: 'Floor Division & Remainder',
          content: `When dividing whole numbers in computer science, you frequently need both the whole quotient and the leftover remainder:

### Floor Division (\`//\`)
Double slashes (\`//\`) divide numbers and discard any fractional part, rounding down to the nearest integer.
For example, \`26 // 12\` equals \`2\` because 12 fits into 26 two full times.

### Modulo Operator (\`%\`)
The percent sign (\`%\`) calculates the **remainder** left over after division.
For example, \`26 % 12\` is \`2\` (since \`26 = 2 * 12 + 2\`).`
        },
        {
          id: 'l3-2-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Packing Egg Cartons',
          description:
            'Observe how floor division finds full cartons and modulo finds leftover eggs.',
          code: 'eggs = 26\ncarton_size = 12\nprint(eggs // carton_size)\nprint(eggs % carton_size)',
          expectedStdout: '2\n2',
          explanation: '26 // 12 produces 2 full cartons. 26 % 12 leaves 2 remaining eggs.'
        },
        {
          id: 'l3-2-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Team Formation Remainder',
          question: 'What will the following code output to the console?',
          codeSnippet: 'players = 23\nteam_size = 5\nprint(players % team_size)',
          options: [
            {
              id: 'opt-3-2-correct',
              text: '3',
              isCorrect: true,
              explanation:
                'Correct! 23 divided by 5 is 4 full teams with 3 players left over (4 * 5 = 20, 23 - 20 = 3).'
            },
            {
              id: 'opt-3-2-quot',
              text: '4',
              isCorrect: false,
              explanation:
                'Incorrect: 4 is the floor division quotient (players // team_size), not the remainder.'
            },
            {
              id: 'opt-3-2-float',
              text: '4.6',
              isCorrect: false,
              explanation:
                'Incorrect: Modulo returns the integer remainder, not a floating point division.'
            },
            {
              id: 'opt-3-2-zero',
              text: '0',
              isCorrect: false,
              explanation: 'Incorrect: 23 is not evenly divisible by 5, so the remainder is not 0.'
            }
          ]
        },
        {
          id: 'l3-2-step-fill-blank',
          type: 'fill_blank',
          title: 'Concept Check 2: Floor Division Operator',
          prompt:
            'Fill in the blank with the floor division operator to find how many full 24-hour days are in 75 hours:',
          codeTemplate: 'hours = 75\nfull_days = hours {{blank}} 24',
          acceptedAnswers: ['//'],
          explanation:
            'The double slash // operator performs floor division, returning the whole number quotient.',
          hint: 'Type // for floor division.'
        },
        {
          id: 'l3-2-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Server Rack Hard Drive Storage',
          objective:
            'You have hard_drives = 43 to install into racks holding slots_per_rack = 8 drives each. Calculate full_racks using // and spare_drives using %. Print full_racks and spare_drives separated by a space.',
          instructions: [
            'Use floor division (//) to set full_racks = hard_drives // slots_per_rack.',
            'Use modulo (%) to set spare_drives = hard_drives % slots_per_rack.',
            'Print both variables using print(full_racks, spare_drives).'
          ],
          starterCode:
            'hard_drives = 43\nslots_per_rack = 8\n\n# Calculate full_racks and spare_drives below:\n',
          solutionCode:
            'hard_drives = 43\nslots_per_rack = 8\nfull_racks = hard_drives // slots_per_rack\nspare_drives = hard_drives % slots_per_rack\nprint(full_racks, spare_drives)\n',
          hints: [
            {
              id: 'h-3-2-1',
              level: 1,
              title: 'Operators guide',
              text: 'Use // to find full racks and % to find leftover spare drives.',
              content: 'Use // to find full racks and % to find leftover spare drives.'
            },
            {
              id: 'h-3-2-2',
              level: 2,
              title: 'Code implementation',
              text: 'full_racks = hard_drives // slots_per_rack\nspare_drives = hard_drives % slots_per_rack\nprint(full_racks, spare_drives)',
              content:
                'full_racks = hard_drives // slots_per_rack\nspare_drives = hard_drives % slots_per_rack\nprint(full_racks, spare_drives)'
            }
          ],
          testCases: [
            {
              id: 'tc-3-2-1',
              description: 'Calculates full_racks=5 and spare_drives=3, outputs "5 3"',
              type: 'state_and_stdout',
              expectedStdout: '5 3',
              expectedVariables: {
                full_racks: { value: 5, type: 'int' },
                spare_drives: { value: 3, type: 'int' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'full_racks',
                  message: "Make sure you calculate 'full_racks'."
                },
                {
                  type: 'variable_assigned',
                  target: 'spare_drives',
                  message: "Make sure you calculate 'spare_drives'."
                }
              ]
            },
            {
              id: 'tc-3-2-2',
              description: 'Verifies integer results for floor division and modulo',
              type: 'state_and_stdout',
              expectedStdout: '5 3',
              expectedVariables: {
                full_racks: { value: 5, type: 'int' },
                spare_drives: { value: 3, type: 'int' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              hidden: true
            }
          ]
        }
      ],
      theory: [
        {
          heading: 'Floor Division (//)',
          paragraphs: [
            'When you want to divide numbers and discard any fractional part (rounding down to the nearest whole integer), use double slashes (//), known as floor division.',
            'For example, 26 // 12 equals 2, because 12 goes into 26 two full times.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'eggs = 26\ncarton_size = 12\nprint(eggs // carton_size)  # 2 full cartons\nprint(eggs % carton_size)   # 2 leftover eggs',
              caption: '// truncates the decimal component; % extracts the remainder.'
            }
          ]
        }
      ],
      taskObjective:
        'You have hard_drives = 43 to install into racks holding slots_per_rack = 8 drives each. Calculate full_racks using // and spare_drives using %. Print full_racks and spare_drives separated by a space.',
      taskInstructions: [
        'Use floor division (//) to set full_racks = hard_drives // slots_per_rack.',
        'Use modulo (%) to set spare_drives = hard_drives % slots_per_rack.',
        'Print both variables using print(full_racks, spare_drives).'
      ],
      hints: [
        {
          id: 'h-3-2-1',
          level: 1,
          title: 'Operators guide',
          text: 'Use // to find full racks and % to find leftover spare drives.',
          content: 'Use // to find full racks and % to find leftover spare drives.'
        },
        {
          id: 'h-3-2-2',
          level: 2,
          title: 'Code implementation',
          text: 'full_racks = hard_drives // slots_per_rack\nspare_drives = hard_drives % slots_per_rack\nprint(full_racks, spare_drives)',
          content:
            'full_racks = hard_drives // slots_per_rack\nspare_drives = hard_drives % slots_per_rack\nprint(full_racks, spare_drives)'
        }
      ],
      starterCode:
        'hard_drives = 43\nslots_per_rack = 8\n\n# Calculate full_racks and spare_drives below:\n',
      solutionCode:
        'hard_drives = 43\nslots_per_rack = 8\nfull_racks = hard_drives // slots_per_rack\nspare_drives = hard_drives % slots_per_rack\nprint(full_racks, spare_drives)\n',
      expectedOutput: '5 3',
      testCases: [
        {
          id: 'tc-3-2-1',
          description: 'Calculates full_racks=5 and spare_drives=3, outputs "5 3"',
          type: 'state_and_stdout',
          expectedStdout: '5 3',
          expectedVariables: {
            full_racks: { value: 5, type: 'int' },
            spare_drives: { value: 3, type: 'int' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'full_racks',
              message: "Make sure you calculate 'full_racks'."
            },
            {
              type: 'variable_assigned',
              target: 'spare_drives',
              message: "Make sure you calculate 'spare_drives'."
            }
          ]
        },
        {
          id: 'tc-3-2-2',
          description: 'Verifies integer results for floor division and modulo',
          type: 'state_and_stdout',
          expectedStdout: '5 3',
          expectedVariables: {
            full_racks: { value: 5, type: 'int' },
            spare_drives: { value: 3, type: 'int' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          hidden: true
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Lesson 3.3: Exponentiation & Precedence
    // -------------------------------------------------------------------------
    {
      id: 'lesson-3-3',
      chapterId: 'ch-3',
      chapterTitle: 'Numbers & Basic Operators',
      lessonNumber: '3.3',
      title: 'Exponentiation & Precedence',
      difficulty: 'Intermediate',
      category: 'concept',
      duration: '10 mins',
      durationMinutes: 10,
      xp: 75,
      status: 'locked',
      steps: [
        {
          id: 'l3-3-step-explanation',
          type: 'explanation',
          title: 'Powers & Operator Precedence',
          content: `In Python, the power operator is double asterisks (\`**\`). For example, \`2 ** 3\` means 2 cubed (\`2 * 2 * 2 = 8\`).

> **Warning:** Do not use the caret symbol (\`^\`) for exponents! In Python, \`^\` is the bitwise XOR operator, not powers.

### Operator Precedence (PEMDAS)
When combining operators in an expression, Python follows standard precedence order:
1. **Parentheses \`()\`**
2. **Exponentiation \`**\`**
3. **Multiplication \`*\`, Division \`/\`, Floor Division \`//\`, Modulo \`%\`**
4. **Addition \`+\`, Subtraction \`-\`**

You can always use parentheses to explicitly control which operation happens first.`
        },
        {
          id: 'l3-3-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Bacteria Growth Model',
          description:
            'Observe how exponentiation calculates exponential growth over several generations.',
          code: 'initial_cells = 3\ngenerations = 4\nprint(initial_cells ** generations)',
          expectedStdout: '81',
          explanation: '3 ** 4 evaluates to 3 * 3 * 3 * 3 = 81.'
        },
        {
          id: 'l3-3-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Exponent Precedence',
          question: 'What will the following code output to the console?',
          codeSnippet: 'base = 2\nprint(10 + base ** 3)',
          options: [
            {
              id: 'opt-3-3-correct',
              text: '18',
              isCorrect: true,
              explanation:
                'Correct! Exponentiation (**) has higher precedence than addition (+). base ** 3 evaluates to 8 first, and 10 + 8 = 18.'
            },
            {
              id: 'opt-3-3-addfirst',
              text: '1728',
              isCorrect: false,
              explanation:
                'Incorrect: Addition does not take precedence over powers unless parentheses are used: (10 + 2) ** 3 = 1728.'
            },
            {
              id: 'opt-3-3-wrongpower',
              text: '16',
              isCorrect: false,
              explanation: 'Incorrect: 2 ** 3 is 8, not 6.'
            },
            {
              id: 'opt-3-3-xor',
              text: '11',
              isCorrect: false,
              explanation: 'Incorrect: ** calculates power (2 ** 3 = 8).'
            }
          ]
        },
        {
          id: 'l3-3-step-identify-error',
          type: 'identify_error',
          title: 'Concept Check 2: The Caret Trap',
          question: 'What is the bug in this attempt to square the number 5?',
          codeSnippet: 'square = 5 ^ 2\nprint(square)',
          options: [
            {
              id: 'opt-3-3-err-caret',
              text: '^ is the bitwise XOR operator in Python, not exponentiation; use ** instead',
              isCorrect: true,
              explanation:
                'Correct! In Python, powers are written with ** (e.g. 5 ** 2 = 25). The caret symbol ^ calculates bitwise XOR.'
            },
            {
              id: 'opt-3-3-err-quotes',
              text: '5 must be wrapped in quotation marks',
              isCorrect: false,
              explanation:
                'Incorrect: Numbers are written without quotes for mathematical operations.'
            },
            {
              id: 'opt-3-3-err-math',
              text: 'Python requires importing the math module to square numbers',
              isCorrect: false,
              explanation: 'Incorrect: The ** operator is built directly into Python syntax.'
            },
            {
              id: 'opt-3-3-err-print',
              text: 'print() cannot output variables named square',
              isCorrect: false,
              explanation: 'Incorrect: square is a valid variable name.'
            }
          ]
        },
        {
          id: 'l3-3-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Cube Volume Scaling',
          objective:
            'Calculate the mathematical formula (4 + 2) ** 3 and store the result in a variable named volume. Print volume.',
          instructions: [
            'Declare a variable named volume.',
            'Set volume to (4 + 2) ** 3 (which adds 4 and 2 inside parentheses first to get 6, then cubes 6 to 216).',
            'Print volume.'
          ],
          starterCode: '# Compute (4 + 2) ** 3 and store in volume below:\n',
          solutionCode: 'volume = (4 + 2) ** 3\nprint(volume)\n',
          hints: [
            {
              id: 'h-3-3-1',
              level: 1,
              title: 'Parentheses and powers',
              text: 'Wrap the addition inside parentheses: (4 + 2), then use ** 3.',
              content: 'Wrap the addition inside parentheses: (4 + 2), then use ** 3.'
            },
            {
              id: 'h-3-3-2',
              level: 2,
              title: 'Code solution',
              text: 'volume = (4 + 2) ** 3\nprint(volume)',
              content: 'volume = (4 + 2) ** 3\nprint(volume)'
            }
          ],
          testCases: [
            {
              id: 'tc-3-3-1',
              description: 'Variable "volume" equals 216 ((4 + 2) ** 3)',
              type: 'state_and_stdout',
              expectedStdout: '216',
              expectedVariables: {
                volume: { value: 216, type: 'int' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'volume',
                  message: "Make sure you declare the 'volume' variable."
                }
              ]
            },
            {
              id: 'tc-3-3-2',
              description: 'Verifies operator precedence evaluated correctly (6 ** 3 == 216)',
              type: 'state_and_stdout',
              expectedStdout: '216',
              expectedVariables: {
                volume: { value: 216, type: 'int' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              hidden: true
            }
          ]
        }
      ],
      theory: [
        {
          heading: 'Powers with Exponentiation (**)',
          paragraphs: [
            'In Python, the power operator is double asterisks (**). For example, 2 ** 3 means 2 cubed (2 * 2 * 2 = 8).',
            'Warning: Do not use the caret symbol (^) for exponents! In Python, ^ is the bitwise XOR operator, not powers.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'initial_cells = 3\ngenerations = 4\nprint(initial_cells ** generations)  # 81',
              caption: 'Use ** for exponentiation in Python.'
            }
          ]
        }
      ],
      taskObjective:
        'Calculate the mathematical formula (4 + 2) ** 3 and store the result in a variable named volume. Print volume.',
      taskInstructions: [
        'Declare a variable named volume.',
        'Set volume to (4 + 2) ** 3 (which adds 4 and 2 first to get 6, then cubes it to 216).',
        'Print the value of volume.'
      ],
      hints: [
        {
          id: 'h-3-3-1',
          level: 1,
          title: 'Parentheses and powers',
          text: 'Wrap the addition inside parentheses: (4 + 2), then use ** 3.',
          content: 'Wrap the addition inside parentheses: (4 + 2), then use ** 3.'
        },
        {
          id: 'h-3-3-2',
          level: 2,
          title: 'Code solution',
          text: 'volume = (4 + 2) ** 3\nprint(volume)',
          content: 'volume = (4 + 2) ** 3\nprint(volume)'
        }
      ],
      starterCode: '# Compute (4 + 2) ** 3 and store in volume below:\n',
      solutionCode: 'volume = (4 + 2) ** 3\nprint(volume)\n',
      expectedOutput: '216',
      testCases: [
        {
          id: 'tc-3-3-1',
          description: 'Variable "volume" equals 216 ((4 + 2) ** 3)',
          type: 'state_and_stdout',
          expectedStdout: '216',
          expectedVariables: {
            volume: { value: 216, type: 'int' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'volume',
              message: "Make sure you declare the 'volume' variable."
            }
          ]
        },
        {
          id: 'tc-3-3-2',
          description: 'Verifies operator precedence evaluated correctly (6 ** 3 == 216)',
          type: 'state_and_stdout',
          expectedStdout: '216',
          expectedVariables: {
            volume: { value: 216, type: 'int' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          hidden: true
        }
      ]
    }
  ]
}
