import { Chapter } from '../../types/curriculum'

export const chapter4: Chapter = {
  id: 'ch-4',
  chapterNumber: 4,
  title: 'Chapter 4: Strings & Text Operations',
  description:
    'Learn powerful string formatting with f-strings, built-in string transformation methods, and sequence indexing & slicing.',
  lessons: [
    // -------------------------------------------------------------------------
    // Lesson 4.1: String Concatenation & F-Strings
    // -------------------------------------------------------------------------
    {
      id: 'lesson-4-1',
      chapterId: 'ch-4',
      chapterTitle: 'Strings & Text Operations',
      lessonNumber: '4.1',
      title: 'String Concatenation & F-Strings',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '8 mins',
      durationMinutes: 8,
      xp: 60,
      status: 'locked',
      steps: [
        {
          id: 'l4-1-step-explanation',
          type: 'explanation',
          title: 'Combining Strings & F-Strings',
          content: `In programming, joining strings together is called **concatenation**. In Python, you can concatenate strings with the \`+\` operator (e.g. \`"Hello" + " " + "World"\`).

However, modern Python introduced **f-strings** (formatted string literals), which are cleaner, faster, and much easier to read!

\`\`\`python
astronaut = "Neil"
planet = "Moon"
print(f"Commander: {astronaut} on {planet}")
\`\`\`

### Why F-Strings Are Powerful:
- Prefix the string with the letter **\`f\`** right before the quotation marks.
- Place variables or math expressions directly inside curly braces \`{}\`.
- Expressions inside braces are evaluated on the fly: \`f"Total: {10 + 5} coins"\` evaluates to \`"Total: 15 coins"\`.`
        },
        {
          id: 'l4-1-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Space Mission Log',
          description:
            'Observe how variables are interpolated cleanly into an output message using f-strings.',
          code: 'astronaut = "Neil"\nplanet = "Moon"\nprint(f"Commander: {astronaut} on {planet}")',
          expectedStdout: 'Commander: Neil on Moon',
          explanation:
            'Python replaces {astronaut} with "Neil" and {planet} with "Moon" seamlessly.'
        },
        {
          id: 'l4-1-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Clinic Room Assignment',
          question: 'What will the following code output to the console?',
          codeSnippet: 'doctor = "Watson"\nroom = 104\nprint(f"Dr. {doctor} - Room {room}")',
          options: [
            {
              id: 'opt-4-1-correct',
              text: 'Dr. Watson - Room 104',
              isCorrect: true,
              explanation:
                'Correct! The f-string dynamically inserts the values of doctor and room into the text template.'
            },
            {
              id: 'opt-4-1-literal',
              text: 'Dr. {doctor} - Room {room}',
              isCorrect: false,
              explanation:
                'Incorrect: Because the string is prefixed with "f", Python evaluates expressions inside curly braces.'
            },
            {
              id: 'opt-4-1-quotes',
              text: 'Dr. "Watson" - Room 104',
              isCorrect: false,
              explanation: 'Incorrect: Variable text values are injected without quotes.'
            },
            {
              id: 'opt-4-1-err',
              text: 'TypeError: cannot concatenate str and int',
              isCorrect: false,
              explanation:
                'Incorrect: F-strings automatically convert integers like 104 to text format without error.'
            }
          ]
        },
        {
          id: 'l4-1-step-fill-blank',
          type: 'fill_blank',
          title: 'Concept Check 2: The F-String Prefix',
          prompt:
            'Fill in the single letter needed directly before the quotation mark to make this a valid f-string:',
          codeTemplate: 'prefix = "Order"\ncode = 99\nlabel = {{blank}}"{prefix}-#{code}"',
          acceptedAnswers: ['f', 'F'],
          explanation:
            'Prefixing a string literal with f (or F) tells Python to treat curly braces as replacement fields.',
          hint: 'The prefix is the letter f.'
        },
        {
          id: 'l4-1-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Conference Speaker Badge',
          objective:
            'Combine first_name = "Grace" and last_name = "Hopper" into full_name using an f-string, then print f"Speaker: {full_name}".',
          instructions: [
            'Given first_name = "Grace" and last_name = "Hopper".',
            'Create a variable full_name and assign it f"{first_name} {last_name}".',
            'Print f"Speaker: {full_name}".'
          ],
          starterCode:
            'first_name = "Grace"\nlast_name = "Hopper"\n\n# Create full_name using an f-string and print the speaker label:\n',
          solutionCode:
            'first_name = "Grace"\nlast_name = "Hopper"\nfull_name = f"{first_name} {last_name}"\nprint(f"Speaker: {full_name}")\n',
          hints: [
            {
              id: 'h-4-1-1',
              level: 1,
              title: 'F-string template',
              text: 'Use the f"..." syntax: full_name = f"{first_name} {last_name}"',
              content: 'Use the f"..." syntax: full_name = f"{first_name} {last_name}"'
            },
            {
              id: 'h-4-1-2',
              level: 2,
              title: 'Complete solution',
              text: 'first_name = "Grace"\nlast_name = "Hopper"\nfull_name = f"{first_name} {last_name}"\nprint(f"Speaker: {full_name}")',
              content:
                'first_name = "Grace"\nlast_name = "Hopper"\nfull_name = f"{first_name} {last_name}"\nprint(f"Speaker: {full_name}")'
            }
          ],
          testCases: [
            {
              id: 'tc-4-1-1',
              description:
                'Variable full_name is "Grace Hopper" and outputs "Speaker: Grace Hopper"',
              type: 'state_and_stdout',
              expectedStdout: 'Speaker: Grace Hopper',
              expectedVariables: {
                full_name: { value: 'Grace Hopper', type: 'str' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'full_name',
                  message: "Make sure you create and assign the 'full_name' variable."
                }
              ]
            },
            {
              id: 'tc-4-1-2',
              description: 'Verifies single space between names and exact f-string formatting',
              type: 'state_and_stdout',
              expectedStdout: 'Speaker: Grace Hopper',
              expectedVariables: {
                full_name: { value: 'Grace Hopper', type: 'str' }
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
          heading: 'Combining Strings',
          paragraphs: [
            'In programming, joining strings together is called concatenation. In Python, you can concatenate strings with the + operator (e.g. "Grace" + " " + "Hopper").',
            'However, modern Python introduced f-strings (formatted string literals), which are cleaner, faster, and much easier to read.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'astronaut = "Neil"\nplanet = "Moon"\nprint(f"Commander: {astronaut} on {planet}")  # Commander: Neil on Moon',
              caption: 'Prefix strings with "f" and insert variables inside curly braces {}.'
            }
          ]
        }
      ],
      taskObjective:
        'Combine first_name = "Grace" and last_name = "Hopper" into full_name using an f-string, then print f"Speaker: {full_name}".',
      taskInstructions: [
        'Given first_name = "Grace" and last_name = "Hopper".',
        'Create a variable full_name and assign it f"{first_name} {last_name}".',
        'Print f"Speaker: {full_name}".'
      ],
      hints: [
        {
          id: 'h-4-1-1',
          level: 1,
          title: 'F-string template',
          text: 'Use the f"..." syntax: full_name = f"{first_name} {last_name}"',
          content: 'Use the f"..." syntax: full_name = f"{first_name} {last_name}"'
        },
        {
          id: 'h-4-1-2',
          level: 2,
          title: 'Complete solution',
          text: 'first_name = "Grace"\nlast_name = "Hopper"\nfull_name = f"{first_name} {last_name}"\nprint(f"Speaker: {full_name}")',
          content:
            'first_name = "Grace"\nlast_name = "Hopper"\nfull_name = f"{first_name} {last_name}"\nprint(f"Speaker: {full_name}")'
        }
      ],
      starterCode:
        'first_name = "Grace"\nlast_name = "Hopper"\n\n# Create full_name using an f-string and print the speaker label:\n',
      solutionCode:
        'first_name = "Grace"\nlast_name = "Hopper"\nfull_name = f"{first_name} {last_name}"\nprint(f"Speaker: {full_name}")\n',
      expectedOutput: 'Speaker: Grace Hopper',
      testCases: [
        {
          id: 'tc-4-1-1',
          description: 'Variable full_name is "Grace Hopper" and outputs "Speaker: Grace Hopper"',
          type: 'state_and_stdout',
          expectedStdout: 'Speaker: Grace Hopper',
          expectedVariables: {
            full_name: { value: 'Grace Hopper', type: 'str' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'full_name',
              message: "Make sure you create and assign the 'full_name' variable."
            }
          ]
        },
        {
          id: 'tc-4-1-2',
          description: 'Verifies single space between names and exact f-string formatting',
          type: 'state_and_stdout',
          expectedStdout: 'Speaker: Grace Hopper',
          expectedVariables: {
            full_name: { value: 'Grace Hopper', type: 'str' }
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
    // Lesson 4.2: String Methods
    // -------------------------------------------------------------------------
    {
      id: 'lesson-4-2',
      chapterId: 'ch-4',
      chapterTitle: 'Strings & Text Operations',
      lessonNumber: '4.2',
      title: 'String Methods',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '8 mins',
      durationMinutes: 8,
      xp: 65,
      status: 'locked',
      steps: [
        {
          id: 'l4-2-step-explanation',
          type: 'explanation',
          title: 'Built-in String Methods',
          content: `Strings in Python are objects equipped with built-in utility functions called **methods**. You call a method by placing a dot (\`.\`) after the string, followed by the method name and parentheses \`()\`.

Key string methods:
- **\`.strip()\`:** Removes all leading and trailing whitespace.
- **\`.upper()\`:** Returns an all-uppercase copy of the string.
- **\`.lower()\`:** Returns an all-lowercase copy of the string.

### Strings Are Immutable
In Python, strings cannot be modified in-place! Calling \`text.upper()\` does not alter \`text\`; it creates and returns a brand-new uppercase string.`
        },
        {
          id: 'l4-2-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Sanitizing Email Input',
          description:
            'Observe how chaining .strip() and .lower() removes accidental spaces and standardizes user emails.',
          code: 'raw_email = "  Admin@Example.COM  "\nclean_email = raw_email.strip().lower()\nprint(clean_email)',
          expectedStdout: 'admin@example.com',
          explanation:
            'strip() trims the surrounding spaces, and lower() converts all letters to lowercase.'
        },
        {
          id: 'l4-2-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Airport Gate Normalization',
          question: 'What will the following code output to the console?',
          codeSnippet: 'gate = "  gate b3  "\nprint(gate.strip().upper())',
          options: [
            {
              id: 'opt-4-2-correct',
              text: 'GATE B3',
              isCorrect: true,
              explanation:
                'Correct! strip() removes outer spaces and upper() converts "gate b3" to "GATE B3".'
            },
            {
              id: 'opt-4-2-spaces',
              text: '  GATE B3  ',
              isCorrect: false,
              explanation: 'Incorrect: strip() removes leading and trailing spaces.'
            },
            {
              id: 'opt-4-2-lower',
              text: 'gate b3',
              isCorrect: false,
              explanation: 'Incorrect: upper() converts letters to uppercase.'
            },
            {
              id: 'opt-4-2-nospace',
              text: 'GATEB3',
              isCorrect: false,
              explanation:
                'Incorrect: strip() only removes spaces on the outer edges; internal spaces are preserved.'
            }
          ]
        },
        {
          id: 'l4-2-step-true-false',
          type: 'true_false',
          title: 'Concept Check 2: String Immutability',
          statement:
            'In Python, calling text.upper() permanently modifies the contents of the text variable in-place.',
          correctAnswer: false,
          explanation:
            'Correct! Strings are immutable. text.upper() returns a new string; the original text variable remains unchanged unless reassigned.'
        },
        {
          id: 'l4-2-step-code-task',
          type: 'code_task',
          title: 'Coding Task: License Plate Reader Normalization',
          objective:
            'Given raw_plate = "  ca-90210-xyz  ", create trimmed_plate by stripping outer whitespace, and license_plate by converting trimmed_plate to uppercase. Print license_plate.',
          instructions: [
            'Set trimmed_plate = raw_plate.strip() to trim surrounding spaces.',
            'Set license_plate = trimmed_plate.upper() to convert all letters to uppercase.',
            'Print license_plate to the console (evaluates to "CA-90210-XYZ").'
          ],
          starterCode:
            'raw_plate = "  ca-90210-xyz  "\n\n# Strip whitespace into trimmed_plate and convert to uppercase license_plate:\n',
          solutionCode:
            'raw_plate = "  ca-90210-xyz  "\ntrimmed_plate = raw_plate.strip()\nlicense_plate = trimmed_plate.upper()\nprint(license_plate)\n',
          hints: [
            {
              id: 'h-4-2-1',
              level: 1,
              title: 'Sequential methods',
              text: 'Call .strip() first to remove whitespace, then call .upper() on trimmed_plate.',
              content:
                'Call .strip() first to remove whitespace, then call .upper() on trimmed_plate.'
            },
            {
              id: 'h-4-2-2',
              level: 2,
              title: 'Code implementation',
              text: 'trimmed_plate = raw_plate.strip()\nlicense_plate = trimmed_plate.upper()\nprint(license_plate)',
              content:
                'trimmed_plate = raw_plate.strip()\nlicense_plate = trimmed_plate.upper()\nprint(license_plate)'
            }
          ],
          testCases: [
            {
              id: 'tc-4-2-1',
              description: 'Variable license_plate equals "CA-90210-XYZ" and outputs to stdout',
              type: 'state_and_stdout',
              expectedStdout: 'CA-90210-XYZ',
              expectedVariables: {
                trimmed_plate: { value: 'ca-90210-xyz', type: 'str' },
                license_plate: { value: 'CA-90210-XYZ', type: 'str' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'trimmed_plate',
                  message: "Make sure you create 'trimmed_plate'."
                },
                {
                  type: 'variable_assigned',
                  target: 'license_plate',
                  message: "Make sure you create 'license_plate'."
                }
              ]
            },
            {
              id: 'tc-4-2-2',
              description: 'Verifies whitespace was completely removed and text is uppercase',
              type: 'state_and_stdout',
              expectedStdout: 'CA-90210-XYZ',
              expectedVariables: {
                trimmed_plate: { value: 'ca-90210-xyz', type: 'str' },
                license_plate: { value: 'CA-90210-XYZ', type: 'str' }
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
          heading: 'Methods on Strings',
          paragraphs: [
            'Strings in Python are objects equipped with built-in utility functions called methods. You call a method by placing a dot (.) after the string, followed by the method name and parentheses.',
            'Common string methods include:',
            '• .upper() -> Returns an uppercase copy\n• .lower() -> Returns a lowercase copy\n• .strip() -> Removes leading and trailing whitespace'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'raw_email = "  Admin@Example.COM  "\nclean_email = raw_email.strip().lower()\nprint(clean_email)  # "admin@example.com"',
              caption: 'Methods return new modified strings; the original string is unchanged.'
            }
          ]
        }
      ],
      taskObjective:
        'Given raw_plate = "  ca-90210-xyz  ", create trimmed_plate by stripping outer whitespace, and license_plate by converting trimmed_plate to uppercase. Print license_plate.',
      taskInstructions: [
        'Set trimmed_plate = raw_plate.strip() to trim surrounding spaces.',
        'Set license_plate = trimmed_plate.upper() to convert it to capital letters.',
        'Print license_plate to the console.'
      ],
      hints: [
        {
          id: 'h-4-2-1',
          level: 1,
          title: 'Sequential methods',
          text: 'Call .strip() first to remove whitespace, then call .upper() on the cleaned text.',
          content:
            'Call .strip() first to remove whitespace, then call .upper() on the cleaned text.'
        },
        {
          id: 'h-4-2-2',
          level: 2,
          title: 'Code implementation',
          text: 'trimmed_plate = raw_plate.strip()\nlicense_plate = trimmed_plate.upper()\nprint(license_plate)',
          content:
            'trimmed_plate = raw_plate.strip()\nlicense_plate = trimmed_plate.upper()\nprint(license_plate)'
        }
      ],
      starterCode:
        'raw_plate = "  ca-90210-xyz  "\n\n# Strip whitespace into trimmed_plate and convert to uppercase license_plate:\n',
      solutionCode:
        'raw_plate = "  ca-90210-xyz  "\ntrimmed_plate = raw_plate.strip()\nlicense_plate = trimmed_plate.upper()\nprint(license_plate)\n',
      expectedOutput: 'CA-90210-XYZ',
      testCases: [
        {
          id: 'tc-4-2-1',
          description: 'Variable license_plate equals "CA-90210-XYZ" and outputs to stdout',
          type: 'state_and_stdout',
          expectedStdout: 'CA-90210-XYZ',
          expectedVariables: {
            trimmed_plate: { value: 'ca-90210-xyz', type: 'str' },
            license_plate: { value: 'CA-90210-XYZ', type: 'str' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'trimmed_plate',
              message: "Make sure you create 'trimmed_plate'."
            },
            {
              type: 'variable_assigned',
              target: 'license_plate',
              message: "Make sure you create 'license_plate'."
            }
          ]
        },
        {
          id: 'tc-4-2-2',
          description: 'Verifies whitespace was completely removed and text is uppercase',
          type: 'state_and_stdout',
          expectedStdout: 'CA-90210-XYZ',
          expectedVariables: {
            trimmed_plate: { value: 'ca-90210-xyz', type: 'str' },
            license_plate: { value: 'CA-90210-XYZ', type: 'str' }
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
    // Lesson 4.3: String Indexing & Slicing
    // -------------------------------------------------------------------------
    {
      id: 'lesson-4-3',
      chapterId: 'ch-4',
      chapterTitle: 'Strings & Text Operations',
      lessonNumber: '4.3',
      title: 'String Indexing & Slicing',
      difficulty: 'Intermediate',
      category: 'concept',
      duration: '9 mins',
      durationMinutes: 9,
      xp: 70,
      status: 'locked',
      steps: [
        {
          id: 'l4-3-step-explanation',
          type: 'explanation',
          title: 'Sequence Indexing & Slicing',
          content: `Strings in Python are ordered sequences of characters. Each character occupies a specific position index:
- **0-based indexing:** The first character is at index \`0\`, the second at index \`1\`.
- **Negative indexing:** Counts backwards from the end: index \`-1\` is the very last character.

### Slicing Substrings \`[start:end]\`
Slicing extracts a range of characters using \`string[start:end]\`. The slice includes the character at \`start\` up to, but **not including**, \`end\`.
- \`text[:3]\`: Takes from the beginning up to (excluding) index 3.
- \`text[3:]\`: Takes from index 3 all the way to the end.`
        },
        {
          id: 'l4-3-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: DNA Genetic Sequencing',
          description:
            'Observe how indexing and slicing read single nucleotides and codon sequences from DNA strings.',
          code: 'dna = "ATCGGCTA"\nprint(dna[0])\nprint(dna[-1])\nprint(dna[:3])',
          expectedStdout: 'A\nA\nATC',
          explanation:
            'dna[0] is "A", dna[-1] is the last character "A", and dna[:3] extracts the first 3 letters "ATC".'
        },
        {
          id: 'l4-3-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Country Prefix Extraction',
          question: 'What will the following slice output to the console?',
          codeSnippet: 'iso_code = "US-CALIFORNIA"\nprint(iso_code[:2])',
          options: [
            {
              id: 'opt-4-3-correct',
              text: 'US',
              isCorrect: true,
              explanation:
                'Correct! [:2] extracts characters at index 0 and 1, producing "US". Index 2 ("-") is excluded.'
            },
            {
              id: 'opt-4-3-three',
              text: 'US-',
              isCorrect: false,
              explanation:
                'Incorrect: Slices do not include the ending index. [:2] stops before index 2.'
            },
            {
              id: 'opt-4-3-one',
              text: 'U',
              isCorrect: false,
              explanation: 'Incorrect: [:2] includes both index 0 and index 1.'
            },
            {
              id: 'opt-4-3-rev',
              text: 'CA',
              isCorrect: false,
              explanation: 'Incorrect: Slices without a start index begin at index 0.'
            }
          ]
        },
        {
          id: 'l4-3-step-fill-blank',
          type: 'fill_blank',
          title: 'Concept Check 2: First Character Index',
          prompt:
            'Fill in the blank with the index number used to access the very first character of any string in Python:',
          codeTemplate: 'secret = "CIPHER"\nfirst_letter = secret[{{blank}}]',
          acceptedAnswers: ['0'],
          explanation:
            'Python sequences are 0-indexed, meaning the initial item is always located at index 0.',
          hint: 'Type 0 for the first position.'
        },
        {
          id: 'l4-3-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Financial Account Masking',
          objective:
            'Given account_id = "ACC-987654321", extract account_type (the first 3 characters account_id[:3]), first_char (index 0), and last_char (index -1). Print all three separated by spaces.',
          instructions: [
            'Set account_type = account_id[:3] to slice the first 3 characters.',
            'Set first_char = account_id[0] to access the first character.',
            'Set last_char = account_id[-1] to access the last character.',
            'Print all three variables: print(account_type, first_char, last_char).'
          ],
          starterCode:
            'account_id = "ACC-987654321"\n\n# Extract account_type, first_char, and last_char below:\n',
          solutionCode:
            'account_id = "ACC-987654321"\naccount_type = account_id[:3]\nfirst_char = account_id[0]\nlast_char = account_id[-1]\nprint(account_type, first_char, last_char)\n',
          hints: [
            {
              id: 'h-4-3-1',
              level: 1,
              title: 'Index syntax',
              text: 'Use account_id[0] for first character, account_id[:3] for first 3 characters, and account_id[-1] for the last character.',
              content:
                'Use account_id[0] for first character, account_id[:3] for first 3 characters, and account_id[-1] for the last character.'
            },
            {
              id: 'h-4-3-2',
              level: 2,
              title: 'Code skeleton',
              text: 'account_type = account_id[:3]\nfirst_char = account_id[0]\nlast_char = account_id[-1]\nprint(account_type, first_char, last_char)',
              content:
                'account_type = account_id[:3]\nfirst_char = account_id[0]\nlast_char = account_id[-1]\nprint(account_type, first_char, last_char)'
            }
          ],
          testCases: [
            {
              id: 'tc-4-3-1',
              description:
                'Extracts account_type="ACC", first_char="A", last_char="1" and prints "ACC A 1"',
              type: 'state_and_stdout',
              expectedStdout: 'ACC A 1',
              expectedVariables: {
                account_type: { value: 'ACC', type: 'str' },
                first_char: { value: 'A', type: 'str' },
                last_char: { value: '1', type: 'str' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'account_type',
                  message: "Make sure you slice 'account_type'."
                },
                {
                  type: 'variable_assigned',
                  target: 'first_char',
                  message: "Make sure you extract 'first_char'."
                },
                {
                  type: 'variable_assigned',
                  target: 'last_char',
                  message: "Make sure you extract 'last_char'."
                }
              ]
            },
            {
              id: 'tc-4-3-2',
              description:
                'Verifies slice length is exactly 3 and negative index accesses the final character',
              type: 'state_and_stdout',
              expectedStdout: 'ACC A 1',
              expectedVariables: {
                account_type: { value: 'ACC', type: 'str' },
                first_char: { value: 'A', type: 'str' },
                last_char: { value: '1', type: 'str' }
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
          heading: 'Accessing Characters with Indexing',
          paragraphs: [
            'Strings in Python are sequences of characters. Each character has a specific position number, called its index.',
            'Python uses 0-based indexing: the first character is at index 0, the second at index 1. Negative indexes count backwards from the end: index -1 is the very last character.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'dna = "ATCGGCTA"\nprint(dna[0])   # "A"\nprint(dna[-1])  # "A" (last character)\nprint(dna[:3])  # "ATC"',
              caption: 'Use square brackets [] to access characters by index.'
            }
          ]
        }
      ],
      taskObjective:
        'Given account_id = "ACC-987654321", extract account_type (the first 3 characters account_id[:3]), first_char (index 0), and last_char (index -1). Print all three separated by spaces.',
      taskInstructions: [
        'Set account_type = account_id[:3]',
        'Set first_char = account_id[0]',
        'Set last_char = account_id[-1]',
        'Print all three variables.'
      ],
      hints: [
        {
          id: 'h-4-3-1',
          level: 1,
          title: 'Index syntax',
          text: 'Use account_id[0] for first character, account_id[:3] for the slice of first 3 characters, and account_id[-1] for the last character.',
          content:
            'Use account_id[0] for first character, account_id[:3] for the slice of first 3 characters, and account_id[-1] for the last character.'
        },
        {
          id: 'h-4-3-2',
          level: 2,
          title: 'Code skeleton',
          text: 'account_type = account_id[:3]\nfirst_char = account_id[0]\nlast_char = account_id[-1]\nprint(account_type, first_char, last_char)',
          content:
            'account_type = account_id[:3]\nfirst_char = account_id[0]\nlast_char = account_id[-1]\nprint(account_type, first_char, last_char)'
        }
      ],
      starterCode:
        'account_id = "ACC-987654321"\n\n# Extract account_type, first_char, and last_char below:\n',
      solutionCode:
        'account_id = "ACC-987654321"\naccount_type = account_id[:3]\nfirst_char = account_id[0]\nlast_char = account_id[-1]\nprint(account_type, first_char, last_char)\n',
      expectedOutput: 'ACC A 1',
      testCases: [
        {
          id: 'tc-4-3-1',
          description:
            'Extracts account_type="ACC", first_char="A", last_char="1" and prints "ACC A 1"',
          type: 'state_and_stdout',
          expectedStdout: 'ACC A 1',
          expectedVariables: {
            account_type: { value: 'ACC', type: 'str' },
            first_char: { value: 'A', type: 'str' },
            last_char: { value: '1', type: 'str' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'account_type',
              message: "Make sure you slice 'account_type'."
            },
            {
              type: 'variable_assigned',
              target: 'first_char',
              message: "Make sure you extract 'first_char'."
            },
            {
              type: 'variable_assigned',
              target: 'last_char',
              message: "Make sure you extract 'last_char'."
            }
          ]
        },
        {
          id: 'tc-4-3-2',
          description:
            'Verifies slice length is exactly 3 and negative index accesses the final character',
          type: 'state_and_stdout',
          expectedStdout: 'ACC A 1',
          expectedVariables: {
            account_type: { value: 'ACC', type: 'str' },
            first_char: { value: 'A', type: 'str' },
            last_char: { value: '1', type: 'str' }
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
