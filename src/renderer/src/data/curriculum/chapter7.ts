import { Chapter } from '../../types/curriculum'

export const chapter7: Chapter = {
  id: 'ch-7',
  chapterNumber: 7,
  title: 'Chapter 7: Loops & Iteration',
  description:
    'Automate repetitive tasks with definite for loops, the range() generator, and conditional while loops.',
  lessons: [
    // -------------------------------------------------------------------------
    // Lesson 7.1: For Loops with Lists
    // -------------------------------------------------------------------------
    {
      id: 'lesson-7-1',
      chapterId: 'ch-7',
      chapterTitle: 'Loops & Iteration',
      lessonNumber: '7.1',
      title: 'For Loops with Lists',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '8 mins',
      durationMinutes: 8,
      xp: 65,
      status: 'locked',
      steps: [
        {
          id: 'l7-1-step-explanation',
          type: 'explanation',
          title: 'Iterating Through Sequences with For Loops',
          content: `In programming, **iteration** means repeating a block of code for each item in a collection.

A Python \`for\` loop iterates through each element in a sequence (such as a list) from start to finish:

\`\`\`python
for item in sequence:
    # Indented code block runs once for every item
    process(item)
\`\`\`

Key rules of \`for\` loops:
- The loop variable (\`item\`) automatically takes on the value of each element, one at a time.
- The statement ends with a colon (\`:\`).
- Every line inside the loop body must be indented by 4 spaces.
- When the sequence ends, Python exits the loop and continues with the unindented code below.`
        },
        {
          id: 'l7-1-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Observing Constellations',
          description:
            'Observe how a for loop iterates through each element in a list sequentially.',
          code: 'constellations = ["Orion", "Ursa Major", "Cassiopeia"]\nfor star_group in constellations:\n    print(f"Observing: {star_group}")',
          expectedStdout: 'Observing: Orion\nObserving: Ursa Major\nObserving: Cassiopeia',
          explanation: 'The loop executes 3 times, once for each constellation name in the list.'
        },
        {
          id: 'l7-1-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Botanical Greenhouse',
          question: 'What does this loop print on its second line of output?',
          codeSnippet:
            'plants = ["Fern", "Bamboo", "Cactus"]\nfor plant in plants:\n    print(f"Watering: {plant}")',
          options: [
            {
              id: 'opt-7-1-correct',
              text: 'Watering: Bamboo',
              isCorrect: true,
              explanation:
                'Correct! During the second iteration, the loop variable "plant" holds "Bamboo".'
            },
            {
              id: 'opt-7-1-first',
              text: 'Watering: Fern',
              isCorrect: false,
              explanation:
                'Incorrect: "Fern" is printed on the first line during the initial iteration.'
            },
            {
              id: 'opt-7-1-third',
              text: 'Watering: Cactus',
              isCorrect: false,
              explanation:
                'Incorrect: "Cactus" is printed on the third line during the final iteration.'
            },
            {
              id: 'opt-7-1-all',
              text: 'Watering: plants',
              isCorrect: false,
              explanation:
                'Incorrect: "plant" takes on each element value, not the literal name of the list.'
            }
          ]
        },
        {
          id: 'l7-1-step-true-false',
          type: 'true_false',
          title: 'Concept Check 2: Sequential Order',
          statement:
            'A Python for loop will iterate through list elements in the exact sequential order that they appear in the list.',
          correctAnswer: true,
          explanation:
            'Correct! Python lists are ordered sequences, and for loops always process elements starting from index 0 to the end.'
        },
        {
          id: 'l7-1-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Maritime Cargo Shipping Log',
          objective:
            'Given the list of cargo containers, write a for loop to print each item preceded by "Cargo: " (e.g. "Cargo: Lumber").',
          instructions: [
            'A list named containers = ["Lumber", "Electronics", "Coffee", "Steel"] is provided.',
            'Write a for loop: for item in containers:.',
            'Inside the indented loop body, print f"Cargo: {item}".',
            'Verify that each item appears on its own line in the terminal.'
          ],
          starterCode: `containers = ["Lumber", "Electronics", "Coffee", "Steel"]

# Write a for loop to print each container preceded by "Cargo: "
`,
          solutionCode: `containers = ["Lumber", "Electronics", "Coffee", "Steel"]
for item in containers:
    print(f"Cargo: {item}")
`,
          hints: [
            {
              id: 'h-7-1-1',
              level: 1,
              title: 'Loop syntax',
              text: 'Use `for item in containers:` followed by an indented `print(f"Cargo: {item}")`.',
              content:
                'Use `for item in containers:` followed by an indented `print(f"Cargo: {item}")`.'
            },
            {
              id: 'h-7-1-2',
              level: 2,
              title: 'Code implementation',
              text: 'containers = ["Lumber", "Electronics", "Coffee", "Steel"]\nfor item in containers:\n    print(f"Cargo: {item}")',
              content:
                'containers = ["Lumber", "Electronics", "Coffee", "Steel"]\nfor item in containers:\n    print(f"Cargo: {item}")'
            }
          ],
          testCases: [
            {
              id: 'tc-7-1-1',
              description: 'Prints each container prefixed with "Cargo: "',
              type: 'stdout',
              expectedOutput: 'Cargo: Lumber\nCargo: Electronics\nCargo: Coffee\nCargo: Steel',
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimWhitespace: true,
              hidden: false
            },
            {
              id: 'tc-7-1-2',
              description: 'Validates list state and sequential multiline output',
              type: 'state_and_stdout',
              expectedStdout: 'Cargo: Lumber\nCargo: Electronics\nCargo: Coffee\nCargo: Steel',
              expectedVariables: {
                containers: {
                  value: ['Lumber', 'Electronics', 'Coffee', 'Steel'],
                  type: 'list'
                }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimWhitespace: true,
              hidden: true
            }
          ]
        }
      ],
      theory: [
        {
          heading: 'Iterating Through Items',
          paragraphs: [
            'A for loop repeats a block of code once for every element in a sequence. This is called iteration.',
            'The loop variable takes on the value of each element, one at a time, until the entire list has been processed.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'constellations = ["Orion", "Ursa Major", "Cassiopeia"]\nfor star_group in constellations:\n    print(f"Observing: {star_group}")',
              caption: 'The loop executes once for each element in the catalog.'
            }
          ]
        }
      ],
      taskObjective:
        'Given containers = ["Lumber", "Electronics", "Coffee", "Steel"], use a for loop to print each container prefixed with "Cargo: ".',
      taskInstructions: [
        'Iterate through the containers list using for item in containers:.',
        'Inside the indented loop body, call print(f"Cargo: {item}").',
        'Verify that each cargo item appears on its own line.'
      ],
      task: {
        objective:
          'Given containers = ["Lumber", "Electronics", "Coffee", "Steel"], use a for loop to print each container prefixed with "Cargo: ".',
        instructions: [
          'Iterate through the containers list using for item in containers:.',
          'Inside the indented loop body, call print(f"Cargo: {item}").',
          'Verify that each cargo item appears on its own line.'
        ]
      },
      hints: [
        {
          id: 'h-7-1-1',
          level: 1,
          title: 'Loop syntax',
          text: 'Use `for item in containers:` followed by an indented `print(f"Cargo: {item}")`.',
          content:
            'Use `for item in containers:` followed by an indented `print(f"Cargo: {item}")`.'
        },
        {
          id: 'h-7-1-2',
          level: 2,
          title: 'Code implementation',
          text: 'containers = ["Lumber", "Electronics", "Coffee", "Steel"]\nfor item in containers:\n    print(f"Cargo: {item}")',
          content:
            'containers = ["Lumber", "Electronics", "Coffee", "Steel"]\nfor item in containers:\n    print(f"Cargo: {item}")'
        }
      ],
      starterCode: `containers = ["Lumber", "Electronics", "Coffee", "Steel"]

# Write a for loop to print each container preceded by "Cargo: "
`,
      solutionCode: `containers = ["Lumber", "Electronics", "Coffee", "Steel"]
for item in containers:
    print(f"Cargo: {item}")
`,
      expectedOutput: 'Cargo: Lumber\nCargo: Electronics\nCargo: Coffee\nCargo: Steel',
      testCases: [
        {
          id: 'tc-7-1-1',
          description: 'Prints each container prefixed with "Cargo: "',
          type: 'stdout',
          expectedOutput: 'Cargo: Lumber\nCargo: Electronics\nCargo: Coffee\nCargo: Steel',
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimWhitespace: true,
          hidden: false
        },
        {
          id: 'tc-7-1-2',
          description: 'Validates list state and sequential multiline output',
          type: 'state_and_stdout',
          expectedStdout: 'Cargo: Lumber\nCargo: Electronics\nCargo: Coffee\nCargo: Steel',
          expectedVariables: {
            containers: {
              value: ['Lumber', 'Electronics', 'Coffee', 'Steel'],
              type: 'list'
            }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimWhitespace: true,
          hidden: true
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Lesson 7.2: Range & Counting
    // -------------------------------------------------------------------------
    {
      id: 'lesson-7-2',
      chapterId: 'ch-7',
      chapterTitle: 'Loops & Iteration',
      lessonNumber: '7.2',
      title: 'Range & Counting',
      difficulty: 'Intermediate',
      category: 'concept',
      duration: '9 mins',
      durationMinutes: 9,
      xp: 70,
      status: 'locked',
      steps: [
        {
          id: 'l7-2-step-explanation',
          type: 'explanation',
          title: 'Generating Number Sequences with range()',
          content: `When you need to repeat an action a specific number of times, or iterate over a sequence of numbers, Python's built-in \`range()\` function generates the sequence on demand:

- \`range(stop)\`: Generates numbers starting from \`0\` up to \`stop - 1\`.
  - \`range(4)\` generates \`0, 1, 2, 3\` (length 4).
- \`range(start, stop)\`: Generates numbers starting from \`start\` up to \`stop - 1\`.
  - \`range(1, 5)\` generates \`1, 2, 3, 4\` (endpoint 5 is excluded!).
- \`range(start, stop, step)\`: Steps by \`step\` increments.
  - \`range(0, 10, 2)\` generates \`0, 2, 4, 6, 8\`.

Common pattern — the **accumulator loop**:
Initialize a total variable to 0 before the loop, and add each value inside the loop using \`total += value\`.`
        },
        {
          id: 'l7-2-step-worked-example',
          type: 'worked_example',
          title: 'Fitness Tracker: Morning Run Distances',
          description:
            'Observe how range(1, 4) produces the sequence 1, 2, 3 to accumulate daily mileage.',
          code: 'daily_miles = 0\nfor day in range(1, 4):\n    daily_miles += 5\nprint(f"Total miles: {daily_miles}")',
          expectedStdout: 'Total miles: 15',
          explanation:
            'range(1, 4) iterates 3 times (day = 1, 2, 3). Each step adds 5 to daily_miles, reaching 15.'
        },
        {
          id: 'l7-2-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Packaging Warehouse',
          question: 'What value is printed when this code completes?',
          codeSnippet: 'boxes = 0\nfor round_num in range(1, 5):\n    boxes += 2\nprint(boxes)',
          options: [
            {
              id: 'opt-7-2-correct',
              text: '8',
              isCorrect: true,
              explanation:
                'Correct! range(1, 5) iterates 4 times (round_num = 1, 2, 3, 4). 4 * 2 = 8.'
            },
            {
              id: 'opt-7-2-ten',
              text: '10',
              isCorrect: false,
              explanation:
                'Incorrect: The stop value 5 is excluded, so the loop runs 4 times, not 5.'
            },
            {
              id: 'opt-7-2-six',
              text: '6',
              isCorrect: false,
              explanation: 'Incorrect: The loop runs 4 times, adding 2 each time for a total of 8.'
            },
            {
              id: 'opt-7-2-four',
              text: '4',
              isCorrect: false,
              explanation: 'Incorrect: The loop adds 2 each iteration, producing 8.'
            }
          ]
        },
        {
          id: 'l7-2-step-true-false',
          type: 'true_false',
          title: 'Concept Check 2: Range Endpoint Rule',
          statement:
            'The expression range(1, 5) includes the endpoint 5 in its generated sequence.',
          correctAnswer: false,
          explanation:
            'Correct! In Python, range(start, stop) excludes the stop value. range(1, 5) generates 1, 2, 3, and 4.'
        },
        {
          id: 'l7-2-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Electric Vehicle Charging Stages',
          objective:
            'Calculate total kilowatt-hours accumulated across 6 charging stages (stages 1 to 6 inclusive) using a for loop with range(1, 7).',
          instructions: [
            'Initialize total_kwh = 0.',
            'Write a for loop: for stage in range(1, 7):.',
            'Inside the loop, add the current stage number to total_kwh (total_kwh += stage).',
            'After the loop, print f"Total kWh: {total_kwh}" (which evaluates to 1 + 2 + 3 + 4 + 5 + 6 = 21).'
          ],
          starterCode: `# Electric vehicle charge accumulator
total_kwh = 0

# Write a for loop using range(1, 7) to add each stage number to total_kwh


print(f"Total kWh: {total_kwh}")
`,
          solutionCode: `total_kwh = 0
for stage in range(1, 7):
    total_kwh += stage

print(f"Total kWh: {total_kwh}")
`,
          hints: [
            {
              id: 'h-7-2-1',
              level: 1,
              title: 'Loop with range',
              text: 'Use `for stage in range(1, 7):` and indent `total_kwh += stage` beneath it.',
              content: 'Use `for stage in range(1, 7):` and indent `total_kwh += stage` beneath it.'
            },
            {
              id: 'h-7-2-2',
              level: 2,
              title: 'Code implementation',
              text: 'total_kwh = 0\nfor stage in range(1, 7):\n    total_kwh += stage\nprint(f"Total kWh: {total_kwh}")',
              content:
                'total_kwh = 0\nfor stage in range(1, 7):\n    total_kwh += stage\nprint(f"Total kWh: {total_kwh}")'
            }
          ],
          testCases: [
            {
              id: 'tc-7-2-1',
              description: 'Prints "Total kWh: 21" and checks total_kwh variable',
              type: 'state_and_stdout',
              expectedStdout: 'Total kWh: 21',
              expectedVariables: {
                total_kwh: { value: 21, type: 'int' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimWhitespace: true,
              hidden: false
            },
            {
              id: 'tc-7-2-2',
              description: 'Verifies accumulator loop calculated exact sum (1..6 == 21)',
              type: 'variable',
              variableName: 'total_kwh',
              expectedValue: 21,
              expectedType: 'int',
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimWhitespace: true,
              hidden: true
            }
          ]
        }
      ],
      theory: [
        {
          heading: 'Generating Number Sequences with range()',
          paragraphs: [
            'When you want to repeat code a specific number of times or iterate through numbers, use the built-in range() function.',
            '• range(stop) -> Generates numbers from 0 up to stop - 1 (e.g. range(5) gives 0, 1, 2, 3, 4)\n• range(start, stop) -> Generates numbers from start up to stop - 1 (e.g. range(1, 6) gives 1, 2, 3, 4, 5)'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'daily_miles = 0\nfor day in range(1, 4):\n    daily_miles += 5\nprint(f"Total miles: {daily_miles}")',
              caption: 'Accumulating distance with range.'
            }
          ]
        }
      ],
      taskObjective:
        'Calculate the sum of stage numbers 1 through 6 inclusive using range(1, 7), storing the result in total_kwh and printing f"Total kWh: {total_kwh}".',
      taskInstructions: [
        'Initialize total_kwh = 0.',
        'Write a loop: for stage in range(1, 7):.',
        'Inside the loop, add stage to total_kwh (total_kwh += stage).',
        'Print f"Total kWh: {total_kwh}" (evaluates to 21).'
      ],
      task: {
        objective:
          'Calculate the sum of stage numbers 1 through 6 inclusive using range(1, 7), storing the result in total_kwh and printing f"Total kWh: {total_kwh}".',
        instructions: [
          'Initialize total_kwh = 0.',
          'Write a loop: for stage in range(1, 7):.',
          'Inside the loop, add stage to total_kwh (total_kwh += stage).',
          'Print f"Total kWh: {total_kwh}" (evaluates to 21).'
        ]
      },
      hints: [
        {
          id: 'h-7-2-1',
          level: 1,
          title: 'Loop with range',
          text: 'Use `for stage in range(1, 7):` and indent `total_kwh += stage` beneath it.',
          content: 'Use `for stage in range(1, 7):` and indent `total_kwh += stage` beneath it.'
        },
        {
          id: 'h-7-2-2',
          level: 2,
          title: 'Code implementation',
          text: 'total_kwh = 0\nfor stage in range(1, 7):\n    total_kwh += stage\nprint(f"Total kWh: {total_kwh}")',
          content:
            'total_kwh = 0\nfor stage in range(1, 7):\n    total_kwh += stage\nprint(f"Total kWh: {total_kwh}")'
        }
      ],
      starterCode: `# Electric vehicle charge accumulator
total_kwh = 0

# Write a for loop using range(1, 7) to add each stage number to total_kwh


print(f"Total kWh: {total_kwh}")
`,
      solutionCode: `total_kwh = 0
for stage in range(1, 7):
    total_kwh += stage

print(f"Total kWh: {total_kwh}")
`,
      expectedOutput: 'Total kWh: 21',
      testCases: [
        {
          id: 'tc-7-2-1',
          description: 'Prints "Total kWh: 21" and checks total_kwh variable',
          type: 'state_and_stdout',
          expectedStdout: 'Total kWh: 21',
          expectedVariables: {
            total_kwh: { value: 21, type: 'int' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimWhitespace: true,
          hidden: false
        },
        {
          id: 'tc-7-2-2',
          description: 'Verifies accumulator loop calculated exact sum (1..6 == 21)',
          type: 'variable',
          variableName: 'total_kwh',
          expectedValue: 21,
          expectedType: 'int',
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimWhitespace: true,
          hidden: true
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Lesson 7.3: While Loops
    // -------------------------------------------------------------------------
    {
      id: 'lesson-7-3',
      chapterId: 'ch-7',
      chapterTitle: 'Loops & Iteration',
      lessonNumber: '7.3',
      title: 'While Loops',
      difficulty: 'Intermediate',
      category: 'concept',
      duration: '9 mins',
      durationMinutes: 9,
      xp: 75,
      status: 'locked',
      steps: [
        {
          id: 'l7-3-step-explanation',
          type: 'explanation',
          title: 'Conditional Loops with while',
          content: `A \`while\` loop repeatedly executes a block of code **as long as its condition evaluates to True**:

\`\`\`python
while condition:
    # Runs repeatedly until condition becomes False
    update_state()
\`\`\`

Key rules for \`while\` loops:
1. **Condition Check**: The condition is checked *before* each iteration begins. If it starts out \`False\`, the loop never runs.
2. **State Modification**: The loop body must modify at least one variable involved in the condition, otherwise the condition will never become \`False\`, resulting in an **infinite loop**.
3. **Termination**: When the condition becomes \`False\`, Python continues execution with the next line following the loop.`
        },
        {
          id: 'l7-3-step-worked-example',
          type: 'worked_example',
          title: 'Aerospace: Rocket Fuel Burn Stage',
          description:
            'Observe how a while loop continues executing as long as the condition evaluates to True.',
          code: 'fuel_tons = 30\nwhile fuel_tons > 0:\n    fuel_tons -= 10\nprint(f"Fuel remaining: {fuel_tons}t")',
          expectedStdout: 'Fuel remaining: 0t',
          explanation:
            'The loop executes 3 times until fuel_tons reaches 0, at which point fuel_tons > 0 evaluates to False.'
        },
        {
          id: 'l7-3-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Irrigation Reservoir Drainage',
          question: 'What is the final number printed by print(gallons)?',
          codeSnippet: 'gallons = 12\nwhile gallons > 4:\n    gallons -= 3\nprint(gallons)',
          options: [
            {
              id: 'opt-7-3-correct',
              text: '3',
              isCorrect: true,
              explanation:
                'Correct! Trace: 12 -> 9 -> 6 -> 3. When gallons is 3, 3 > 4 is False and the loop halts.'
            },
            {
              id: 'opt-7-3-four',
              text: '4',
              isCorrect: false,
              explanation:
                'Incorrect: When gallons decreases from 6 by 3, it becomes 3, skipping 4.'
            },
            {
              id: 'opt-7-3-six',
              text: '6',
              isCorrect: false,
              explanation:
                'Incorrect: At gallons == 6, 6 > 4 is True so another iteration runs, subtracting 3.'
            },
            {
              id: 'opt-7-3-zero',
              text: '0',
              isCorrect: false,
              explanation:
                'Incorrect: The loop stops as soon as gallons is no longer greater than 4.'
            }
          ]
        },
        {
          id: 'l7-3-step-true-false',
          type: 'true_false',
          title: 'Concept Check 2: Infinite Loop Prevention',
          statement:
            'If the condition in a while loop never becomes False and no break occurs, the program will remain stuck in an infinite loop.',
          correctAnswer: true,
          explanation:
            'Correct! While loops only stop when the condition evaluates to False or a break statement is executed.'
        },
        {
          id: 'l7-3-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Submersible Ascent Control',
          objective:
            'A deep-sea submersible begins at depth = 50. Write a while loop: as long as depth > 0, decrement depth by 10 per cycle (depth -= 10). After the loop, print f"Surfaced at depth: {depth}m".',
          instructions: [
            'Initialize depth = 50.',
            'Write while depth > 0:.',
            'Inside the indented loop, decrement depth by 10: depth -= 10.',
            'After the loop, print f"Surfaced at depth: {depth}m" (which outputs "Surfaced at depth: 0m").'
          ],
          starterCode: `# Submersible ascent control
depth = 50

# Write a while loop: while depth > 0, decrement depth by 10


print(f"Surfaced at depth: {depth}m")
`,
          solutionCode: `depth = 50
while depth > 0:
    depth -= 10

print(f"Surfaced at depth: {depth}m")
`,
          hints: [
            {
              id: 'h-7-3-1',
              level: 1,
              title: 'While condition',
              text: 'Use `while depth > 0:` and indent `depth -= 10` inside the loop body.',
              content: 'Use `while depth > 0:` and indent `depth -= 10` inside the loop body.'
            },
            {
              id: 'h-7-3-2',
              level: 2,
              title: 'Code implementation',
              text: 'depth = 50\nwhile depth > 0:\n    depth -= 10\nprint(f"Surfaced at depth: {depth}m")',
              content:
                'depth = 50\nwhile depth > 0:\n    depth -= 10\nprint(f"Surfaced at depth: {depth}m")'
            }
          ],
          testCases: [
            {
              id: 'tc-7-3-1',
              description: 'Prints "Surfaced at depth: 0m" and verifies depth reaches 0',
              type: 'state_and_stdout',
              expectedStdout: 'Surfaced at depth: 0m',
              expectedVariables: {
                depth: { value: 0, type: 'int' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimWhitespace: true,
              hidden: false
            },
            {
              id: 'tc-7-3-2',
              description: 'Verifies loop halted exactly at boundary depth == 0',
              type: 'variable',
              variableName: 'depth',
              expectedValue: 0,
              expectedType: 'int',
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimWhitespace: true,
              hidden: true
            }
          ]
        }
      ],
      theory: [
        {
          heading: 'Conditional Loops with while',
          paragraphs: [
            'A while loop keeps running as long as its condition remains True.',
            "While loops are used when you don't know ahead of time how many iterations will be required, but you know the condition that terminates the loop."
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'fuel_tons = 30\nwhile fuel_tons > 0:\n    fuel_tons -= 10\nprint(f"Fuel remaining: {fuel_tons}t")',
              caption:
                'Always remember to modify the variable inside the loop to avoid infinite loops!'
            }
          ]
        }
      ],
      taskObjective:
        'A deep-sea submersible begins at depth = 50. Write a while loop: as long as depth > 0, decrement depth by 10. After the loop, print f"Surfaced at depth: {depth}m".',
      taskInstructions: [
        'Initialize depth = 50.',
        'Write while depth > 0:.',
        'Inside the loop, decrement: depth -= 10.',
        'After the loop, print f"Surfaced at depth: {depth}m".'
      ],
      task: {
        objective:
          'A deep-sea submersible begins at depth = 50. Write a while loop: as long as depth > 0, decrement depth by 10. After the loop, print f"Surfaced at depth: {depth}m".',
        instructions: [
          'Initialize depth = 50.',
          'Write while depth > 0:.',
          'Inside the loop, decrement: depth -= 10.',
          'After the loop, print f"Surfaced at depth: {depth}m".'
        ]
      },
      hints: [
        {
          id: 'h-7-3-1',
          level: 1,
          title: 'While condition',
          text: 'Use `while depth > 0:` and indent `depth -= 10` inside the loop body.',
          content: 'Use `while depth > 0:` and indent `depth -= 10` inside the loop body.'
        },
        {
          id: 'h-7-3-2',
          level: 2,
          title: 'Code implementation',
          text: 'depth = 50\nwhile depth > 0:\n    depth -= 10\nprint(f"Surfaced at depth: {depth}m")',
          content:
            'depth = 50\nwhile depth > 0:\n    depth -= 10\nprint(f"Surfaced at depth: {depth}m")'
        }
      ],
      starterCode: `# Submersible ascent control
depth = 50

# Write a while loop: while depth > 0, decrement depth by 10


print(f"Surfaced at depth: {depth}m")
`,
      solutionCode: `depth = 50
while depth > 0:
    depth -= 10

print(f"Surfaced at depth: {depth}m")
`,
      expectedOutput: 'Surfaced at depth: 0m',
      testCases: [
        {
          id: 'tc-7-3-1',
          description: 'Prints "Surfaced at depth: 0m" and verifies depth reaches 0',
          type: 'state_and_stdout',
          expectedStdout: 'Surfaced at depth: 0m',
          expectedVariables: {
            depth: { value: 0, type: 'int' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimWhitespace: true,
          hidden: false
        },
        {
          id: 'tc-7-3-2',
          description: 'Verifies loop halted exactly at boundary depth == 0',
          type: 'variable',
          variableName: 'depth',
          expectedValue: 0,
          expectedType: 'int',
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimWhitespace: true,
          hidden: true
        }
      ]
    }
  ]
}
