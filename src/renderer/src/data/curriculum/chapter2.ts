import { Chapter } from '../../types/curriculum'

export const chapter2: Chapter = {
  id: 'ch-2',
  chapterNumber: 2,
  title: 'Chapter 2: Variables & Data Types',
  description:
    'Understand how computers remember information using variables, strings, numbers, booleans, and type conversions.',
  lessons: [
    // -------------------------------------------------------------------------
    // Lesson 2.1: Declaring Variables
    // -------------------------------------------------------------------------
    {
      id: 'lesson-2-1',
      chapterId: 'ch-2',
      chapterTitle: 'Variables & Data Types',
      lessonNumber: '2.1',
      title: 'Declaring Variables',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '7 mins',
      durationMinutes: 7,
      xp: 60,
      status: 'locked',
      steps: [
        {
          id: 'l2-1-step-explanation',
          type: 'explanation',
          title: 'What are Variables?',
          content: `Variables are labeled containers used to store data in the computer's memory so you can use and modify it throughout your program.

In Python, you create a variable by giving it a name, typing an equals sign (\`=\`), and providing the value. You don't need to declare types ahead of time; Python figures out the type automatically.

### Naming Conventions (\`snake_case\`)
Python convention uses \`snake_case\` for variable names: all lowercase letters with words separated by underscores (e.g. \`character_name\`, \`player_score\`).

Key naming rules:
1. Cannot begin with numbers (e.g. \`1st_player\` is invalid).
2. Cannot contain spaces or special symbols like \`$\` or \`-\`.`
        },
        {
          id: 'l2-1-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Hero Inventory',
          description:
            'Observe how a character name and gold count are stored in variables and printed together.',
          code: 'hero_name = "Kael"\ngold = 150\nprint(hero_name, gold)',
          expectedStdout: 'Kael 150',
          explanation:
            'Python assigns "Kael" as a string to hero_name, and 150 as an integer to gold. Passing multiple arguments separated by commas to print() outputs them on a single line separated by a space.'
        },
        {
          id: 'l2-1-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Predict the Output',
          question: 'What will the following code output to the console?',
          codeSnippet: 'probe_name = "Voyager"\ndistance_au = 150\nprint(probe_name, distance_au)',
          options: [
            {
              id: 'opt-2-1-correct',
              text: 'Voyager 150',
              isCorrect: true,
              explanation:
                'Correct! print() replaces each variable with its stored value and separates them with a space.'
            },
            {
              id: 'opt-2-1-quotes',
              text: '"Voyager" 150',
              isCorrect: false,
              explanation: 'Incorrect: String variables output their text without enclosing quotes.'
            },
            {
              id: 'opt-2-1-names',
              text: 'probe_name distance_au',
              isCorrect: false,
              explanation:
                'Incorrect: Passing variables without quotes outputs their stored contents, not their variable names.'
            },
            {
              id: 'opt-2-1-lines',
              text: 'Voyager\n150',
              isCorrect: false,
              explanation:
                'Incorrect: A single print() call with commas prints values on the same line, not separate lines.'
            }
          ]
        },
        {
          id: 'l2-1-step-true-false',
          type: 'true_false',
          title: 'Concept Check 2: Variable Naming Rules',
          statement:
            'In Python, variable names can start with a number, such as 1st_player = "Alex".',
          correctAnswer: false,
          explanation:
            'Correct! Variable names cannot begin with a digit. They must start with a letter or an underscore.'
        },
        {
          id: 'l2-1-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Character Profile',
          objective:
            'Declare two variables: character_name set to the string "Arthur", and level set to the integer 42. Print both variables separated by a space.',
          instructions: [
            'Declare a variable named character_name and assign it the string "Arthur".',
            'Declare a variable named level and assign it the integer 42.',
            'Print both variables using print(character_name, level).'
          ],
          starterCode:
            '# Declare character_name and level below\n\n\n# Print both variables to the console below\n',
          solutionCode: 'character_name = "Arthur"\nlevel = 42\nprint(character_name, level)\n',
          hints: [
            {
              id: 'h-2-1-1',
              level: 1,
              title: 'Quotes difference',
              text: 'Remember: strings like "Arthur" need quotes, while whole numbers like 42 do not.',
              content:
                'Remember: strings like "Arthur" need quotes, while whole numbers like 42 do not.'
            },
            {
              id: 'h-2-1-2',
              level: 2,
              title: 'Variable assignment syntax',
              text: 'character_name = "Arthur"\nlevel = 42\nprint(character_name, level)',
              content: 'character_name = "Arthur"\nlevel = 42\nprint(character_name, level)'
            }
          ],
          testCases: [
            {
              id: 'tc-2-1-1',
              description: 'Declares character_name="Arthur", level=42 and outputs "Arthur 42"',
              type: 'state_and_stdout',
              expectedStdout: 'Arthur 42',
              expectedVariables: {
                character_name: { value: 'Arthur', type: 'str' },
                level: { value: 42, type: 'int' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'character_name',
                  message: "Make sure you declare the 'character_name' variable."
                },
                {
                  type: 'variable_assigned',
                  target: 'level',
                  message: "Make sure you declare the 'level' variable."
                }
              ]
            },
            {
              id: 'tc-2-1-2',
              description: 'Strict type validation for character_name (str) and level (int)',
              type: 'state_and_stdout',
              expectedStdout: 'Arthur 42',
              expectedVariables: {
                character_name: { value: 'Arthur', type: 'str' },
                level: { value: 42, type: 'int' }
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
          heading: 'What are Variables?',
          paragraphs: [
            "Variables are labeled containers used to store data in the computer's memory so you can use and modify it throughout your program.",
            "In Python, you create a variable by giving it a name, typing an equals sign (=), and providing the value. You don't need to declare types ahead of time; Python figures out the type automatically."
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'hero_name = "Kael"\ngold = 150\nprint(hero_name, gold)',
              caption: 'Assigning a string to hero_name and an integer to gold.'
            }
          ]
        },
        {
          heading: 'Naming Conventions (snake_case)',
          paragraphs: [
            'Python convention uses snake_case for variable names: all lowercase letters with words separated by underscores (e.g. character_name, level).',
            'Variable names cannot begin with numbers or contain spaces or special symbols.'
          ]
        }
      ],
      taskObjective:
        'Declare two variables: character_name set to the string "Arthur", and level set to the integer 42. Print both variables separated by a space.',
      taskInstructions: [
        'Declare a variable named character_name and assign it the string "Arthur".',
        'Declare a variable named level and assign it the integer 42.',
        'Print both variables using print(character_name, level).'
      ],
      hints: [
        {
          id: 'h-2-1-1',
          level: 1,
          title: 'Quotes difference',
          text: 'Remember: strings like "Arthur" need quotes, while whole numbers like 42 do not.',
          content:
            'Remember: strings like "Arthur" need quotes, while whole numbers like 42 do not.'
        },
        {
          id: 'h-2-1-2',
          level: 2,
          title: 'Variable assignment syntax',
          text: 'character_name = "Arthur"\nlevel = 42\nprint(character_name, level)',
          content: 'character_name = "Arthur"\nlevel = 42\nprint(character_name, level)'
        }
      ],
      starterCode:
        '# Declare character_name and level below\n\n\n# Print both variables to the console below\n',
      solutionCode: 'character_name = "Arthur"\nlevel = 42\nprint(character_name, level)\n',
      expectedOutput: 'Arthur 42',
      testCases: [
        {
          id: 'tc-2-1-1',
          description: 'Declares character_name="Arthur", level=42 and outputs "Arthur 42"',
          type: 'state_and_stdout',
          expectedStdout: 'Arthur 42',
          expectedVariables: {
            character_name: { value: 'Arthur', type: 'str' },
            level: { value: 42, type: 'int' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'character_name',
              message: "Make sure you declare the 'character_name' variable."
            },
            {
              type: 'variable_assigned',
              target: 'level',
              message: "Make sure you declare the 'level' variable."
            }
          ]
        },
        {
          id: 'tc-2-1-2',
          description: 'Strict type validation for character_name (str) and level (int)',
          type: 'state_and_stdout',
          expectedStdout: 'Arthur 42',
          expectedVariables: {
            character_name: { value: 'Arthur', type: 'str' },
            level: { value: 42, type: 'int' }
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
    // Lesson 2.2: Floating Point Numbers
    // -------------------------------------------------------------------------
    {
      id: 'lesson-2-2',
      chapterId: 'ch-2',
      chapterTitle: 'Variables & Data Types',
      lessonNumber: '2.2',
      title: 'Floating Point Numbers',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '7 mins',
      durationMinutes: 7,
      xp: 60,
      status: 'locked',
      steps: [
        {
          id: 'l2-2-step-explanation',
          type: 'explanation',
          title: 'Decimals in Python (float)',
          content: `Numbers with decimal points are called **floating point numbers**, or **floats**. Examples include \`3.14\`, \`0.08\`, and \`19.99\`.

- **Integers (\`int\`):** Represent discrete whole quantities (such as item counts, levels, or years).
- **Floats (\`float\`):** Represent continuous measurements (such as prices, temperatures, weights, or rates).`
        },
        {
          id: 'l2-2-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Coffee Shop Pricing',
          description: 'Observe how decimal prices and tax rates are stored as float numbers.',
          code: 'latte_price = 4.75\nsales_tax = 0.07\nprint(latte_price, sales_tax)',
          expectedStdout: '4.75 0.07',
          explanation:
            'Both 4.75 and 0.07 are floating point numbers. Python stores them without quotes and prints both separated by a space.'
        },
        {
          id: 'l2-2-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Rainfall Gauge Output',
          question: 'What will the following code output to the console?',
          codeSnippet: 'rainfall_inches = 1.25\nprint(rainfall_inches)',
          options: [
            {
              id: 'opt-2-2-correct',
              text: '1.25',
              isCorrect: true,
              explanation:
                'Correct! Python prints the decimal number 1.25 directly to standard output.'
            },
            {
              id: 'opt-2-2-round',
              text: '1',
              isCorrect: false,
              explanation:
                'Incorrect: Floats preserve their fractional decimal component; Python does not round down unless floor division or int() is explicitly called.'
            },
            {
              id: 'opt-2-2-quotes',
              text: '"1.25"',
              isCorrect: false,
              explanation: 'Incorrect: Numbers are never printed with quotation marks.'
            },
            {
              id: 'opt-2-2-var',
              text: 'rainfall_inches',
              isCorrect: false,
              explanation:
                'Incorrect: Passing the variable name outputs the value stored in that variable.'
            }
          ]
        },
        {
          id: 'l2-2-step-true-false',
          type: 'true_false',
          title: 'Concept Check 2: Float vs Integer',
          statement:
            'In Python, the number 5.0 is considered an integer because its decimal part is zero.',
          correctAnswer: false,
          explanation:
            'Correct! Any number containing a decimal point is represented as a float in Python, even if the fractional part is .0.'
        },
        {
          id: 'l2-2-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Fitness Tracker Measurements',
          objective:
            'Declare two float variables: distance_miles set to 6.22, and pace_minutes set to 8.45. Print both variables using print(distance_miles, pace_minutes).',
          instructions: [
            'Assign the float 6.22 to the variable distance_miles.',
            'Assign the float 8.45 to the variable pace_minutes.',
            'Print both variables using print(distance_miles, pace_minutes).'
          ],
          starterCode:
            '# Declare distance_miles and pace_minutes as floats below, then print both:\n',
          solutionCode:
            'distance_miles = 6.22\npace_minutes = 8.45\nprint(distance_miles, pace_minutes)\n',
          hints: [
            {
              id: 'h-2-2-1',
              level: 1,
              title: 'Decimal numbers',
              text: 'Do not wrap decimal numbers in quotation marks (write 6.22 and 8.45 directly).',
              content:
                'Do not wrap decimal numbers in quotation marks (write 6.22 and 8.45 directly).'
            },
            {
              id: 'h-2-2-2',
              level: 2,
              title: 'Declaration skeleton',
              text: 'distance_miles = 6.22\npace_minutes = 8.45\nprint(distance_miles, pace_minutes)',
              content:
                'distance_miles = 6.22\npace_minutes = 8.45\nprint(distance_miles, pace_minutes)'
            }
          ],
          testCases: [
            {
              id: 'tc-2-2-1',
              description:
                'Declares distance_miles=6.22 and pace_minutes=8.45, outputs "6.22 8.45"',
              type: 'state_and_stdout',
              expectedStdout: '6.22 8.45',
              expectedVariables: {
                distance_miles: { value: 6.22, type: 'float' },
                pace_minutes: { value: 8.45, type: 'float' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'distance_miles',
                  message: "Make sure you declare 'distance_miles'."
                },
                {
                  type: 'variable_assigned',
                  target: 'pace_minutes',
                  message: "Make sure you declare 'pace_minutes'."
                }
              ]
            },
            {
              id: 'tc-2-2-2',
              description: 'Strict type check confirming both values are floating-point types',
              type: 'state_and_stdout',
              expectedStdout: '6.22 8.45',
              expectedVariables: {
                distance_miles: { value: 6.22, type: 'float' },
                pace_minutes: { value: 8.45, type: 'float' }
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
          heading: 'Decimals in Python (float)',
          paragraphs: [
            'Numbers with decimal points are called floating point numbers, or floats. Examples include 3.14, 0.08, and 19.99.',
            'Integers (int) represent whole quantities (like count or level), while floats represent continuous measurements (like prices, temperatures, or percentages).'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'latte_price = 4.75\nsales_tax = 0.07\nprint(latte_price, sales_tax)',
              caption: 'Decimal numbers in Python are represented as floats.'
            }
          ]
        }
      ],
      taskObjective:
        'Declare two float variables: distance_miles set to 6.22, and pace_minutes set to 8.45. Print both variables using print(distance_miles, pace_minutes).',
      taskInstructions: [
        'Assign 6.22 to the variable distance_miles.',
        'Assign 8.45 to the variable pace_minutes.',
        'Print both variables using print(distance_miles, pace_minutes).'
      ],
      hints: [
        {
          id: 'h-2-2-1',
          level: 1,
          title: 'Decimal numbers',
          text: 'Do not wrap decimal numbers in quotation marks.',
          content: 'Do not wrap decimal numbers in quotation marks.'
        },
        {
          id: 'h-2-2-2',
          level: 2,
          title: 'Declaration skeleton',
          text: 'distance_miles = 6.22\npace_minutes = 8.45\nprint(distance_miles, pace_minutes)',
          content: 'distance_miles = 6.22\npace_minutes = 8.45\nprint(distance_miles, pace_minutes)'
        }
      ],
      starterCode: '# Declare distance_miles and pace_minutes as floats below, then print both:\n',
      solutionCode:
        'distance_miles = 6.22\npace_minutes = 8.45\nprint(distance_miles, pace_minutes)\n',
      expectedOutput: '6.22 8.45',
      testCases: [
        {
          id: 'tc-2-2-1',
          description: 'Declares distance_miles=6.22 and pace_minutes=8.45, outputs "6.22 8.45"',
          type: 'state_and_stdout',
          expectedStdout: '6.22 8.45',
          expectedVariables: {
            distance_miles: { value: 6.22, type: 'float' },
            pace_minutes: { value: 8.45, type: 'float' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'distance_miles',
              message: "Make sure you declare 'distance_miles'."
            },
            {
              type: 'variable_assigned',
              target: 'pace_minutes',
              message: "Make sure you declare 'pace_minutes'."
            }
          ]
        },
        {
          id: 'tc-2-2-2',
          description: 'Strict type check confirming both values are floating-point types',
          type: 'state_and_stdout',
          expectedStdout: '6.22 8.45',
          expectedVariables: {
            distance_miles: { value: 6.22, type: 'float' },
            pace_minutes: { value: 8.45, type: 'float' }
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
    // Lesson 2.3: Booleans
    // -------------------------------------------------------------------------
    {
      id: 'lesson-2-3',
      chapterId: 'ch-2',
      chapterTitle: 'Variables & Data Types',
      lessonNumber: '2.3',
      title: 'Booleans',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '6 mins',
      durationMinutes: 6,
      xp: 60,
      status: 'locked',
      steps: [
        {
          id: 'l2-3-step-explanation',
          type: 'explanation',
          title: 'Boolean Logic in Python (bool)',
          content: `Booleans represent one of two logical states: \`True\` or \`False\`. They are named after mathematician George Boole and form the foundation of conditional decision-making in computing.

In Python, boolean keywords must always start with an uppercase letter: **\`True\`** and **\`False\`**. Writing \`true\` or \`false\` produces a \`NameError\`.`
        },
        {
          id: 'l2-3-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Network Connection Status',
          description: 'Observe how boolean flags represent connection and firewall states.',
          code: 'is_connected = True\nfirewall_active = False\nprint(is_connected, firewall_active)',
          expectedStdout: 'True False',
          explanation:
            'is_connected holds True and firewall_active holds False. Notice that neither value uses quotation marks.'
        },
        {
          id: 'l2-3-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Smart Lock State',
          question: 'What will the following code output to the console?',
          codeSnippet: 'door_locked = True\nprint("Locked?", door_locked)',
          options: [
            {
              id: 'opt-2-3-correct',
              text: 'Locked? True',
              isCorrect: true,
              explanation:
                'Correct! The text label and the boolean value are printed on the same line separated by a space.'
            },
            {
              id: 'opt-2-3-lower',
              text: 'Locked? true',
              isCorrect: false,
              explanation: 'Incorrect: Python booleans are capitalized as True in output.'
            },
            {
              id: 'opt-2-3-quotes',
              text: 'Locked? "True"',
              isCorrect: false,
              explanation: 'Incorrect: Booleans are values, not strings, so no quotes appear.'
            },
            {
              id: 'opt-2-3-err',
              text: 'Error',
              isCorrect: false,
              explanation:
                'Incorrect: Combining strings and booleans in print() with a comma is completely valid.'
            }
          ]
        },
        {
          id: 'l2-3-step-identify-error',
          type: 'identify_error',
          title: 'Concept Check 2: Boolean Capitalization',
          question: 'Why will the following code raise a NameError in Python?',
          codeSnippet: 'motion_detected = true\nprint(motion_detected)',
          options: [
            {
              id: 'opt-2-3-err-correct',
              text: 'true is written in lowercase; Python requires capitalized True',
              isCorrect: true,
              explanation:
                'Correct! In Python, True and False must always be capitalized. Lowercase true is treated as an undefined variable name.'
            },
            {
              id: 'opt-2-3-err-quotes',
              text: 'true requires double quotation marks around it',
              isCorrect: false,
              explanation:
                'Incorrect: Putting quotes around "true" would create a string, not a boolean.'
            },
            {
              id: 'opt-2-3-err-semi',
              text: 'Missing semicolon at the end of the line',
              isCorrect: false,
              explanation: 'Incorrect: Python does not use semicolons to terminate statements.'
            },
            {
              id: 'opt-2-3-err-print',
              text: 'print() cannot print boolean variables',
              isCorrect: false,
              explanation: 'Incorrect: print() can output boolean variables directly.'
            }
          ]
        },
        {
          id: 'l2-3-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Quest Completion Tracker',
          objective:
            'Create two boolean variables: quest_completed set to True, and boss_defeated set to False. Print both variables using print(quest_completed, boss_defeated).',
          instructions: [
            'Declare quest_completed = True (capital T, no quotes).',
            'Declare boss_defeated = False (capital F, no quotes).',
            'Print both boolean variables with print(quest_completed, boss_defeated).'
          ],
          starterCode:
            '# Declare boolean variables quest_completed and boss_defeated below, then print both:\n',
          solutionCode:
            'quest_completed = True\nboss_defeated = False\nprint(quest_completed, boss_defeated)\n',
          hints: [
            {
              id: 'h-2-3-1',
              level: 1,
              title: 'Capitalization reminder',
              text: 'Python requires True and False with a capital T and F.',
              content: 'Python requires True and False with a capital T and F.'
            },
            {
              id: 'h-2-3-2',
              level: 2,
              title: 'Code example',
              text: 'quest_completed = True\nboss_defeated = False\nprint(quest_completed, boss_defeated)',
              content:
                'quest_completed = True\nboss_defeated = False\nprint(quest_completed, boss_defeated)'
            }
          ],
          testCases: [
            {
              id: 'tc-2-3-1',
              description:
                'Declares quest_completed=True, boss_defeated=False and prints "True False"',
              type: 'state_and_stdout',
              expectedStdout: 'True False',
              expectedVariables: {
                quest_completed: { value: true, type: 'bool' },
                boss_defeated: { value: false, type: 'bool' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'quest_completed',
                  message: "Make sure you declare 'quest_completed'."
                },
                {
                  type: 'variable_assigned',
                  target: 'boss_defeated',
                  message: "Make sure you declare 'boss_defeated'."
                }
              ]
            },
            {
              id: 'tc-2-3-2',
              description: 'Ensures values are boolean types and not strings "True" / "False"',
              type: 'state_and_stdout',
              expectedStdout: 'True False',
              expectedVariables: {
                quest_completed: { value: true, type: 'bool' },
                boss_defeated: { value: false, type: 'bool' }
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
          heading: 'Boolean Logic in Python (bool)',
          paragraphs: [
            'Booleans represent one of two logical states: True or False. They are named after mathematician George Boole and form the foundation of conditional decision-making in computing.',
            'In Python, boolean keywords must always start with an uppercase letter: True and False. Writing true or false will produce an error.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'is_connected = True\nfirewall_active = False\nprint(is_connected, firewall_active)',
              caption: 'Booleans are written without quotes with capitalized initial letter.'
            }
          ]
        }
      ],
      taskObjective:
        'Create two boolean variables: quest_completed set to True, and boss_defeated set to False. Print both variables using print(quest_completed, boss_defeated).',
      taskInstructions: [
        'Declare quest_completed = True (capital T, no quotes).',
        'Declare boss_defeated = False (capital F, no quotes).',
        'Print both boolean variables with print(quest_completed, boss_defeated).'
      ],
      hints: [
        {
          id: 'h-2-3-1',
          level: 1,
          title: 'Capitalization reminder',
          text: 'Python requires True and False with a capital T and F.',
          content: 'Python requires True and False with a capital T and F.'
        },
        {
          id: 'h-2-3-2',
          level: 2,
          title: 'Code example',
          text: 'quest_completed = True\nboss_defeated = False\nprint(quest_completed, boss_defeated)',
          content:
            'quest_completed = True\nboss_defeated = False\nprint(quest_completed, boss_defeated)'
        }
      ],
      starterCode:
        '# Declare boolean variables quest_completed and boss_defeated below, then print both:\n',
      solutionCode:
        'quest_completed = True\nboss_defeated = False\nprint(quest_completed, boss_defeated)\n',
      expectedOutput: 'True False',
      testCases: [
        {
          id: 'tc-2-3-1',
          description: 'Declares quest_completed=True, boss_defeated=False and prints "True False"',
          type: 'state_and_stdout',
          expectedStdout: 'True False',
          expectedVariables: {
            quest_completed: { value: true, type: 'bool' },
            boss_defeated: { value: false, type: 'bool' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'quest_completed',
              message: "Make sure you declare 'quest_completed'."
            },
            {
              type: 'variable_assigned',
              target: 'boss_defeated',
              message: "Make sure you declare 'boss_defeated'."
            }
          ]
        },
        {
          id: 'tc-2-3-2',
          description: 'Ensures values are boolean types and not strings "True" / "False"',
          type: 'state_and_stdout',
          expectedStdout: 'True False',
          expectedVariables: {
            quest_completed: { value: true, type: 'bool' },
            boss_defeated: { value: false, type: 'bool' }
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
    // Lesson 2.4: Type Conversion
    // -------------------------------------------------------------------------
    {
      id: 'lesson-2-4',
      chapterId: 'ch-2',
      chapterTitle: 'Variables & Data Types',
      lessonNumber: '2.4',
      title: 'Type Conversion',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '8 mins',
      durationMinutes: 8,
      xp: 70,
      status: 'locked',
      steps: [
        {
          id: 'l2-4-step-explanation',
          type: 'explanation',
          title: 'Converting Between Data Types',
          content: `Often, data arrives as text (for example from user keyboard input or files), but you need to perform calculations with it.

Attempting to do math on a string like \`"18" + 1\` causes a \`TypeError\` because Python cannot add numbers to text.

Python provides built-in type conversion functions:
- **\`int()\`**: Converts valid numeric text to an integer (e.g. \`int("42")\` gives \`42\`).
- **\`float()\`**: Converts text or integers to decimal numbers (e.g. \`float("3.14")\` gives \`3.14\`).
- **\`str()\`**: Converts any value into a text string (e.g. \`str(100)\` gives \`"100"\`).`
        },
        {
          id: 'l2-4-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Concert Ticket Calculation',
          description: 'Observe how a string of digits is converted to an integer for addition.',
          code: 'tickets_str = "4"\ntickets = int(tickets_str)\nprint(tickets + 2)',
          expectedStdout: '6',
          explanation:
            'int("4") converts the string "4" into the integer 4, allowing Python to perform arithmetic (4 + 2 = 6).'
        },
        {
          id: 'l2-4-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Baggage Weight Check',
          question: 'What will the following code output to the console?',
          codeSnippet: 'weight_str = "50"\nweight = int(weight_str)\nprint(weight - 5)',
          options: [
            {
              id: 'opt-2-4-correct',
              text: '45',
              isCorrect: true,
              explanation: 'Correct! int("50") produces the number 50, and 50 - 5 equals 45.'
            },
            {
              id: 'opt-2-4-concat',
              text: '50-5',
              isCorrect: false,
              explanation:
                'Incorrect: weight is an integer, so the subtraction operator performs mathematical subtraction.'
            },
            {
              id: 'opt-2-4-quotes',
              text: '"45"',
              isCorrect: false,
              explanation: 'Incorrect: Numeric math results are output without quotation marks.'
            },
            {
              id: 'opt-2-4-err',
              text: 'TypeError',
              isCorrect: false,
              explanation:
                'Incorrect: Because weight_str was converted to an int with int(), subtracting 5 is completely valid.'
            }
          ]
        },
        {
          id: 'l2-4-step-fill-blank',
          type: 'fill_blank',
          title: 'Concept Check 2: Convert to Integer',
          prompt: 'Fill in the blank to convert the string code_str to an integer:',
          codeTemplate: 'code_str = "100"\ncode_num = {{blank}}(code_str)',
          acceptedAnswers: ['int'],
          explanation:
            'The int() function converts numeric strings into integer numbers in Python.',
          hint: 'The function name is int.'
        },
        {
          id: 'l2-4-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Race Bib Number Calculation',
          objective:
            'Given bib_str = "420", convert it to an integer named bib_number using int(), then print bib_number + 10.',
          instructions: [
            'Start with the provided bib_str = "420".',
            'Convert bib_str to an integer using int(bib_str) and store it in bib_number.',
            'Print bib_number + 10 to the console (evaluates to 430).'
          ],
          starterCode:
            'bib_str = "420"\n\n# Convert bib_str to an integer named bib_number and print bib_number + 10\n',
          solutionCode: 'bib_str = "420"\nbib_number = int(bib_str)\nprint(bib_number + 10)\n',
          hints: [
            {
              id: 'h-2-4-1',
              level: 1,
              title: 'Conversion function',
              text: 'Use the int() constructor: bib_number = int(bib_str)',
              content: 'Use the int() constructor: bib_number = int(bib_str)'
            },
            {
              id: 'h-2-4-2',
              level: 2,
              title: 'Full solution',
              text: 'bib_str = "420"\nbib_number = int(bib_str)\nprint(bib_number + 10)',
              content: 'bib_str = "420"\nbib_number = int(bib_str)\nprint(bib_number + 10)'
            }
          ],
          testCases: [
            {
              id: 'tc-2-4-1',
              description: 'Converts bib_str to integer bib_number (420) and outputs 430',
              type: 'state_and_stdout',
              expectedStdout: '430',
              expectedVariables: {
                bib_number: { value: 420, type: 'int' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'bib_number',
                  message: "Make sure you create and assign the 'bib_number' variable."
                }
              ]
            },
            {
              id: 'tc-2-4-2',
              description: 'Verifies bib_number is of type int and arithmetic succeeded',
              type: 'state_and_stdout',
              expectedStdout: '430',
              expectedVariables: {
                bib_number: { value: 420, type: 'int' }
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
          heading: 'Converting Between Data Types',
          paragraphs: [
            'Often, data arrives as text (for example from user keyboard input or files), but you need to perform calculations with it.',
            'Attempting to do math on a string like "18" + 1 causes a TypeError because Python cannot add numbers to text.',
            'Python provides type conversion functions: int() to convert to integer, float() to convert to decimal, and str() to convert any value into a string.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'tickets_str = "4"\ntickets = int(tickets_str)\nprint(tickets + 2)  # Outputs: 6',
              caption: 'int() converts string "4" into integer 4.'
            }
          ]
        }
      ],
      taskObjective:
        'Given bib_str = "420", convert it to an integer named bib_number using int(), then print bib_number + 10.',
      taskInstructions: [
        'Start with the provided bib_str = "420".',
        'Convert bib_str to an integer using int(bib_str) and store it in bib_number.',
        'Print bib_number + 10 to the console (the output should be 430).'
      ],
      hints: [
        {
          id: 'h-2-4-1',
          level: 1,
          title: 'Conversion function',
          text: 'Use the int() constructor: bib_number = int(bib_str)',
          content: 'Use the int() constructor: bib_number = int(bib_str)'
        },
        {
          id: 'h-2-4-2',
          level: 2,
          title: 'Full solution',
          text: 'bib_str = "420"\nbib_number = int(bib_str)\nprint(bib_number + 10)',
          content: 'bib_str = "420"\nbib_number = int(bib_str)\nprint(bib_number + 10)'
        }
      ],
      starterCode:
        'bib_str = "420"\n\n# Convert bib_str to an integer named bib_number and print bib_number + 10\n',
      solutionCode: 'bib_str = "420"\nbib_number = int(bib_str)\nprint(bib_number + 10)\n',
      expectedOutput: '430',
      testCases: [
        {
          id: 'tc-2-4-1',
          description: 'Converts bib_str to integer bib_number (420) and outputs 430',
          type: 'state_and_stdout',
          expectedStdout: '430',
          expectedVariables: {
            bib_number: { value: 420, type: 'int' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'bib_number',
              message: "Make sure you create and assign the 'bib_number' variable."
            }
          ]
        },
        {
          id: 'tc-2-4-2',
          description: 'Verifies bib_number is of type int and arithmetic succeeded',
          type: 'state_and_stdout',
          expectedStdout: '430',
          expectedVariables: {
            bib_number: { value: 420, type: 'int' }
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
