import { Chapter } from '../../types/curriculum'

export const chapter1: Chapter = {
  id: 'ch-1',
  chapterNumber: 1,
  title: 'Chapter 1: Getting Started with Python',
  description:
    'Master the fundamentals of Python syntax, printing messages, and working with variables.',
  lessons: [
    // -------------------------------------------------------------------------
    // Lesson 1.1: Put a message on the screen (Concept)
    // -------------------------------------------------------------------------
    {
      id: 'lesson-1-1',
      chapterId: 'ch-1',
      chapterTitle: 'Getting Started with Python',
      lessonNumber: '1.1',
      title: 'Put a message on the screen',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '5 mins',
      durationMinutes: 5,
      xp: 50,
      status: 'active',
      steps: [
        {
          id: 'l1-1-step-explanation',
          type: 'explanation',
          title: 'Introduction to print() & Strings',
          content: `Welcome to Python! Python is one of the most readable, powerful, and beginner-friendly programming languages in the world.

### The \`print()\` Function
To display information on the screen, Python provides a built-in function called \`print()\`. A function is a named command that tells Python to carry out a specific action.

When you pass data inside the parentheses \`(...)\`, Python outputs that data directly to the console.

### String Literals
Text in Python is called a **string**. A string literal must always be enclosed in quotation marks — either double quotes (\`"..."\`) or single quotes (\`'...' \`).

\`\`\`python
print("Hello, World!")
\`\`\`

The quotation marks tell Python: *"Treat this as literal characters of text, not code or variable names."*

### Key Rules:
1. **Case Sensitivity:** Python function names must be lowercase (\`print\`). Calling \`Print()\` or \`PRINT()\` results in a \`NameError\`.
2. **Matching Quotes:** Every opening quote must have an identical matching closing quote.`
        },
        {
          id: 'l1-1-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Running print()',
          description:
            'Observe how Python executes the print() function and displays the text without quotation marks.',
          code: 'print("Mission Control: Systems nominal.")',
          expectedStdout: 'Mission Control: Systems nominal.',
          explanation:
            'Notice that the quotation marks are not printed to the screen. Quotes tell Python where the string begins and ends in your source code, but the output receives only the raw text.'
        },
        {
          id: 'l1-1-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Predict the Output',
          question: 'What will the following Python code output to the console?',
          codeSnippet: 'print("Recipe: Sourdough Bread")',
          options: [
            {
              id: 'opt-quotes',
              text: '"Recipe: Sourdough Bread"',
              isCorrect: false,
              explanation:
                'Incorrect: Python does not include enclosing quotation marks in stdout. Quotes simply delineate the string in code.'
            },
            {
              id: 'opt-correct',
              text: 'Recipe: Sourdough Bread',
              isCorrect: true,
              explanation:
                'Correct! The print() function outputs the literal text contents without quotation marks.'
            },
            {
              id: 'opt-func-name',
              text: 'print',
              isCorrect: false,
              explanation:
                'Incorrect: "print" is the name of the function, not the argument string passed to it.'
            },
            {
              id: 'opt-echo',
              text: 'print("Recipe: Sourdough Bread")',
              isCorrect: false,
              explanation:
                'Incorrect: Python executes the function call rather than printing the source code itself.'
            }
          ]
        },
        {
          id: 'l1-1-step-true-false',
          type: 'true_false',
          title: 'Concept Check 2: String Quotes',
          statement:
            'In Python, text strings must always be enclosed in quotation marks (such as "..." or \'...\') to be valid.',
          correctAnswer: true,
          explanation:
            'Correct! Without quotation marks, Python would mistake the text for variable names or language keywords.'
        },
        {
          id: 'l1-1-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Put a Message on the Screen',
          objective:
            'Display the exact message "Audio Engine: Initializing stereo sound..." in the console output.',
          instructions: [
            'Call the print() function in lowercase.',
            'Pass the string literal "Audio Engine: Initializing stereo sound..." inside the parentheses.',
            'Ensure capitalization, spelling, and punctuation (including the ellipses ...) match exactly.'
          ],
          starterCode:
            '# Write your code below to print: Audio Engine: Initializing stereo sound...\n',
          solutionCode: 'print("Audio Engine: Initializing stereo sound...")\n',
          hints: [
            {
              id: 'h-1-1-1',
              level: 1,
              title: 'String quotes check',
              text: 'Make sure your text is enclosed in double quotes: "Audio Engine: Initializing stereo sound..."',
              content:
                'Make sure your text is enclosed in double quotes: "Audio Engine: Initializing stereo sound..."'
            },
            {
              id: 'h-1-1-2',
              level: 2,
              title: 'Complete statement',
              text: 'print("Audio Engine: Initializing stereo sound...")',
              content: 'print("Audio Engine: Initializing stereo sound...")'
            }
          ],
          testCases: [
            {
              id: 'tc-1-1-1',
              description: 'Prints exact "Audio Engine: Initializing stereo sound..." to stdout',
              type: 'stdout',
              expectedStdout: 'Audio Engine: Initializing stereo sound...',
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false
            },
            {
              id: 'tc-1-1-2',
              description: 'Strict case-sensitivity and punctuation check',
              type: 'stdout',
              expectedStdout: 'Audio Engine: Initializing stereo sound...',
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              hidden: true
            }
          ]
        }
      ],
      // Legacy compatibility fields
      theory: [
        {
          heading: 'Introduction to print()',
          paragraphs: [
            'Welcome to Python! To display information on the screen, use the print() function.',
            'Text is enclosed in quotation marks: print("Mission Control: Systems nominal.")'
          ]
        }
      ],
      taskObjective:
        'Display the exact message "Audio Engine: Initializing stereo sound..." in the console output.',
      taskInstructions: [
        'Call the print() function in lowercase.',
        'Pass the string literal "Audio Engine: Initializing stereo sound..." inside the parentheses.',
        'Ensure capitalization, spelling, and punctuation match exactly.'
      ],
      hints: [
        {
          id: 'h-1-1-1',
          level: 1,
          title: 'String quotes check',
          text: 'Make sure your text is enclosed in double quotes: "Audio Engine: Initializing stereo sound..."',
          content:
            'Make sure your text is enclosed in double quotes: "Audio Engine: Initializing stereo sound..."'
        },
        {
          id: 'h-1-1-2',
          level: 2,
          title: 'Complete statement',
          text: 'print("Audio Engine: Initializing stereo sound...")',
          content: 'print("Audio Engine: Initializing stereo sound...")'
        }
      ],
      starterCode: '# Write your code below to print: Audio Engine: Initializing stereo sound...\n',
      solutionCode: 'print("Audio Engine: Initializing stereo sound...")\n',
      expectedOutput: 'Audio Engine: Initializing stereo sound...',
      testCases: [
        {
          id: 'tc-1-1-1',
          description: 'Prints exact "Audio Engine: Initializing stereo sound..." to stdout',
          type: 'stdout',
          expectedStdout: 'Audio Engine: Initializing stereo sound...',
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false
        },
        {
          id: 'tc-1-1-2',
          description: 'Strict case-sensitivity and punctuation check',
          type: 'stdout',
          expectedStdout: 'Audio Engine: Initializing stereo sound...',
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          hidden: true
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Lesson 1.2: Print two lines (Practice)
    // -------------------------------------------------------------------------
    {
      id: 'lesson-1-2',
      chapterId: 'ch-1',
      chapterTitle: 'Getting Started with Python',
      lessonNumber: '1.2',
      title: 'Print two lines',
      difficulty: 'Beginner',
      category: 'practice',
      duration: '5 mins',
      durationMinutes: 5,
      xp: 50,
      status: 'locked',
      steps: [
        {
          id: 'l1-2-step-explanation',
          type: 'explanation',
          title: 'Statement Order & Multi-line Output',
          content: `Python executes code **sequentially from top to bottom**, one statement at a time.

### Automatic Newlines
Every time you call \`print()\`, Python prints the given content and then automatically adds a newline character at the end.

When you call \`print()\` twice on separate lines:
\`\`\`python
print("First line")
print("Second line")
\`\`\`

The console output will be:
\`\`\`text
First line
Second line
\`\`\`

Each statement runs in the exact order it is written in your code.`
        },
        {
          id: 'l1-2-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Two Print Statements',
          description: 'Observe how calling print() on separate lines creates multi-line output.',
          code: 'print("Game Status:")\nprint("Player ready!")',
          expectedStdout: 'Game Status:\nPlayer ready!',
          explanation:
            'The first print() call displays "Game Status:" and starts a new line. The second print() call displays "Player ready!" on line 2.'
        },
        {
          id: 'l1-2-step-fill-blank',
          type: 'fill_blank',
          title: 'Concept Check: Complete the Second Line',
          prompt:
            'Fill in the blank so that the program prints "Weather Alert:" on line 1 and "High winds expected." on line 2:',
          codeTemplate: 'print("Weather Alert:")\nprint("{{blank}}")',
          acceptedAnswers: ['High winds expected.'],
          explanation:
            'Passing "High winds expected." to the second print() call outputs it on line 2 right after "Weather Alert:".',
          hint: 'Remember to match punctuation: High winds expected.'
        },
        {
          id: 'l1-2-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Print Two Lines',
          objective:
            'Print "Order received." on the first line and "Preparing shipment." on the second line.',
          instructions: [
            'On line 1, call print("Order received.").',
            'On line 2, call print("Preparing shipment.").',
            'Verify that both sentences appear on their own lines in the console.'
          ],
          starterCode: '# Print "Order received." then "Preparing shipment." on separate lines\n',
          solutionCode: 'print("Order received.")\nprint("Preparing shipment.")\n',
          hints: [
            {
              id: 'h-1-2-1',
              level: 1,
              title: 'Two separate print calls',
              text: 'Write two separate print() calls on two different lines.',
              content: 'Write two separate print() calls on two different lines.'
            },
            {
              id: 'h-1-2-2',
              level: 2,
              title: 'Complete solution',
              text: 'print("Order received.")\nprint("Preparing shipment.")',
              content: 'print("Order received.")\nprint("Preparing shipment.")'
            }
          ],
          testCases: [
            {
              id: 'tc-1-2-1',
              description:
                'Outputs "Order received." on line 1 and "Preparing shipment." on line 2',
              type: 'stdout',
              expectedStdout: 'Order received.\nPreparing shipment.',
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false
            },
            {
              id: 'tc-1-2-2',
              description: 'Verifies statement order and case sensitivity',
              type: 'stdout',
              expectedStdout: 'Order received.\nPreparing shipment.',
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
          heading: 'Sequential Execution',
          paragraphs: [
            'Python runs statements from top to bottom.',
            'Each print() call produces its own line of output.'
          ]
        }
      ],
      taskObjective:
        'Print "Order received." on the first line and "Preparing shipment." on the second line.',
      taskInstructions: [
        'On line 1, call print("Order received.").',
        'On line 2, call print("Preparing shipment.").',
        'Verify that both words appear on their own lines in the console.'
      ],
      hints: [
        {
          id: 'h-1-2-1',
          level: 1,
          title: 'Two separate print calls',
          text: 'Write two separate print() calls on two different lines.',
          content: 'Write two separate print() calls on two different lines.'
        },
        {
          id: 'h-1-2-2',
          level: 2,
          title: 'Complete solution',
          text: 'print("Order received.")\nprint("Preparing shipment.")',
          content: 'print("Order received.")\nprint("Preparing shipment.")'
        }
      ],
      starterCode: '# Print "Order received." then "Preparing shipment." on separate lines\n',
      solutionCode: 'print("Order received.")\nprint("Preparing shipment.")\n',
      expectedOutput: 'Order received.\nPreparing shipment.',
      testCases: [
        {
          id: 'tc-1-2-1',
          description: 'Outputs "Order received." on line 1 and "Preparing shipment." on line 2',
          type: 'stdout',
          expectedStdout: 'Order received.\nPreparing shipment.',
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false
        },
        {
          id: 'tc-1-2-2',
          description: 'Verifies statement order and case sensitivity',
          type: 'stdout',
          expectedStdout: 'Order received.\nPreparing shipment.',
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          hidden: true
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Lesson 1.3: Give a number a name (Concept)
    // -------------------------------------------------------------------------
    {
      id: 'lesson-1-3',
      chapterId: 'ch-1',
      chapterTitle: 'Getting Started with Python',
      lessonNumber: '1.3',
      title: 'Give a number a name',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '5 mins',
      durationMinutes: 5,
      xp: 50,
      status: 'locked',
      steps: [
        {
          id: 'l1-3-step-explanation',
          type: 'explanation',
          title: 'What is a Variable?',
          content: `Think of a **variable** as a labeled storage box in your computer's memory. When you write \`coins = 5\`, Python reserves a memory box labeled \`coins\` and puts the number \`5\` inside it.

### The Assignment Operator (\`=\`)
In Python, the single equals sign (\`=\`) is called the **assignment operator**. It means:
> *"Take the value on the right, and store it into the variable name on the left."*

### Numbers Don't Use Quotes
Notice that numbers are written directly without quotation marks!
- **Integers (numbers):** \`coins = 5\` (can be used for calculations)
- **String literals (text):** \`"5"\` (just characters of text)`
        },
        {
          id: 'l1-3-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Assigning and Printing a Variable',
          description: 'Observe how a number is stored in a variable and printed without quotes.',
          code: 'coins = 5\nprint(coins)',
          expectedStdout: '5',
          explanation:
            'When you pass a variable name into print(), Python looks up the box labeled coins and prints its value (5), not the word "coins"!'
        },
        {
          id: 'l1-3-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Predict the Output',
          question: 'What will the following code output to the console?',
          codeSnippet: 'speed = 65\nprint("speed")',
          options: [
            {
              id: 'opt-speed-str',
              text: 'speed',
              isCorrect: true,
              explanation:
                'Correct! Because "speed" has quotes around it, Python treats it as literal text, not the variable. To print 65, you would write print(speed) without quotes.'
            },
            {
              id: 'opt-speed-val',
              text: '65',
              isCorrect: false,
              explanation:
                'Incorrect: "speed" is in quotation marks, making it a string literal. To print 65, remove the quotation marks inside print().'
            },
            {
              id: 'opt-speed-both',
              text: '65 speed',
              isCorrect: false,
              explanation:
                'Incorrect: Python does not combine the variable and string automatically.'
            },
            {
              id: 'opt-speed-err',
              text: 'Error',
              isCorrect: false,
              explanation:
                'Incorrect: Printing a string literal "speed" is completely valid Python syntax.'
            }
          ]
        },
        {
          id: 'l1-3-step-fill-blank',
          type: 'fill_blank',
          title: 'Concept Check 2: Variable Assignment',
          prompt: 'Fill in the blank to assign the integer 65 to the variable named speed:',
          codeTemplate: 'speed = {{blank}}',
          acceptedAnswers: ['65'],
          explanation:
            'Numbers in Python are written without quotes: speed = 65 creates a variable named speed containing the integer 65.',
          hint: 'Type 65 without quotes.'
        },
        {
          id: 'l1-3-step-true-false',
          type: 'true_false',
          title: 'Concept Check 3: Variable Output Syntax',
          statement:
            'To print the value stored in the variable speed, you should write print("speed") with quotation marks.',
          correctAnswer: false,
          explanation:
            'Correct! Quotes make Python print the word "speed" literally. To print the value inside the variable, omit the quotes: print(speed).'
        },
        {
          id: 'l1-3-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Assign and Print a Number',
          objective: 'Assign the integer 48 to the variable stock_count, then print stock_count.',
          instructions: [
            'On line 1, create a variable named stock_count and assign it the integer 48.',
            'On line 2, call print(stock_count) to output the value to the screen.'
          ],
          starterCode: '# Assign 48 to stock_count and print it\n',
          solutionCode: 'stock_count = 48\nprint(stock_count)\n',
          hints: [
            {
              id: 'h-1-3-1',
              level: 1,
              title: 'Assigning without quotes',
              text: 'Write stock_count = 48 without quotation marks around 48.',
              content: 'Write stock_count = 48 without quotation marks around 48.'
            },
            {
              id: 'h-1-3-2',
              level: 2,
              title: 'Printing the variable',
              text: 'Use print(stock_count) without quotation marks.',
              content: 'Use print(stock_count) without quotation marks.'
            }
          ],
          testCases: [
            {
              id: 'tc-1-3-1',
              description: 'Assigns stock_count = 48 and prints 48 to stdout',
              type: 'state_and_stdout',
              expectedStdout: '48',
              expectedVariables: {
                stock_count: { value: 48, type: 'int' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'stock_count',
                  message:
                    "You must assign the value 48 to the variable 'stock_count' (e.g. stock_count = 48)."
                }
              ]
            },
            {
              id: 'tc-1-3-2',
              description: 'Verifies stock_count variable has integer value 48',
              type: 'state_and_stdout',
              expectedStdout: '48',
              expectedVariables: {
                stock_count: { value: 48, type: 'int' }
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
          heading: 'Variables and Numbers',
          paragraphs: [
            'Variables hold values in memory using the assignment operator =.',
            'Numbers are assigned without quotes: stock_count = 48',
            'Print a variable by passing its name: print(stock_count)'
          ]
        }
      ],
      taskObjective: 'Assign the integer 48 to the variable stock_count, then print stock_count.',
      taskInstructions: [
        'On line 1, create a variable named stock_count and assign it the integer 48.',
        'On line 2, call print(stock_count) to output the value to the screen.'
      ],
      hints: [
        {
          id: 'h-1-3-1',
          level: 1,
          title: 'Assigning without quotes',
          text: 'Write stock_count = 48 without quotation marks around 48.',
          content: 'Write stock_count = 48 without quotation marks around 48.'
        },
        {
          id: 'h-1-3-2',
          level: 2,
          title: 'Printing the variable',
          text: 'Use print(stock_count) without quotation marks.',
          content: 'Use print(stock_count) without quotation marks.'
        }
      ],
      starterCode: '# Assign 48 to stock_count and print it\n',
      solutionCode: 'stock_count = 48\nprint(stock_count)\n',
      expectedOutput: '48',
      testCases: [
        {
          id: 'tc-1-3-1',
          description: 'Assigns stock_count = 48 and prints 48 to stdout',
          type: 'state_and_stdout',
          expectedStdout: '48',
          expectedVariables: {
            stock_count: { value: 48, type: 'int' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'stock_count',
              message:
                "You must assign the value 48 to the variable 'stock_count' (e.g. stock_count = 48)."
            }
          ]
        },
        {
          id: 'tc-1-3-2',
          description: 'Verifies stock_count variable has integer value 48',
          type: 'state_and_stdout',
          expectedStdout: '48',
          expectedVariables: {
            stock_count: { value: 48, type: 'int' }
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
    // Lesson 1.4: Store a word (Concept)
    // -------------------------------------------------------------------------
    {
      id: 'lesson-1-4',
      chapterId: 'ch-1',
      chapterTitle: 'Getting Started with Python',
      lessonNumber: '1.4',
      title: 'Store a word',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '5 mins',
      durationMinutes: 5,
      xp: 50,
      status: 'locked',
      steps: [
        {
          id: 'l1-4-step-explanation',
          type: 'explanation',
          title: 'Storing Text in Variables',
          content: `Variables aren't just for numbers — they can also store words and sentences!

In Python, text is called a **string** (\`str\`). When assigning text to a variable, you **must** enclose the text in quotation marks:

\`\`\`python
destination = "Tokyo"
print(destination)
\`\`\`

### What happens if you forget the quotes?
If you write \`destination = Tokyo\` without quotes, Python searches its memory for a variable named \`Tokyo\`. Since no variable named \`Tokyo\` was defined, Python stops with an error:
\`\`\`text
NameError: name 'Tokyo' is not defined
\`\`\`

Always wrap literal text in quotes!`
        },
        {
          id: 'l1-4-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: String Variables',
          description: 'Observe how a text string is stored in a variable and printed.',
          code: 'destination = "Tokyo"\nprint(destination)',
          expectedStdout: 'Tokyo',
          explanation:
            'The variable destination holds the string "Tokyo". When passed into print(), Python outputs Tokyo without the quotes.'
        },
        {
          id: 'l1-4-step-identify-error',
          type: 'identify_error',
          title: 'Concept Check: Spot the Missing Quotes',
          question: 'What is the error in the following Python snippet?',
          codeSnippet: 'favorite_book = Dune\nprint(favorite_book)',
          options: [
            {
              id: 'opt-err-quotes',
              text: 'Dune is missing quotation marks, which causes a NameError',
              isCorrect: true,
              explanation:
                'Correct! Without quotes, Python looks for an existing variable named Dune. Putting quotes around "Dune" fixes the bug.'
            },
            {
              id: 'opt-err-print',
              text: 'favorite_book in print() needs quotation marks',
              isCorrect: false,
              explanation:
                'Incorrect: Writing print("favorite_book") would print the literal word "favorite_book" instead of the value.'
            },
            {
              id: 'opt-err-varname',
              text: 'favorite_book is not a valid variable name',
              isCorrect: false,
              explanation:
                'Incorrect: favorite_book is a completely valid snake_case variable name in Python.'
            },
            {
              id: 'opt-err-strings',
              text: 'Variables in Python cannot store words',
              isCorrect: false,
              explanation: 'Incorrect: Variables can store any text string wrapped in quotes.'
            }
          ]
        },
        {
          id: 'l1-4-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Store a Word in a Variable',
          objective:
            'Store the string "Paladin" in the variable hero_class, then print hero_class.',
          instructions: [
            'Create a variable named hero_class and assign it the string "Paladin" (with quotes).',
            'On the next line, call print(hero_class) to output the hero class to the console.'
          ],
          starterCode: '# Store "Paladin" in hero_class and print it\n',
          solutionCode: 'hero_class = "Paladin"\nprint(hero_class)\n',
          hints: [
            {
              id: 'h-1-4-1',
              level: 1,
              title: 'String quotes reminder',
              text: 'Enclose Paladin in quotes: hero_class = "Paladin"',
              content: 'Enclose Paladin in quotes: hero_class = "Paladin"'
            },
            {
              id: 'h-1-4-2',
              level: 2,
              title: 'Complete solution',
              text: 'hero_class = "Paladin"\nprint(hero_class)',
              content: 'hero_class = "Paladin"\nprint(hero_class)'
            }
          ],
          testCases: [
            {
              id: 'tc-1-4-1',
              description: 'Stores hero_class = "Paladin" and outputs Paladin to stdout',
              type: 'state_and_stdout',
              expectedStdout: 'Paladin',
              expectedVariables: {
                hero_class: { value: 'Paladin', type: 'str' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'hero_class',
                  message: "Make sure you create and assign the 'hero_class' variable."
                }
              ]
            },
            {
              id: 'tc-1-4-2',
              description: 'Verifies hero_class variable holds string "Paladin"',
              type: 'state_and_stdout',
              expectedStdout: 'Paladin',
              expectedVariables: {
                hero_class: { value: 'Paladin', type: 'str' }
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
          heading: 'Strings in Variables',
          paragraphs: [
            'Store text in variables using quotes.',
            'Without quotes, Python raises a NameError searching for an undefined variable.',
            'Print string variables using print(variable_name).'
          ]
        }
      ],
      taskObjective:
        'Store the string "Paladin" in the variable hero_class, then print hero_class.',
      taskInstructions: [
        'Create a variable named hero_class and assign it the string "Paladin" (with quotes).',
        'On the next line, call print(hero_class) to output the hero class to the console.'
      ],
      hints: [
        {
          id: 'h-1-4-1',
          level: 1,
          title: 'String quotes reminder',
          text: 'Enclose Paladin in quotes: hero_class = "Paladin"',
          content: 'Enclose Paladin in quotes: hero_class = "Paladin"'
        },
        {
          id: 'h-1-4-2',
          level: 2,
          title: 'Complete solution',
          text: 'hero_class = "Paladin"\nprint(hero_class)',
          content: 'hero_class = "Paladin"\nprint(hero_class)'
        }
      ],
      starterCode: '# Store "Paladin" in hero_class and print it\n',
      solutionCode: 'hero_class = "Paladin"\nprint(hero_class)\n',
      expectedOutput: 'Paladin',
      testCases: [
        {
          id: 'tc-1-4-1',
          description: 'Stores hero_class = "Paladin" and outputs Paladin to stdout',
          type: 'state_and_stdout',
          expectedStdout: 'Paladin',
          expectedVariables: {
            hero_class: { value: 'Paladin', type: 'str' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'hero_class',
              message: "Make sure you create and assign the 'hero_class' variable."
            }
          ]
        },
        {
          id: 'tc-1-4-2',
          description: 'Verifies hero_class variable holds string "Paladin"',
          type: 'state_and_stdout',
          expectedStdout: 'Paladin',
          expectedVariables: {
            hero_class: { value: 'Paladin', type: 'str' }
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
    // Lesson 1.5: A value can change (Concept)
    // -------------------------------------------------------------------------
    {
      id: 'lesson-1-5',
      chapterId: 'ch-1',
      chapterTitle: 'Getting Started with Python',
      lessonNumber: '1.5',
      title: 'A value can change',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '5 mins',
      durationMinutes: 5,
      xp: 50,
      status: 'locked',
      steps: [
        {
          id: 'l1-5-step-explanation',
          type: 'explanation',
          title: 'Variables Can Change (Reassignment)',
          content: `The root word of **variable** is *vary* — which means to change!

Once you create a variable, its value is not locked in forever. You can reassign a brand-new value to an existing variable at any point.

### Top-to-Bottom Execution
Python executes code one line at a time. When you assign a new value to a variable, Python replaces the old value in that memory box:

\`\`\`python
points = 10
points = 25
print(points)  # Prints: 25
\`\`\`

The first line put 10 in \`points\`. The second line overwrote it with 25. By the time \`print()\` runs, \`points\` holds 25.`
        },
        {
          id: 'l1-5-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Reassigning a Variable',
          description: 'Observe how reassigning a variable updates the value held in memory.',
          code: 'points = 10\npoints = 25\nprint(points)',
          expectedStdout: '25',
          explanation:
            'Line 1 stores 10. Line 2 replaces 10 with 25. The output shows 25 because that is the current value at the moment print(points) executes.'
        },
        {
          id: 'l1-5-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check: Predict Reassignment Output',
          question: 'What will the following code print to the console?',
          codeSnippet: 'fuel_percent = 100\nfuel_percent = 75\nprint(fuel_percent)',
          options: [
            {
              id: 'opt-reassign-75',
              text: '75',
              isCorrect: true,
              explanation:
                'Correct! Python executed sequentially: fuel_percent = 75 overwrote the initial value of 100.'
            },
            {
              id: 'opt-reassign-100',
              text: '100',
              isCorrect: false,
              explanation:
                'Incorrect: The value 100 was replaced on line 2 before print(fuel_percent) was called.'
            },
            {
              id: 'opt-reassign-both',
              text: '100 75',
              isCorrect: false,
              explanation: 'Incorrect: A variable only holds a single value at any given moment.'
            },
            {
              id: 'opt-reassign-str',
              text: 'fuel_percent',
              isCorrect: false,
              explanation:
                'Incorrect: fuel_percent is a variable without quotes, so its current value is printed.'
            }
          ]
        },
        {
          id: 'l1-5-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Reassign a Variable',
          objective:
            'Create temperature with value 68, reassign temperature to 72, and print the updated value.',
          instructions: [
            'On line 1, create a variable named temperature and assign it the integer 68.',
            'On line 2, reassign temperature to the integer 72.',
            'On line 3, call print(temperature) to output the updated temperature.'
          ],
          starterCode: '# Assign temperature to 68, reassign to 72, and print it\n',
          solutionCode: 'temperature = 68\ntemperature = 72\nprint(temperature)\n',
          hints: [
            {
              id: 'h-1-5-1',
              level: 1,
              title: 'Reassignment syntax',
              text: 'Just assign again to the same variable name: temperature = 72',
              content: 'Just assign again to the same variable name: temperature = 72'
            },
            {
              id: 'h-1-5-2',
              level: 2,
              title: 'Complete solution',
              text: 'temperature = 68\ntemperature = 72\nprint(temperature)',
              content: 'temperature = 68\ntemperature = 72\nprint(temperature)'
            }
          ],
          testCases: [
            {
              id: 'tc-1-5-1',
              description: 'Reassigns temperature to 72 and outputs 72 to stdout',
              type: 'state_and_stdout',
              expectedStdout: '72',
              expectedVariables: {
                temperature: { value: 72, type: 'int' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'temperature',
                  message: "Make sure you create and assign the 'temperature' variable."
                }
              ]
            },
            {
              id: 'tc-1-5-2',
              description: 'Verifies temperature variable has updated integer value 72',
              type: 'state_and_stdout',
              expectedStdout: '72',
              expectedVariables: {
                temperature: { value: 72, type: 'int' }
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
          heading: 'Reassignment',
          paragraphs: [
            'Variables can have their values replaced at any time.',
            'Python executes sequentially from top to bottom.'
          ]
        }
      ],
      taskObjective:
        'Create temperature with value 68, reassign temperature to 72, and print the updated value.',
      taskInstructions: [
        'On line 1, create a variable named temperature and assign it the integer 68.',
        'On line 2, reassign temperature to the integer 72.',
        'On line 3, call print(temperature) to output the updated temperature.'
      ],
      hints: [
        {
          id: 'h-1-5-1',
          level: 1,
          title: 'Reassignment syntax',
          text: 'Just assign again to the same variable name: temperature = 72',
          content: 'Just assign again to the same variable name: temperature = 72'
        },
        {
          id: 'h-1-5-2',
          level: 2,
          title: 'Complete solution',
          text: 'temperature = 68\ntemperature = 72\nprint(temperature)',
          content: 'temperature = 68\ntemperature = 72\nprint(temperature)'
        }
      ],
      starterCode: '# Assign temperature to 68, reassign to 72, and print it\n',
      solutionCode: 'temperature = 68\ntemperature = 72\nprint(temperature)\n',
      expectedOutput: '72',
      testCases: [
        {
          id: 'tc-1-5-1',
          description: 'Reassigns temperature to 72 and outputs 72 to stdout',
          type: 'state_and_stdout',
          expectedStdout: '72',
          expectedVariables: {
            temperature: { value: 72, type: 'int' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'temperature',
              message: "Make sure you create and assign the 'temperature' variable."
            }
          ]
        },
        {
          id: 'tc-1-5-2',
          description: 'Verifies temperature variable has updated integer value 72',
          type: 'state_and_stdout',
          expectedStdout: '72',
          expectedVariables: {
            temperature: { value: 72, type: 'int' }
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
    // Lesson 1.6: Fix the name (Practice)
    // -------------------------------------------------------------------------
    {
      id: 'lesson-1-6',
      chapterId: 'ch-1',
      chapterTitle: 'Getting Started with Python',
      lessonNumber: '1.6',
      title: 'Fix the name',
      difficulty: 'Beginner',
      category: 'practice',
      duration: '5 mins',
      durationMinutes: 5,
      xp: 50,
      status: 'locked',
      steps: [
        {
          id: 'l1-6-step-explanation',
          type: 'explanation',
          title: 'Debugging: Catching and Fixing NameErrors',
          content: `Even senior software engineers make typos every day! The process of finding and fixing mistakes in code is called **debugging**.

One of the most frequent errors in Python is a **\`NameError\`**.

A \`NameError\` happens when Python is asked to use a variable name that hasn't been defined yet:
\`\`\`text
NameError: name 'user_name' is not defined
\`\`\`

### Common Causes:
1. **Misspelling / Typos:** Defining \`player_rank\` on line 1, but writing \`player_ran\` on line 2.
2. **Case mismatches:** Defining \`player\` but referencing \`Player\` (Python is strictly case-sensitive!).
3. **Execution order:** Trying to \`print()\` a variable before creating it on a prior line.`
        },
        {
          id: 'l1-6-step-identify-error',
          type: 'identify_error',
          title: 'Concept Check: Spot the Typo',
          question: 'Why will the following code raise a NameError?',
          codeSnippet: 'passcode_key = "Alpha9"\nprint(passcode)',
          options: [
            {
              id: 'opt-err-underscore',
              text: 'passcode on line 2 does not match passcode_key defined on line 1, so Python does not recognize it',
              isCorrect: true,
              explanation:
                'Correct! Variable names must match character-for-character. To Python, passcode and passcode_key are two completely different names.'
            },
            {
              id: 'opt-err-quotes2',
              text: '"Alpha9" requires single quotes instead of double quotes',
              isCorrect: false,
              explanation:
                'Incorrect: Double and single quotes are completely interchangeable in Python.'
            },
            {
              id: 'opt-err-print2',
              text: 'print() cannot print strings stored in variables',
              isCorrect: false,
              explanation: 'Incorrect: print() can output any variable value.'
            },
            {
              id: 'opt-err-keyword',
              text: 'passcode_key is a reserved Python keyword',
              isCorrect: false,
              explanation:
                'Incorrect: passcode_key is a regular identifier, not a reserved keyword.'
            }
          ]
        },
        {
          id: 'l1-6-step-code-task',
          type: 'code_task',
          title: 'Debug Challenge: Fix the Typo',
          objective:
            'Fix the typo in the starter code so that the flight code "AZ-410" is printed successfully.',
          instructions: [
            'Look at the starter code below: notice flight_code is defined on line 1, but line 2 has a typo: print(flght_code).',
            'Correct the variable name in print() so it matches flight_code exactly.',
            'Run your code and verify that "AZ-410" appears in the console output.'
          ],
          starterCode: 'flight_code = "AZ-410"\nprint(flght_code)\n',
          solutionCode: 'flight_code = "AZ-410"\nprint(flight_code)\n',
          hints: [
            {
              id: 'h-1-6-1',
              level: 1,
              title: 'Find the missing letter',
              text: 'Compare the spelling on line 1 (flight_code) with line 2 (flght_code). Line 2 is missing the letter "i".',
              content:
                'Compare the spelling on line 1 (flight_code) with line 2 (flght_code). Line 2 is missing the letter "i".'
            },
            {
              id: 'h-1-6-2',
              level: 2,
              title: 'Correct code',
              text: 'flight_code = "AZ-410"\nprint(flight_code)',
              content: 'flight_code = "AZ-410"\nprint(flight_code)'
            }
          ],
          testCases: [
            {
              id: 'tc-1-6-1',
              description: 'Fixes typo and successfully outputs AZ-410',
              type: 'state_and_stdout',
              expectedStdout: 'AZ-410',
              expectedVariables: {
                flight_code: { value: 'AZ-410', type: 'str' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'flight_code',
                  message: "Make sure you have defined 'flight_code'."
                }
              ]
            },
            {
              id: 'tc-1-6-2',
              description: 'Verifies flight_code variable holds string "AZ-410"',
              type: 'state_and_stdout',
              expectedStdout: 'AZ-410',
              expectedVariables: {
                flight_code: { value: 'AZ-410', type: 'str' }
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
          heading: 'Debugging NameErrors',
          paragraphs: [
            'Python raises a NameError when referencing a variable that does not exist.',
            'Check for typos, missing letters, or casing mismatches.'
          ]
        }
      ],
      taskObjective:
        'Fix the typo in the starter code so that the flight code "AZ-410" is printed successfully.',
      taskInstructions: [
        'Look at the starter code below: notice flight_code is defined on line 1, but line 2 has a typo: print(flght_code).',
        'Correct the variable name in print() so it matches flight_code exactly.',
        'Run your code and verify that "AZ-410" appears in the console output.'
      ],
      hints: [
        {
          id: 'h-1-6-1',
          level: 1,
          title: 'Find the missing letter',
          text: 'Compare the spelling on line 1 (flight_code) with line 2 (flght_code). Line 2 is missing the letter "i".',
          content:
            'Compare the spelling on line 1 (flight_code) with line 2 (flght_code). Line 2 is missing the letter "i".'
        },
        {
          id: 'h-1-6-2',
          level: 2,
          title: 'Correct code',
          text: 'flight_code = "AZ-410"\nprint(flight_code)',
          content: 'flight_code = "AZ-410"\nprint(flight_code)'
        }
      ],
      starterCode: 'flight_code = "AZ-410"\nprint(flght_code)\n',
      solutionCode: 'flight_code = "AZ-410"\nprint(flight_code)\n',
      expectedOutput: 'AZ-410',
      testCases: [
        {
          id: 'tc-1-6-1',
          description: 'Fixes typo and successfully outputs AZ-410',
          type: 'state_and_stdout',
          expectedStdout: 'AZ-410',
          expectedVariables: {
            flight_code: { value: 'AZ-410', type: 'str' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'flight_code',
              message: "Make sure you have defined 'flight_code'."
            }
          ]
        },
        {
          id: 'tc-1-6-2',
          description: 'Verifies flight_code variable holds string "AZ-410"',
          type: 'state_and_stdout',
          expectedStdout: 'AZ-410',
          expectedVariables: {
            flight_code: { value: 'AZ-410', type: 'str' }
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
    // Lesson 1.7: Make a player card (Recap)
    // -------------------------------------------------------------------------
    {
      id: 'lesson-1-7',
      chapterId: 'ch-1',
      chapterTitle: 'Getting Started with Python',
      lessonNumber: '1.7',
      title: 'Make a pilot badge',
      difficulty: 'Beginner',
      category: 'recap',
      duration: '5 mins',
      durationMinutes: 5,
      xp: 50,
      status: 'locked',
      steps: [
        {
          id: 'l1-7-step-explanation',
          type: 'explanation',
          title: 'Chapter 1 Recap: Putting It All Together',
          content: `Congratulations on making it to the final milestone of Chapter 1!

Let's review everything you've learned so far:
- **Calling \`print()\`:** Displaying text and values to the console.
- **String literals:** Text wrapped in quotation marks (\`"Zara"\`).
- **Integer literals:** Whole numbers without quotes (\`1\`).
- **Variables:** Giving values names using the assignment operator (\`=\`).
- **Sequential execution:** Statements execute top-to-bottom, each \`print()\` appearing on its own line.

For example, a space cadet badge might define \`cadet = "Zara"\` and \`rank = 1\`.
Now, you will build a cyberpunk pilot badge with minimal starter scaffolding!`
        },
        {
          id: 'l1-7-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check: Multi-Variable Output Order',
          question: 'What will the following code output to the console?',
          codeSnippet: 'student = "Eli"\nid_num = 104\nprint(student)\nprint(id_num)',
          options: [
            {
              id: 'opt-recap-correct',
              text: 'Eli\n104',
              isCorrect: true,
              explanation:
                'Correct! Python prints the value of student on line 1, followed by the value of id_num on line 2.'
            },
            {
              id: 'opt-recap-single',
              text: 'Eli 104',
              isCorrect: false,
              explanation:
                'Incorrect: Separate print() calls output on separate lines, not a single line.'
            },
            {
              id: 'opt-recap-quotes',
              text: '"Eli"\n104',
              isCorrect: false,
              explanation:
                'Incorrect: Quotation marks are never printed in stdout for string variables.'
            },
            {
              id: 'opt-recap-names',
              text: 'student\nid_num',
              isCorrect: false,
              explanation:
                'Incorrect: Passing variable names without quotes outputs their stored values, not their identifiers.'
            }
          ]
        },
        {
          id: 'l1-7-step-code-task',
          type: 'code_task',
          title: 'Recap Challenge: Pilot Badge',
          objective:
            'Create a pilot badge by setting pilot_callsign to "Viper", shields to 100, and printing both on separate lines.',
          instructions: [
            'Create a variable named pilot_callsign and assign it the string "Viper".',
            'Create a variable named shields and assign it the integer 100.',
            'Print pilot_callsign on the first line.',
            'Print shields on the second line.'
          ],
          starterCode: '# Create pilot_callsign and shields, then print both on separate lines\n',
          solutionCode:
            'pilot_callsign = "Viper"\nshields = 100\nprint(pilot_callsign)\nprint(shields)\n',
          hints: [
            {
              id: 'h-1-7-1',
              level: 1,
              title: 'Remember quotes for strings',
              text: 'pilot_callsign = "Viper" needs quotes, but shields = 100 does not need quotes.',
              content:
                'pilot_callsign = "Viper" needs quotes, but shields = 100 does not need quotes.'
            },
            {
              id: 'h-1-7-2',
              level: 2,
              title: 'Four total lines of code',
              text: 'pilot_callsign = "Viper"\nshields = 100\nprint(pilot_callsign)\nprint(shields)',
              content:
                'pilot_callsign = "Viper"\nshields = 100\nprint(pilot_callsign)\nprint(shields)'
            }
          ],
          testCases: [
            {
              id: 'tc-1-7-1',
              description:
                'Stores pilot_callsign="Viper", shields=100 and outputs "Viper" and "100" on separate lines',
              type: 'state_and_stdout',
              expectedStdout: 'Viper\n100',
              expectedVariables: {
                pilot_callsign: { value: 'Viper', type: 'str' },
                shields: { value: 100, type: 'int' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'pilot_callsign',
                  message: "Make sure you create and assign the 'pilot_callsign' variable."
                },
                {
                  type: 'variable_assigned',
                  target: 'shields',
                  message: "Make sure you create and assign the 'shields' variable."
                }
              ]
            },
            {
              id: 'tc-1-7-2',
              description: 'Verifies data types and sequential line outputs for pilot badge',
              type: 'state_and_stdout',
              expectedStdout: 'Viper\n100',
              expectedVariables: {
                pilot_callsign: { value: 'Viper', type: 'str' },
                shields: { value: 100, type: 'int' }
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
          heading: 'Chapter 1 Final Recap',
          paragraphs: [
            'Combine strings, integers, and sequential printing to build program output.',
            'Always match variable names and quote rules.'
          ]
        }
      ],
      taskObjective:
        'Create a pilot badge by setting pilot_callsign to "Viper", shields to 100, and printing both on separate lines.',
      taskInstructions: [
        'Create a variable named pilot_callsign and assign it the string "Viper".',
        'Create a variable named shields and assign it the integer 100.',
        'Print pilot_callsign on the first line.',
        'Print shields on the second line.'
      ],
      hints: [
        {
          id: 'h-1-7-1',
          level: 1,
          title: 'Remember quotes for strings',
          text: 'pilot_callsign = "Viper" needs quotes, but shields = 100 does not need quotes.',
          content: 'pilot_callsign = "Viper" needs quotes, but shields = 100 does not need quotes.'
        },
        {
          id: 'h-1-7-2',
          level: 2,
          title: 'Four total lines of code',
          text: 'pilot_callsign = "Viper"\nshields = 100\nprint(pilot_callsign)\nprint(shields)',
          content: 'pilot_callsign = "Viper"\nshields = 100\nprint(pilot_callsign)\nprint(shields)'
        }
      ],
      starterCode: '# Create pilot_callsign and shields, then print both on separate lines\n',
      solutionCode:
        'pilot_callsign = "Viper"\nshields = 100\nprint(pilot_callsign)\nprint(shields)\n',
      expectedOutput: 'Viper\n100',
      testCases: [
        {
          id: 'tc-1-7-1',
          description:
            'Stores pilot_callsign="Viper", shields=100 and outputs "Viper" and "100" on separate lines',
          type: 'state_and_stdout',
          expectedStdout: 'Viper\n100',
          expectedVariables: {
            pilot_callsign: { value: 'Viper', type: 'str' },
            shields: { value: 100, type: 'int' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'pilot_callsign',
              message: "Make sure you create and assign the 'pilot_callsign' variable."
            },
            {
              type: 'variable_assigned',
              target: 'shields',
              message: "Make sure you create and assign the 'shields' variable."
            }
          ]
        },
        {
          id: 'tc-1-7-2',
          description: 'Verifies data types and sequential line outputs for pilot badge',
          type: 'state_and_stdout',
          expectedStdout: 'Viper\n100',
          expectedVariables: {
            pilot_callsign: { value: 'Viper', type: 'str' },
            shields: { value: 100, type: 'int' }
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
