import { Chapter } from '../../types/curriculum'

export const chapter8: Chapter = {
  id: 'ch-8',
  chapterNumber: 8,
  title: 'Chapter 8: Functions & Modularity',
  description:
    'Write clean, reusable, modular code with custom functions, parameter passing, return statements, and default arguments.',
  lessons: [
    // -------------------------------------------------------------------------
    // Lesson 8.1: Defining Functions & Return Values
    // -------------------------------------------------------------------------
    {
      id: 'lesson-8-1',
      chapterId: 'ch-8',
      chapterTitle: 'Functions & Modularity',
      lessonNumber: '8.1',
      title: 'Defining Functions & Return Values',
      difficulty: 'Intermediate',
      category: 'concept',
      duration: '10 mins',
      durationMinutes: 10,
      xp: 75,
      status: 'locked',
      steps: [
        {
          id: 'l8-1-step-explanation',
          type: 'explanation',
          title: 'Creating Reusable Code with Functions',
          content: `A **function** is a named, self-contained block of instructions designed to perform a specific task. Functions prevent code duplication and enforce the **DRY** principle (*Don't Repeat Yourself*).

In Python, define functions using the \`def\` keyword:

\`\`\`python
def function_name(param1, param2):
    # Indented body calculates output
    return result
\`\`\`

Key anatomy of a Python function:
1. **\`def\` keyword**: Signals the start of a function definition.
2. **Parameters**: Variables placed inside parentheses \`()\` that receive input data when the function is called.
3. **Colon (\`:\`)**: Ends the header line.
4. **Indented Body**: Contains the logic of the function (4 spaces indent).
5. **\`return\` statement**: Terminates execution inside the function and sends the computed value back to the caller.`
        },
        {
          id: 'l8-1-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Perimeter Calculation',
          description:
            'Observe how a function receives parameters and returns a calculated result to the caller.',
          code: 'def calc_perimeter(width, height):\n    return 2 * (width + height)\n\nroom_boundary = calc_perimeter(10, 5)\nprint(f"Boundary: {room_boundary}m")',
          expectedStdout: 'Boundary: 30m',
          explanation:
            'calc_perimeter(10, 5) computes 2 * (10 + 5) = 30 and returns it, storing 30 into room_boundary.'
        },
        {
          id: 'l8-1-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Currency Converter',
          question: 'What value is printed by this program?',
          codeSnippet:
            'def to_cents(dollars):\n    return dollars * 100\n\ncoin_count = to_cents(7)\nprint(coin_count)',
          options: [
            {
              id: 'opt-8-1-correct',
              text: '700',
              isCorrect: true,
              explanation: 'Correct! to_cents(7) multiplies 7 * 100 = 700 and returns it.'
            },
            {
              id: 'opt-8-1-seven',
              text: '7',
              isCorrect: false,
              explanation: 'Incorrect: The function returns dollars * 100, not dollars alone.'
            },
            {
              id: 'opt-8-1-decimal',
              text: '0.07',
              isCorrect: false,
              explanation: 'Incorrect: The function multiplies by 100, it does not divide.'
            },
            {
              id: 'opt-8-1-seventy',
              text: '70',
              isCorrect: false,
              explanation: 'Incorrect: 7 * 100 = 700, not 70.'
            }
          ]
        },
        {
          id: 'l8-1-step-true-false',
          type: 'true_false',
          title: 'Concept Check 2: Function Definition Syntax',
          statement:
            'A Python function definition must begin with the keyword def, followed by the function name, parameters in parentheses, and a colon.',
          correctAnswer: true,
          explanation: 'Correct! The syntax "def func_name(parameters):" is mandatory in Python.'
        },
        {
          id: 'l8-1-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Freight Shipping Cost Calculator',
          objective:
            'Define a function named calc_shipping(weight_kg, rate_per_kg) that returns the total shipping cost: weight_kg * rate_per_kg.',
          instructions: [
            'Define a function: def calc_shipping(weight_kg, rate_per_kg):.',
            'Inside the indented function body, return weight_kg * rate_per_kg.',
            'Test your function by calling calc_shipping(12, 5).'
          ],
          starterCode: `# Define the calc_shipping function below
# It takes weight_kg and rate_per_kg, returning weight_kg * rate_per_kg


# Test call
total_cost = calc_shipping(12, 5)
print(f"Shipping cost: \${total_cost}")
`,
          solutionCode: `def calc_shipping(weight_kg, rate_per_kg):
    return weight_kg * rate_per_kg
`,
          hints: [
            {
              id: 'h-8-1-1',
              level: 1,
              title: 'Function header',
              text: 'Write `def calc_shipping(weight_kg, rate_per_kg):` on the first line.',
              content: 'Write `def calc_shipping(weight_kg, rate_per_kg):` on the first line.'
            },
            {
              id: 'h-8-1-2',
              level: 2,
              title: 'Return statement',
              text: 'Indent 4 spaces and return the multiplication: `return weight_kg * rate_per_kg`.',
              content:
                'Indent 4 spaces and return the multiplication: `return weight_kg * rate_per_kg`.'
            }
          ],
          testCases: [
            {
              id: 'tc-8-1-1',
              description: 'calc_shipping(12, 5) returns 60',
              type: 'function',
              functionName: 'calc_shipping',
              args: [12, 5],
              expectedReturn: 60,
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              hidden: false
            },
            {
              id: 'tc-8-1-2',
              description: 'calc_shipping(20, 3.5) returns 70.0',
              type: 'function',
              functionName: 'calc_shipping',
              args: [20, 3.5],
              expectedReturn: 70.0,
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              hidden: false
            },
            {
              id: 'tc-8-1-3',
              description: 'Edge case: zero weight calc_shipping(0, 15) returns 0',
              type: 'function',
              functionName: 'calc_shipping',
              args: [0, 15],
              expectedReturn: 0,
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              hidden: true
            }
          ]
        }
      ],
      theory: [
        {
          heading: 'Reusable Code with Functions',
          paragraphs: [
            "Functions are self-contained blocks of code designed to perform a specific task. They prevent code repetition (following the DRY principle: Don't Repeat Yourself).",
            'In Python, functions are defined using the def keyword, followed by the function name, parentheses () with input parameters, and a colon (:).',
            'The return statement sends the calculated output back to the caller.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'def calc_perimeter(width, height):\n    return 2 * (width + height)\n\nroom_boundary = calc_perimeter(10, 5)\nprint(f"Boundary: {room_boundary}m")  # 30m',
              caption: 'Parameters receive inputs; return provides the computed output.'
            }
          ]
        }
      ],
      taskObjective:
        'Define a function named calc_shipping(weight_kg, rate_per_kg) that takes two arguments and returns their product (weight_kg * rate_per_kg).',
      taskInstructions: [
        'Write def calc_shipping(weight_kg, rate_per_kg):.',
        'Indent the function body with 4 spaces.',
        'Return the product: return weight_kg * rate_per_kg.',
        'Test your function by calling calc_shipping(12, 5).'
      ],
      task: {
        objective:
          'Define a function named calc_shipping(weight_kg, rate_per_kg) that takes two arguments and returns their product (weight_kg * rate_per_kg).',
        instructions: [
          'Write def calc_shipping(weight_kg, rate_per_kg):.',
          'Indent the function body with 4 spaces.',
          'Return the product: return weight_kg * rate_per_kg.',
          'Test your function by calling calc_shipping(12, 5).'
        ]
      },
      hints: [
        {
          id: 'h-8-1-1',
          level: 1,
          title: 'Function header',
          text: 'Write `def calc_shipping(weight_kg, rate_per_kg):` on the first line.',
          content: 'Write `def calc_shipping(weight_kg, rate_per_kg):` on the first line.'
        },
        {
          id: 'h-8-1-2',
          level: 2,
          title: 'Return statement',
          text: 'Indent 4 spaces and return the multiplication: `return weight_kg * rate_per_kg`.',
          content:
            'Indent 4 spaces and return the multiplication: `return weight_kg * rate_per_kg`.'
        }
      ],
      starterCode: `# Define the calc_shipping function below
# It takes weight_kg and rate_per_kg, returning weight_kg * rate_per_kg


# Test call
total_cost = calc_shipping(12, 5)
print(f"Shipping cost: \${total_cost}")
`,
      solutionCode: `def calc_shipping(weight_kg, rate_per_kg):
    return weight_kg * rate_per_kg
`,
      expectedOutput: 'Shipping cost: $60',
      testCases: [
        {
          id: 'tc-8-1-1',
          description: 'calc_shipping(12, 5) returns 60',
          type: 'function',
          functionName: 'calc_shipping',
          args: [12, 5],
          expectedReturn: 60,
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          hidden: false
        },
        {
          id: 'tc-8-1-2',
          description: 'calc_shipping(20, 3.5) returns 70.0',
          type: 'function',
          functionName: 'calc_shipping',
          args: [20, 3.5],
          expectedReturn: 70.0,
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          hidden: false
        },
        {
          id: 'tc-8-1-3',
          description: 'Edge case: zero weight calc_shipping(0, 15) returns 0',
          type: 'function',
          functionName: 'calc_shipping',
          args: [0, 15],
          expectedReturn: 0,
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          hidden: true
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Lesson 8.2: Functions with Conditions
    // -------------------------------------------------------------------------
    {
      id: 'lesson-8-2',
      chapterId: 'ch-8',
      chapterTitle: 'Functions & Modularity',
      lessonNumber: '8.2',
      title: 'Functions with Conditions',
      difficulty: 'Intermediate',
      category: 'concept',
      duration: '10 mins',
      durationMinutes: 10,
      xp: 80,
      status: 'locked',
      steps: [
        {
          id: 'l8-2-step-explanation',
          type: 'explanation',
          title: 'Combining Logic with Functions (Predicate Functions)',
          content: `Functions frequently evaluate conditions and return boolean values (\`True\` or \`False\`). These functions are known as **predicate functions**.

In Python, comparison operators directly evaluate to a boolean, which can be returned immediately:

\`\`\`python
def is_adult(age):
    return age >= 18  # Evaluates directly to True or False
\`\`\`

Writing \`return condition\` is much cleaner and more Pythonic than writing:
\`\`\`python
# Redundant if-else pattern:
if age >= 18:
    return True
else:
    return False
\`\`\``
        },
        {
          id: 'l8-2-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Boiling Point Predicate',
          description:
            'Observe how a comparison expression inside a function directly returns True or False.',
          code: 'def is_boiling(celsius):\n    return celsius >= 100\n\nprint(is_boiling(105))\nprint(is_boiling(85))',
          expectedStdout: 'True\nFalse',
          explanation:
            'celsius >= 100 evaluates to True when celsius is 105, and False when celsius is 85.'
        },
        {
          id: 'l8-2-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Civic Voting Eligibility',
          question: 'What does this function call output?',
          codeSnippet: 'def can_vote(age):\n    return age >= 18\n\nprint(can_vote(17))',
          options: [
            {
              id: 'opt-8-2-correct',
              text: 'False',
              isCorrect: true,
              explanation: 'Correct! 17 >= 18 evaluates to False.'
            },
            {
              id: 'opt-8-2-true',
              text: 'True',
              isCorrect: false,
              explanation: 'Incorrect: 17 is less than 18, so age >= 18 evaluates to False.'
            },
            {
              id: 'opt-8-2-none',
              text: 'None',
              isCorrect: false,
              explanation:
                'Incorrect: The function explicitly returns the result of the boolean comparison.'
            },
            {
              id: 'opt-8-2-num',
              text: '17',
              isCorrect: false,
              explanation:
                'Incorrect: The return statement returns the boolean result of the >= comparison.'
            }
          ]
        },
        {
          id: 'l8-2-step-true-false',
          type: 'true_false',
          title: 'Concept Check 2: Boolean Return Expressions',
          statement:
            'A Python function can directly return the boolean result of a comparison expression without requiring an explicit if/else block.',
          correctAnswer: true,
          explanation:
            'Correct! Comparison operators evaluate directly to booleans, making "return x > 0" idiomatic and concise.'
        },
        {
          id: 'l8-2-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Highway Radar Speeding Detector',
          objective:
            'Define a function named is_speeding(speed, speed_limit) that returns True if speed is strictly greater than speed_limit, and False otherwise.',
          instructions: [
            'Define a function: def is_speeding(speed, speed_limit):.',
            'Return whether speed is strictly greater than speed_limit: return speed > speed_limit.',
            'Test with values above and below the limit (e.g. is_speeding(72, 65) and is_speeding(55, 65)).'
          ],
          starterCode: `# Define the is_speeding function
# It takes speed and speed_limit, returning True if speed is strictly greater than speed_limit


# Test calls
print(is_speeding(72, 65))
print(is_speeding(55, 65))
`,
          solutionCode: `def is_speeding(speed, speed_limit):
    return speed > speed_limit
`,
          hints: [
            {
              id: 'h-8-2-1',
              level: 1,
              title: 'Comparison expression',
              text: 'Use `return speed > speed_limit` directly inside the function.',
              content: 'Use `return speed > speed_limit` directly inside the function.'
            },
            {
              id: 'h-8-2-2',
              level: 2,
              title: 'Code implementation',
              text: 'def is_speeding(speed, speed_limit):\n    return speed > speed_limit',
              content: 'def is_speeding(speed, speed_limit):\n    return speed > speed_limit'
            }
          ],
          testCases: [
            {
              id: 'tc-8-2-1',
              description: 'is_speeding(72, 65) returns True',
              type: 'function',
              functionName: 'is_speeding',
              args: [72, 65],
              expectedReturn: true,
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              hidden: false
            },
            {
              id: 'tc-8-2-2',
              description: 'is_speeding(55, 65) returns False',
              type: 'function',
              functionName: 'is_speeding',
              args: [55, 65],
              expectedReturn: false,
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              hidden: false
            },
            {
              id: 'tc-8-2-3',
              description:
                'Boundary check: is_speeding(65, 65) returns False (not strictly greater)',
              type: 'function',
              functionName: 'is_speeding',
              args: [65, 65],
              expectedReturn: false,
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              hidden: true
            }
          ]
        }
      ],
      theory: [
        {
          heading: 'Combining Logic with Functions',
          paragraphs: [
            'Functions often make decisions internally using if statements and return boolean values (True or False). These are commonly known as predicate functions.',
            'A comparison expression like celsius >= 100 directly evaluates to True or False.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'def is_boiling(celsius):\n    return celsius >= 100\n\nprint(is_boiling(105))  # True\nprint(is_boiling(85))   # False',
              caption: 'Comparison expressions evaluate directly to True or False.'
            }
          ]
        }
      ],
      taskObjective:
        'Define a function is_speeding(speed, speed_limit) that returns True if speed > speed_limit, and False otherwise.',
      taskInstructions: [
        'Define def is_speeding(speed, speed_limit):.',
        'Check if speed is strictly greater than speed_limit: return speed > speed_limit.',
        'Test with speed=72, speed_limit=65 and speed=55, speed_limit=65.'
      ],
      task: {
        objective:
          'Define a function is_speeding(speed, speed_limit) that returns True if speed > speed_limit, and False otherwise.',
        instructions: [
          'Define def is_speeding(speed, speed_limit):.',
          'Check if speed is strictly greater than speed_limit: return speed > speed_limit.',
          'Test with speed=72, speed_limit=65 and speed=55, speed_limit=65.'
        ]
      },
      hints: [
        {
          id: 'h-8-2-1',
          level: 1,
          title: 'Comparison expression',
          text: 'Use `return speed > speed_limit` directly inside the function.',
          content: 'Use `return speed > speed_limit` directly inside the function.'
        },
        {
          id: 'h-8-2-2',
          level: 2,
          title: 'Code implementation',
          text: 'def is_speeding(speed, speed_limit):\n    return speed > speed_limit',
          content: 'def is_speeding(speed, speed_limit):\n    return speed > speed_limit'
        }
      ],
      starterCode: `# Define the is_speeding function
# It takes speed and speed_limit, returning True if speed is strictly greater than speed_limit


# Test calls
print(is_speeding(72, 65))
print(is_speeding(55, 65))
`,
      solutionCode: `def is_speeding(speed, speed_limit):
    return speed > speed_limit
`,
      expectedOutput: 'True\nFalse',
      testCases: [
        {
          id: 'tc-8-2-1',
          description: 'is_speeding(72, 65) returns True',
          type: 'function',
          functionName: 'is_speeding',
          args: [72, 65],
          expectedReturn: true,
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          hidden: false
        },
        {
          id: 'tc-8-2-2',
          description: 'is_speeding(55, 65) returns False',
          type: 'function',
          functionName: 'is_speeding',
          args: [55, 65],
          expectedReturn: false,
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          hidden: false
        },
        {
          id: 'tc-8-2-3',
          description: 'Boundary check: is_speeding(65, 65) returns False (not strictly greater)',
          type: 'function',
          functionName: 'is_speeding',
          args: [65, 65],
          expectedReturn: false,
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          hidden: true
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Lesson 8.3: Default Parameters
    // -------------------------------------------------------------------------
    {
      id: 'lesson-8-3',
      chapterId: 'ch-8',
      chapterTitle: 'Functions & Modularity',
      lessonNumber: '8.3',
      title: 'Default Parameters',
      difficulty: 'Intermediate',
      category: 'concept',
      duration: '10 mins',
      durationMinutes: 10,
      xp: 80,
      status: 'locked',
      steps: [
        {
          id: 'l8-3-step-explanation',
          type: 'explanation',
          title: 'Configuring Functions with Default Parameters',
          content: `Python allows function parameters to have **default values**. If the caller does not pass an argument for that parameter, the default is used automatically:

\`\`\`python
def send_message(recipient, channel="email"):
    return f"Sending {channel} to {recipient}"
\`\`\`

Critical rules for default parameters:
1. **Ordering**: Parameters with default values must always be listed **after** parameters without default values:
   - \`def func(a, b=10):\` is **valid**.
   - \`def func(a=10, b):\` is a **SyntaxError**!
2. **Flexibility**: Callers can provide their own value to override the default, or omit it to accept the default.`
        },
        {
          id: 'l8-3-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Character Title Generator',
          description:
            'Observe how a default parameter value is used when the caller omits the argument.',
          code: 'def create_hero(name, role="Warrior"):\n    return f"{name} the {role}"\n\nprint(create_hero("Thorin"))\nprint(create_hero("Gandalf", "Wizard"))',
          expectedStdout: 'Thorin the Warrior\nGandalf the Wizard',
          explanation:
            'Calling create_hero("Thorin") falls back to role="Warrior", while create_hero("Gandalf", "Wizard") overrides it.'
        },
        {
          id: 'l8-3-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Smart Home Lighting',
          question: 'What does this function call output?',
          codeSnippet:
            'def set_light(room, brightness=100):\n    return f"{room}: {brightness}%"\n\nprint(set_light("Kitchen", 60))',
          options: [
            {
              id: 'opt-8-3-correct',
              text: 'Kitchen: 60%',
              isCorrect: true,
              explanation: 'Correct! The caller explicitly supplied 60, overriding the default 100.'
            },
            {
              id: 'opt-8-3-hundred',
              text: 'Kitchen: 100%',
              isCorrect: false,
              explanation:
                'Incorrect: The default value of 100 is only used if the caller omits the brightness argument.'
            },
            {
              id: 'opt-8-3-room',
              text: 'Kitchen',
              isCorrect: false,
              explanation:
                'Incorrect: The function returns the entire formatted string including room and brightness.'
            },
            {
              id: 'opt-8-3-pct',
              text: '60%',
              isCorrect: false,
              explanation: 'Incorrect: The formatted string includes the room name prefix.'
            }
          ]
        },
        {
          id: 'l8-3-step-true-false',
          type: 'true_false',
          title: 'Concept Check 2: Parameter Ordering',
          statement:
            'In Python function definitions, parameters with default values must always follow parameters without default values.',
          correctAnswer: true,
          explanation:
            'Correct! In Python, defining non-default parameters after default parameters causes a SyntaxError.'
        },
        {
          id: 'l8-3-step-code-task',
          type: 'code_task',
          title: 'Coding Task: International Invoice Currency Formatter',
          objective:
            'Define a function named format_price(amount, currency="$") that returns f"{currency}{amount}". When called without a second argument, it defaults to "$".',
          instructions: [
            'Define def format_price(amount, currency="$"):.',
            'Inside the function, return f"{currency}{amount}".',
            'Test with both a single argument (e.g. format_price(49)) and two arguments (e.g. format_price(85, "EUR ")).'
          ],
          starterCode: `# Define format_price with a default currency="$"
# It should return f"{currency}{amount}"


# Test calls
print(format_price(49))
print(format_price(85, "EUR "))
`,
          solutionCode: `def format_price(amount, currency="$"):
    return f"{currency}{amount}"
`,
          hints: [
            {
              id: 'h-8-3-1',
              level: 1,
              title: 'Default parameter syntax',
              text: 'Set the default in the definition header: `def format_price(amount, currency="$"):`.',
              content:
                'Set the default in the definition header: `def format_price(amount, currency="$"):`.'
            },
            {
              id: 'h-8-3-2',
              level: 2,
              title: 'Formatted string',
              text: 'Return `f"{currency}{amount}"` from the function body.',
              content: 'Return `f"{currency}{amount}"` from the function body.'
            }
          ],
          testCases: [
            {
              id: 'tc-8-3-1',
              description: 'format_price(49) uses default currency symbol ($49)',
              type: 'function',
              functionName: 'format_price',
              args: [49],
              expectedReturn: '$49',
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              hidden: false
            },
            {
              id: 'tc-8-3-2',
              description: 'format_price(85, "EUR ") overrides currency parameter (EUR 85)',
              type: 'function',
              functionName: 'format_price',
              args: [85, 'EUR '],
              expectedReturn: 'EUR 85',
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              hidden: false
            },
            {
              id: 'tc-8-3-3',
              description: 'format_price(120, "£") correctly formats pound sterling (£120)',
              type: 'function',
              functionName: 'format_price',
              args: [120, '£'],
              expectedReturn: '£120',
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              hidden: true
            }
          ]
        }
      ],
      theory: [
        {
          heading: 'Default Parameter Values',
          paragraphs: [
            'Python allows you to specify default values for function parameters. If the caller does not provide an argument, the default value is used automatically.',
            'Parameters with default values must always be placed after parameters without default values.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'def create_hero(name, role="Warrior"):\n    return f"{name} the {role}"\n\nprint(create_hero("Thorin"))            # "Thorin the Warrior"\nprint(create_hero("Gandalf", "Wizard")) # "Gandalf the Wizard"',
              caption: 'role defaults to "Warrior" if omitted.'
            }
          ]
        }
      ],
      taskObjective:
        'Define a function format_price(amount, currency="$") that returns f"{currency}{amount}".',
      taskInstructions: [
        'Define def format_price(amount, currency="$"):.',
        'Return the formatted string f"{currency}{amount}".',
        'Test calling format_price with one argument and with two arguments.'
      ],
      task: {
        objective:
          'Define a function format_price(amount, currency="$") that returns f"{currency}{amount}".',
        instructions: [
          'Define def format_price(amount, currency="$"):.',
          'Return the formatted string f"{currency}{amount}".',
          'Test calling format_price with one argument and with two arguments.'
        ]
      },
      hints: [
        {
          id: 'h-8-3-1',
          level: 1,
          title: 'Default parameter syntax',
          text: 'Set the default in the definition header: `def format_price(amount, currency="$"):`.',
          content:
            'Set the default in the definition header: `def format_price(amount, currency="$"):`.'
        },
        {
          id: 'h-8-3-2',
          level: 2,
          title: 'Formatted string',
          text: 'Return `f"{currency}{amount}"` from the function body.',
          content: 'Return `f"{currency}{amount}"` from the function body.'
        }
      ],
      starterCode: `# Define format_price with a default currency="$"
# It should return f"{currency}{amount}"


# Test calls
print(format_price(49))
print(format_price(85, "EUR "))
`,
      solutionCode: `def format_price(amount, currency="$"):
    return f"{currency}{amount}"
`,
      expectedOutput: '$49\nEUR 85',
      testCases: [
        {
          id: 'tc-8-3-1',
          description: 'format_price(49) uses default currency symbol ($49)',
          type: 'function',
          functionName: 'format_price',
          args: [49],
          expectedReturn: '$49',
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          hidden: false
        },
        {
          id: 'tc-8-3-2',
          description: 'format_price(85, "EUR ") overrides currency parameter (EUR 85)',
          type: 'function',
          functionName: 'format_price',
          args: [85, 'EUR '],
          expectedReturn: 'EUR 85',
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          hidden: false
        },
        {
          id: 'tc-8-3-3',
          description: 'format_price(120, "£") correctly formats pound sterling (£120)',
          type: 'function',
          functionName: 'format_price',
          args: [120, '£'],
          expectedReturn: '£120',
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          hidden: true
        }
      ]
    }
  ]
}
