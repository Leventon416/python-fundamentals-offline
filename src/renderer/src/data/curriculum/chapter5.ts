import { Chapter } from '../../types/curriculum'

export const chapter5: Chapter = {
  id: 'ch-5',
  chapterNumber: 5,
  title: 'Chapter 5: Conditionals & Decision Making',
  description:
    "Control your program's flow using if, elif, and else statements, boolean comparisons, and logical operators.",
  lessons: [
    // -------------------------------------------------------------------------
    // Lesson 5.1: If / Else Statements
    // -------------------------------------------------------------------------
    {
      id: 'lesson-5-1',
      chapterId: 'ch-5',
      chapterTitle: 'Conditionals & Decision Making',
      lessonNumber: '5.1',
      title: 'If / Else Statements',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '8 mins',
      durationMinutes: 8,
      xp: 65,
      status: 'locked',
      steps: [
        {
          id: 'l5-1-step-explanation',
          type: 'explanation',
          title: 'Making Decisions in Code',
          content: `Conditionals allow your software to execute different code blocks depending on whether a condition is \`True\` or \`False\`.

An \`if\` statement evaluates an expression:
- If \`True\`, the indented block of code directly beneath it runs.
- If \`False\`, Python skips to the optional \`else\` block.

\`\`\`python
height_cm = 145
if height_cm >= 140:
    print("Can ride")
else:
    print("Too short")
\`\`\`

### Comparison Operators:
- \`>\` (greater than), \`>=\` (greater than or equal to)
- \`<\` (less than), \`<=\` (less than or equal to)
- \`==\` (equal to — notice double equals!)
- \`!=\` (not equal to)`
        },
        {
          id: 'l5-1-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Amusement Park Height Check',
          description: 'Observe how if and else branch execution based on a comparison condition.',
          code: 'height_cm = 145\nif height_cm >= 140:\n    print("Can ride")\nelse:\n    print("Too short")',
          expectedStdout: 'Can ride',
          explanation:
            'Since 145 >= 140 is True, Python executes the first indented block and skips the else branch.'
        },
        {
          id: 'l5-1-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Battery Level Warning',
          question: 'What will the following code output to the console?',
          codeSnippet:
            'battery_level = 15\nif battery_level <= 20:\n    status = "Low Battery"\nelse:\n    status = "Battery Good"\nprint(status)',
          options: [
            {
              id: 'opt-5-1-correct',
              text: 'Low Battery',
              isCorrect: true,
              explanation: 'Correct! Since 15 <= 20 is True, status is set to "Low Battery".'
            },
            {
              id: 'opt-5-1-good',
              text: 'Battery Good',
              isCorrect: false,
              explanation:
                'Incorrect: The else branch only executes when the if condition evaluates to False.'
            },
            {
              id: 'opt-5-1-both',
              text: 'Low Battery\nBattery Good',
              isCorrect: false,
              explanation: 'Incorrect: In an if/else structure, only one branch ever runs.'
            },
            {
              id: 'opt-5-1-err',
              text: 'Error',
              isCorrect: false,
              explanation: 'Incorrect: The syntax is valid Python code.'
            }
          ]
        },
        {
          id: 'l5-1-step-identify-error',
          type: 'identify_error',
          title: 'Concept Check 2: Missing Colon Syntax',
          question: 'What is the syntax error in the following conditional?',
          codeSnippet: 'age = 19\nif age >= 18\n    print("Eligible")',
          options: [
            {
              id: 'opt-5-1-err-colon',
              text: 'The if statement line is missing a required colon (:) at the end',
              isCorrect: true,
              explanation: 'Correct! In Python, every if and else header must end with a colon (:).'
            },
            {
              id: 'opt-5-1-err-indent',
              text: 'print() cannot be indented under if',
              isCorrect: false,
              explanation: 'Incorrect: Code inside the if block MUST be indented 4 spaces.'
            },
            {
              id: 'opt-5-1-err-parens',
              text: 'Conditions must be enclosed in parentheses (age >= 18)',
              isCorrect: false,
              explanation: 'Incorrect: Parentheses around if conditions are optional in Python.'
            },
            {
              id: 'opt-5-1-err-single',
              text: '>= should be written as =>',
              isCorrect: false,
              explanation: 'Incorrect: The operator is >= (greater than or equal to).'
            }
          ]
        },
        {
          id: 'l5-1-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Highway Speed Enforcement',
          objective:
            'Given vehicle_speed = 72, write an if/else block: if vehicle_speed > 65 set ticket_status = "Speeding", otherwise set ticket_status = "Within Limit". Print ticket_status.',
          instructions: [
            'Check if vehicle_speed is strictly greater than 65.',
            'If True, assign ticket_status = "Speeding".',
            'Otherwise, in the else branch, assign ticket_status = "Within Limit".',
            'Print ticket_status.'
          ],
          starterCode:
            'vehicle_speed = 72\n\n# Write if/else statement to set ticket_status and print it:\n',
          solutionCode:
            'vehicle_speed = 72\nif vehicle_speed > 65:\n    ticket_status = "Speeding"\nelse:\n    ticket_status = "Within Limit"\nprint(ticket_status)\n',
          hints: [
            {
              id: 'h-5-1-1',
              level: 1,
              title: 'Syntax and colons',
              text: "Don't forget the colon (:) at the end of the if and else lines, and indent the statements inside by 4 spaces.",
              content:
                "Don't forget the colon (:) at the end of the if and else lines, and indent the statements inside by 4 spaces."
            },
            {
              id: 'h-5-1-2',
              level: 2,
              title: 'Code skeleton',
              text: 'if vehicle_speed > 65:\n    ticket_status = "Speeding"\nelse:\n    ticket_status = "Within Limit"\nprint(ticket_status)',
              content:
                'if vehicle_speed > 65:\n    ticket_status = "Speeding"\nelse:\n    ticket_status = "Within Limit"\nprint(ticket_status)'
            }
          ],
          testCases: [
            {
              id: 'tc-5-1-1',
              description:
                'Variable ticket_status is "Speeding" for speed 72 and outputs to stdout',
              type: 'state_and_stdout',
              expectedStdout: 'Speeding',
              expectedVariables: {
                ticket_status: { value: 'Speeding', type: 'str' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'ticket_status',
                  message: "Make sure you create and assign 'ticket_status'."
                }
              ]
            },
            {
              id: 'tc-5-1-2',
              description: 'Verifies condition boundary (vehicle_speed > 65)',
              type: 'state_and_stdout',
              expectedStdout: 'Speeding',
              expectedVariables: {
                ticket_status: { value: 'Speeding', type: 'str' }
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
          heading: 'Making Decisions in Code',
          paragraphs: [
            'Conditionals allow your software to execute different code blocks depending on whether a condition is True or False.',
            'An if statement evaluates an expression. If True, the indented block of code directly beneath it runs. If False, Python skips to the optional else block.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'height_cm = 145\nif height_cm >= 140:\n    print("Can ride")\nelse:\n    print("Too short")',
              caption: 'Python uses indentation (4 spaces) to define code blocks.'
            }
          ]
        }
      ],
      taskObjective:
        'Given vehicle_speed = 72, write an if/else block: if vehicle_speed > 65 set ticket_status = "Speeding", otherwise set ticket_status = "Within Limit". Then print ticket_status.',
      taskInstructions: [
        'Check if vehicle_speed is greater than 65.',
        'If True, assign ticket_status = "Speeding".',
        'Otherwise, in the else branch, assign ticket_status = "Within Limit".',
        'Print ticket_status.'
      ],
      hints: [
        {
          id: 'h-5-1-1',
          level: 1,
          title: 'Syntax and colons',
          text: "Don't forget the colon (:) at the end of the if and else lines, and indent the statements inside.",
          content:
            "Don't forget the colon (:) at the end of the if and else lines, and indent the statements inside."
        },
        {
          id: 'h-5-1-2',
          level: 2,
          title: 'Code skeleton',
          text: 'if vehicle_speed > 65:\n    ticket_status = "Speeding"\nelse:\n    ticket_status = "Within Limit"\nprint(ticket_status)',
          content:
            'if vehicle_speed > 65:\n    ticket_status = "Speeding"\nelse:\n    ticket_status = "Within Limit"\nprint(ticket_status)'
        }
      ],
      starterCode:
        'vehicle_speed = 72\n\n# Write if/else statement to set ticket_status and print it:\n',
      solutionCode:
        'vehicle_speed = 72\nif vehicle_speed > 65:\n    ticket_status = "Speeding"\nelse:\n    ticket_status = "Within Limit"\nprint(ticket_status)\n',
      expectedOutput: 'Speeding',
      testCases: [
        {
          id: 'tc-5-1-1',
          description: 'Variable ticket_status is "Speeding" for speed 72 and outputs to stdout',
          type: 'state_and_stdout',
          expectedStdout: 'Speeding',
          expectedVariables: {
            ticket_status: { value: 'Speeding', type: 'str' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'ticket_status',
              message: "Make sure you create and assign 'ticket_status'."
            }
          ]
        },
        {
          id: 'tc-5-1-2',
          description: 'Verifies condition boundary (vehicle_speed > 65)',
          type: 'state_and_stdout',
          expectedStdout: 'Speeding',
          expectedVariables: {
            ticket_status: { value: 'Speeding', type: 'str' }
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
    // Lesson 5.2: Elif & Multiple Conditions
    // -------------------------------------------------------------------------
    {
      id: 'lesson-5-2',
      chapterId: 'ch-5',
      chapterTitle: 'Conditionals & Decision Making',
      lessonNumber: '5.2',
      title: 'Elif & Multiple Conditions',
      difficulty: 'Intermediate',
      category: 'concept',
      duration: '9 mins',
      durationMinutes: 9,
      xp: 70,
      status: 'locked',
      steps: [
        {
          id: 'l5-2-step-explanation',
          type: 'explanation',
          title: 'Chaining Conditions with elif',
          content: `When you have more than two branches of logic, use \`elif\` (short for "else if"). Python checks conditions sequentially from top to bottom and runs the first block whose condition is \`True\`.

Once a matching branch executes, Python skips all remaining \`elif\` and \`else\` branches in that chain.

\`\`\`python
temp_f = 65
if temp_f >= 80:
    outfit = "Shorts"
elif temp_f >= 60:
    outfit = "Jacket"
else:
    outfit = "Coat"
print(outfit)
\`\`\``
        },
        {
          id: 'l5-2-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Temperature Outfit Advisory',
          description:
            'Observe how cascading elif statements pick the first matching temperature bracket.',
          code: 'temp_f = 65\nif temp_f >= 80:\n    outfit = "Shorts"\nelif temp_f >= 60:\n    outfit = "Jacket"\nelse:\n    outfit = "Coat"\nprint(outfit)',
          expectedStdout: 'Jacket',
          explanation:
            '65 >= 80 is False, so Python checks the next branch: 65 >= 60 is True! outfit is set to "Jacket" and the rest are skipped.'
        },
        {
          id: 'l5-2-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Earthquake Severity Ladder',
          question: 'What will the following code output to the console?',
          codeSnippet:
            'magnitude = 4.5\nif magnitude >= 7.0:\n    risk = "Major"\nelif magnitude >= 4.0:\n    risk = "Moderate"\nelse:\n    risk = "Minor"\nprint(risk)',
          options: [
            {
              id: 'opt-5-2-correct',
              text: 'Moderate',
              isCorrect: true,
              explanation:
                'Correct! 4.5 >= 7.0 is False, but 4.5 >= 4.0 is True. risk is set to "Moderate".'
            },
            {
              id: 'opt-5-2-major',
              text: 'Major',
              isCorrect: false,
              explanation: 'Incorrect: 4.5 is less than 7.0.'
            },
            {
              id: 'opt-5-2-minor',
              text: 'Minor',
              isCorrect: false,
              explanation: 'Incorrect: The else branch is skipped because the elif branch matched.'
            },
            {
              id: 'opt-5-2-both',
              text: 'Moderate\nMinor',
              isCorrect: false,
              explanation: 'Incorrect: Only the first matching branch executes in an elif ladder.'
            }
          ]
        },
        {
          id: 'l5-2-step-true-false',
          type: 'true_false',
          title: 'Concept Check 2: Elif Execution Order',
          statement:
            'In an if/elif/else chain, if multiple conditions are True, Python will execute all of the True branches.',
          correctAnswer: false,
          explanation:
            'Correct! Python stops checking as soon as it finds the FIRST condition that is True, running only that single branch.'
        },
        {
          id: 'l5-2-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Customer Loyalty Tier Classification',
          objective:
            'Given purchase_total = 250, write an if/elif/else ladder to set loyalty_tier: if purchase_total >= 500 set loyalty_tier = "Platinum", elif purchase_total >= 200 set loyalty_tier = "Gold", elif purchase_total >= 100 set loyalty_tier = "Silver", otherwise set loyalty_tier = "Bronze". Print loyalty_tier.',
          instructions: [
            'Check if purchase_total >= 500: set loyalty_tier = "Platinum".',
            'Else check if purchase_total >= 200: set loyalty_tier = "Gold".',
            'Else check if purchase_total >= 100: set loyalty_tier = "Silver".',
            'Otherwise in else: set loyalty_tier = "Bronze".',
            'Print loyalty_tier (evaluates to "Gold").'
          ],
          starterCode:
            'purchase_total = 250\n\n# Determine loyalty_tier using if/elif/else and print loyalty_tier:\n',
          solutionCode:
            'purchase_total = 250\nif purchase_total >= 500:\n    loyalty_tier = "Platinum"\nelif purchase_total >= 200:\n    loyalty_tier = "Gold"\nelif purchase_total >= 100:\n    loyalty_tier = "Silver"\nelse:\n    loyalty_tier = "Bronze"\nprint(loyalty_tier)\n',
          hints: [
            {
              id: 'h-5-2-1',
              level: 1,
              title: 'Order matters',
              text: 'Check the highest threshold (>= 500) first, then >= 200, then >= 100.',
              content: 'Check the highest threshold (>= 500) first, then >= 200, then >= 100.'
            },
            {
              id: 'h-5-2-2',
              level: 2,
              title: 'Code implementation',
              text: 'if purchase_total >= 500:\n    loyalty_tier = "Platinum"\nelif purchase_total >= 200:\n    loyalty_tier = "Gold"\nelif purchase_total >= 100:\n    loyalty_tier = "Silver"\nelse:\n    loyalty_tier = "Bronze"\nprint(loyalty_tier)',
              content:
                'if purchase_total >= 500:\n    loyalty_tier = "Platinum"\nelif purchase_total >= 200:\n    loyalty_tier = "Gold"\nelif purchase_total >= 100:\n    loyalty_tier = "Silver"\nelse:\n    loyalty_tier = "Bronze"\nprint(loyalty_tier)'
            }
          ],
          testCases: [
            {
              id: 'tc-5-2-1',
              description:
                'Variable loyalty_tier is "Gold" for purchase_total=250 and outputs to stdout',
              type: 'state_and_stdout',
              expectedStdout: 'Gold',
              expectedVariables: {
                loyalty_tier: { value: 'Gold', type: 'str' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'loyalty_tier',
                  message: "Make sure you create and assign 'loyalty_tier'."
                }
              ]
            },
            {
              id: 'tc-5-2-2',
              description:
                'Verifies correct branch matching without falling through to lower tiers',
              type: 'state_and_stdout',
              expectedStdout: 'Gold',
              expectedVariables: {
                loyalty_tier: { value: 'Gold', type: 'str' }
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
          heading: 'Chaining Conditions with elif',
          paragraphs: [
            'When you have more than two branches of logic, use elif (short for "else if"). Python checks conditions sequentially from top to bottom and runs the first block whose condition is True.',
            'Once a matching branch executes, Python skips all remaining elif and else branches in that block.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'temp_f = 65\nif temp_f >= 80:\n    outfit = "Shorts"\nelif temp_f >= 60:\n    outfit = "Jacket"\nelse:\n    outfit = "Coat"\nprint(outfit)',
              caption: 'Python tests each elif in order until one matches.'
            }
          ]
        }
      ],
      taskObjective:
        'Given purchase_total = 250, write an if/elif/else ladder to set loyalty_tier: if purchase_total >= 500 set loyalty_tier = "Platinum", elif purchase_total >= 200 set loyalty_tier = "Gold", elif purchase_total >= 100 set loyalty_tier = "Silver", otherwise set loyalty_tier = "Bronze". Then print loyalty_tier.',
      taskInstructions: [
        'Check if purchase_total >= 500: set loyalty_tier = "Platinum".',
        'Else check if purchase_total >= 200: set loyalty_tier = "Gold".',
        'Else check if purchase_total >= 100: set loyalty_tier = "Silver".',
        'Otherwise in else: set loyalty_tier = "Bronze".',
        'Print loyalty_tier.'
      ],
      hints: [
        {
          id: 'h-5-2-1',
          level: 1,
          title: 'Order matters',
          text: 'Check highest threshold first: >= 500, then >= 200, then >= 100.',
          content: 'Check highest threshold first: >= 500, then >= 200, then >= 100.'
        },
        {
          id: 'h-5-2-2',
          level: 2,
          title: 'Code implementation',
          text: 'if purchase_total >= 500:\n    loyalty_tier = "Platinum"\nelif purchase_total >= 200:\n    loyalty_tier = "Gold"\nelif purchase_total >= 100:\n    loyalty_tier = "Silver"\nelse:\n    loyalty_tier = "Bronze"\nprint(loyalty_tier)',
          content:
            'if purchase_total >= 500:\n    loyalty_tier = "Platinum"\nelif purchase_total >= 200:\n    loyalty_tier = "Gold"\nelif purchase_total >= 100:\n    loyalty_tier = "Silver"\nelse:\n    loyalty_tier = "Bronze"\nprint(loyalty_tier)'
        }
      ],
      starterCode:
        'purchase_total = 250\n\n# Determine loyalty_tier using if/elif/else and print loyalty_tier:\n',
      solutionCode:
        'purchase_total = 250\nif purchase_total >= 500:\n    loyalty_tier = "Platinum"\nelif purchase_total >= 200:\n    loyalty_tier = "Gold"\nelif purchase_total >= 100:\n    loyalty_tier = "Silver"\nelse:\n    loyalty_tier = "Bronze"\nprint(loyalty_tier)\n',
      expectedOutput: 'Gold',
      testCases: [
        {
          id: 'tc-5-2-1',
          description:
            'Variable loyalty_tier is "Gold" for purchase_total=250 and outputs to stdout',
          type: 'state_and_stdout',
          expectedStdout: 'Gold',
          expectedVariables: {
            loyalty_tier: { value: 'Gold', type: 'str' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'loyalty_tier',
              message: "Make sure you create and assign 'loyalty_tier'."
            }
          ]
        },
        {
          id: 'tc-5-2-2',
          description: 'Verifies correct branch matching without falling through to lower tiers',
          type: 'state_and_stdout',
          expectedStdout: 'Gold',
          expectedVariables: {
            loyalty_tier: { value: 'Gold', type: 'str' }
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
    // Lesson 5.3: Logical Operators
    // -------------------------------------------------------------------------
    {
      id: 'lesson-5-3',
      chapterId: 'ch-5',
      chapterTitle: 'Conditionals & Decision Making',
      lessonNumber: '5.3',
      title: 'Logical Operators',
      difficulty: 'Intermediate',
      category: 'concept',
      duration: '8 mins',
      durationMinutes: 8,
      xp: 70,
      status: 'locked',
      steps: [
        {
          id: 'l5-3-step-explanation',
          type: 'explanation',
          title: 'Logical Operators (and, or, not)',
          content: `Python provides three human-readable logical operators to combine or invert boolean conditions:
- **\`and\`:** Returns \`True\` only if **both** conditions are \`True\`.
- **\`or\`:** Returns \`True\` if **at least one** condition is \`True\`.
- **\`not\`:** Inverts a boolean (turns \`True\` into \`False\`, and vice-versa).

\`\`\`python
pin_correct = True
has_funds = False
can_withdraw = pin_correct and has_funds
print("Withdraw?", can_withdraw)  # False
\`\`\`

Python uses clean English words instead of symbolic operators like \`&&\` or \`||\`.`
        },
        {
          id: 'l5-3-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: ATM Withdrawal Security',
          description:
            'Observe how logical and ensures both PIN and funds conditions must be satisfied.',
          code: 'pin_correct = True\nhas_funds = False\ncan_withdraw = pin_correct and has_funds\nprint("Withdraw?", can_withdraw)',
          expectedStdout: 'Withdraw? False',
          explanation: 'Because has_funds is False, pin_correct and has_funds evaluates to False.'
        },
        {
          id: 'l5-3-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Library Book Renewal Check',
          question: 'What will the following code output to the console?',
          codeSnippet:
            'has_fines = False\nis_reserved = False\ncan_renew = not has_fines and not is_reserved\nprint(can_renew)',
          options: [
            {
              id: 'opt-5-3-correct',
              text: 'True',
              isCorrect: true,
              explanation: 'Correct! not False is True. True and True evaluates to True.'
            },
            {
              id: 'opt-5-3-false',
              text: 'False',
              isCorrect: false,
              explanation: 'Incorrect: The not operator inverts both False values to True.'
            },
            {
              id: 'opt-5-3-err',
              text: 'SyntaxError',
              isCorrect: false,
              explanation: 'Incorrect: not and and are valid Python logical operators.'
            },
            {
              id: 'opt-5-3-none',
              text: 'None',
              isCorrect: false,
              explanation: 'Incorrect: Logical operations always return boolean True or False.'
            }
          ]
        },
        {
          id: 'l5-3-step-fill-blank',
          type: 'fill_blank',
          title: 'Concept Check 2: The Or Operator',
          prompt:
            'Fill in the blank with the logical operator that returns True if either condition is met:',
          codeTemplate:
            'is_vip = False\nhas_ticket = True\ncan_enter = is_vip {{blank}} has_ticket',
          acceptedAnswers: ['or'],
          explanation: 'The or operator evaluates to True whenever at least one operand is True.',
          hint: 'Type or for disjunction.'
        },
        {
          id: 'l5-3-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Airline Boarding Security Gate',
          objective:
            'Given has_passport = True and has_ticket = False, evaluate two logical variables: can_travel = has_passport or has_ticket, and needs_review = not can_travel. Print can_travel and needs_review separated by a space.',
          instructions: [
            'Start with has_passport = True and has_ticket = False.',
            'Compute can_travel using the or operator: has_passport or has_ticket.',
            'Compute needs_review using the not operator: not can_travel.',
            'Print both variables using print(can_travel, needs_review).'
          ],
          starterCode:
            'has_passport = True\nhas_ticket = False\n\n# Compute can_travel using or and needs_review using not, then print both:\n',
          solutionCode:
            'has_passport = True\nhas_ticket = False\ncan_travel = has_passport or has_ticket\nneeds_review = not can_travel\nprint(can_travel, needs_review)\n',
          hints: [
            {
              id: 'h-5-3-1',
              level: 1,
              title: 'Using or and not',
              text: 'Use `or` to check if either condition is True, and `not` to invert the boolean.',
              content:
                'Use `or` to check if either condition is True, and `not` to invert the boolean.'
            },
            {
              id: 'h-5-3-2',
              level: 2,
              title: 'Code implementation',
              text: 'can_travel = has_passport or has_ticket\nneeds_review = not can_travel\nprint(can_travel, needs_review)',
              content:
                'can_travel = has_passport or has_ticket\nneeds_review = not can_travel\nprint(can_travel, needs_review)'
            }
          ],
          testCases: [
            {
              id: 'tc-5-3-1',
              description: 'can_travel is True, needs_review is False, outputs "True False"',
              type: 'state_and_stdout',
              expectedStdout: 'True False',
              expectedVariables: {
                can_travel: { value: true, type: 'bool' },
                needs_review: { value: false, type: 'bool' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'can_travel',
                  message: "Make sure you create 'can_travel'."
                },
                {
                  type: 'variable_assigned',
                  target: 'needs_review',
                  message: "Make sure you create 'needs_review'."
                }
              ]
            },
            {
              id: 'tc-5-3-2',
              description: 'Verifies boolean types of both resulting logical variables',
              type: 'state_and_stdout',
              expectedStdout: 'True False',
              expectedVariables: {
                can_travel: { value: true, type: 'bool' },
                needs_review: { value: false, type: 'bool' }
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
          heading: 'Combining Booleans: and, or, not',
          paragraphs: [
            'Python provides three human-readable logical operators to combine or invert conditions:',
            '• and -> Returns True only if BOTH conditions are True\n• or -> Returns True if AT LEAST ONE condition is True\n• not -> Inverts a boolean (turns True into False, and vice-versa)'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'pin_correct = True\nhas_funds = False\ncan_withdraw = pin_correct and has_funds\nprint("Withdraw?", can_withdraw)  # False',
              caption:
                'Logical operators in Python use English words instead of symbols like && and ||.'
            }
          ]
        }
      ],
      taskObjective:
        'Given has_passport = True and has_ticket = False, evaluate two logical variables: can_travel = has_passport or has_ticket, and needs_review = not can_travel. Print can_travel and needs_review separated by a space.',
      taskInstructions: [
        'Set can_travel = has_passport or has_ticket',
        'Set needs_review = not can_travel',
        'Print can_travel and needs_review.'
      ],
      hints: [
        {
          id: 'h-5-3-1',
          level: 1,
          title: 'Using or and not',
          text: 'Use the `or` keyword to check if either condition is True, and `not` to invert.',
          content: 'Use the `or` keyword to check if either condition is True, and `not` to invert.'
        },
        {
          id: 'h-5-3-2',
          level: 2,
          title: 'Code implementation',
          text: 'can_travel = has_passport or has_ticket\nneeds_review = not can_travel\nprint(can_travel, needs_review)',
          content:
            'can_travel = has_passport or has_ticket\nneeds_review = not can_travel\nprint(can_travel, needs_review)'
        }
      ],
      starterCode:
        'has_passport = True\nhas_ticket = False\n\n# Compute can_travel using or and needs_review using not, then print both:\n',
      solutionCode:
        'has_passport = True\nhas_ticket = False\ncan_travel = has_passport or has_ticket\nneeds_review = not can_travel\nprint(can_travel, needs_review)\n',
      expectedOutput: 'True False',
      testCases: [
        {
          id: 'tc-5-3-1',
          description: 'can_travel is True, needs_review is False, outputs "True False"',
          type: 'state_and_stdout',
          expectedStdout: 'True False',
          expectedVariables: {
            can_travel: { value: true, type: 'bool' },
            needs_review: { value: false, type: 'bool' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'can_travel',
              message: "Make sure you create 'can_travel'."
            },
            {
              type: 'variable_assigned',
              target: 'needs_review',
              message: "Make sure you create 'needs_review'."
            }
          ]
        },
        {
          id: 'tc-5-3-2',
          description: 'Verifies boolean types of both resulting logical variables',
          type: 'state_and_stdout',
          expectedStdout: 'True False',
          expectedVariables: {
            can_travel: { value: true, type: 'bool' },
            needs_review: { value: false, type: 'bool' }
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
