import { Chapter } from '../../types/curriculum'

export const chapter6: Chapter = {
  id: 'ch-6',
  chapterNumber: 6,
  title: 'Chapter 6: Lists & Collections',
  description:
    'Group, organize, and manipulate ordered sequences of elements using Python lists and collection methods.',
  lessons: [
    // -------------------------------------------------------------------------
    // Lesson 6.1: Creating & Indexing Lists
    // -------------------------------------------------------------------------
    {
      id: 'lesson-6-1',
      chapterId: 'ch-6',
      chapterTitle: 'Lists & Collections',
      lessonNumber: '6.1',
      title: 'Creating & Indexing Lists',
      difficulty: 'Beginner',
      category: 'concept',
      duration: '8 mins',
      durationMinutes: 8,
      xp: 65,
      status: 'locked',
      steps: [
        {
          id: 'l6-1-step-explanation',
          type: 'explanation',
          title: 'What is a List?',
          content: `A **list** is an ordered, mutable sequence of elements enclosed in square brackets \`[]\`. Lists can contain items of any type, including strings, numbers, booleans, and even other lists.

Just like strings, lists are **0-indexed**:
- Index \`0\` points to the first element.
- Index \`1\` points to the second element.
- Negative index \`-1\` points to the last element.

\`\`\`python
planets = ["Mercury", "Venus", "Earth", "Mars"]
print(planets[0])   # "Mercury"
print(planets[-1])  # "Mars"
\`\`\``
        },
        {
          id: 'l6-1-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Planetary Tour',
          description:
            'Observe how list elements are defined inside brackets and accessed with 0-based and negative indexing.',
          code: 'planets = ["Mercury", "Venus", "Earth", "Mars"]\nprint(planets[0])\nprint(planets[-1])',
          expectedStdout: 'Mercury\nMars',
          explanation:
            'planets[0] extracts "Mercury" and planets[-1] extracts the final element "Mars".'
        },
        {
          id: 'l6-1-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Playlist Indexing',
          question: 'What will the following code output to the console?',
          codeSnippet: 'tracks = ["Song A", "Song B", "Song C"]\nprint(tracks[1])',
          options: [
            {
              id: 'opt-6-1-correct',
              text: 'Song B',
              isCorrect: true,
              explanation:
                'Correct! Because Python uses 0-based indexing, index 0 is "Song A" and index 1 is "Song B".'
            },
            {
              id: 'opt-6-1-first',
              text: 'Song A',
              isCorrect: false,
              explanation: 'Incorrect: "Song A" is at index 0.'
            },
            {
              id: 'opt-6-1-third',
              text: 'Song C',
              isCorrect: false,
              explanation: 'Incorrect: "Song C" is at index 2.'
            },
            {
              id: 'opt-6-1-quotes',
              text: '"Song B"',
              isCorrect: false,
              explanation:
                'Incorrect: String elements printed individually from a list appear without enclosing quotes.'
            }
          ]
        },
        {
          id: 'l6-1-step-fill-blank',
          type: 'fill_blank',
          title: 'Concept Check 2: First Place Position',
          prompt:
            'Fill in the blank with the index number used to extract the very first element from the medals list:',
          codeTemplate: 'medals = ["Gold", "Silver", "Bronze"]\nfirst_place = medals[{{blank}}]',
          acceptedAnswers: ['0'],
          explanation:
            'Python lists are 0-indexed; the first element is always located at index 0.',
          hint: 'Type 0 for the first position.'
        },
        {
          id: 'l6-1-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Server Task Queue Management',
          objective:
            'Create a list named task_queue containing ["backup", "scan", "update"]. Extract first_task using index 0 and urgent_task using index -1. Print task_queue, first_task, and urgent_task separated by spaces.',
          instructions: [
            'Declare task_queue = ["backup", "scan", "update"].',
            'Assign first_task = task_queue[0].',
            'Assign urgent_task = task_queue[-1].',
            'Print all three variables: print(task_queue, first_task, urgent_task).'
          ],
          starterCode: '# Create task_queue list and index first and last tasks below:\n',
          solutionCode:
            'task_queue = ["backup", "scan", "update"]\nfirst_task = task_queue[0]\nurgent_task = task_queue[-1]\nprint(task_queue, first_task, urgent_task)\n',
          hints: [
            {
              id: 'h-6-1-1',
              level: 1,
              title: 'Square brackets',
              text: 'Use square brackets [] for both creating the list and accessing elements by index.',
              content:
                'Use square brackets [] for both creating the list and accessing elements by index.'
            },
            {
              id: 'h-6-1-2',
              level: 2,
              title: 'Code implementation',
              text: 'task_queue = ["backup", "scan", "update"]\nfirst_task = task_queue[0]\nurgent_task = task_queue[-1]\nprint(task_queue, first_task, urgent_task)',
              content:
                'task_queue = ["backup", "scan", "update"]\nfirst_task = task_queue[0]\nurgent_task = task_queue[-1]\nprint(task_queue, first_task, urgent_task)'
            }
          ],
          testCases: [
            {
              id: 'tc-6-1-1',
              description: 'Declares task_queue and extracts first_task and urgent_task',
              type: 'state_and_stdout',
              expectedStdout: "['backup', 'scan', 'update'] backup update",
              expectedVariables: {
                task_queue: { value: ['backup', 'scan', 'update'], type: 'list' },
                first_task: { value: 'backup', type: 'str' },
                urgent_task: { value: 'update', type: 'str' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'task_queue',
                  message: "Make sure you declare 'task_queue'."
                },
                {
                  type: 'variable_assigned',
                  target: 'first_task',
                  message: "Make sure you extract 'first_task'."
                },
                {
                  type: 'variable_assigned',
                  target: 'urgent_task',
                  message: "Make sure you extract 'urgent_task'."
                }
              ]
            },
            {
              id: 'tc-6-1-2',
              description: 'Verifies task_queue contains exactly 3 items in specified order',
              type: 'state_and_stdout',
              expectedStdout: "['backup', 'scan', 'update'] backup update",
              expectedVariables: {
                task_queue: { value: ['backup', 'scan', 'update'], type: 'list' },
                first_task: { value: 'backup', type: 'str' },
                urgent_task: { value: 'update', type: 'str' }
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
          heading: 'What is a List?',
          paragraphs: [
            'A list is an ordered, mutable sequence of elements enclosed in square brackets []. Lists can contain items of any type, including strings, numbers, and even other lists.',
            'Just like strings, lists are 0-indexed: index 0 points to the first element, index 1 to the second, and index -1 to the last element.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'planets = ["Mercury", "Venus", "Earth", "Mars"]\nprint(planets[0])   # "Mercury"\nprint(planets[-1])  # "Mars"',
              caption: 'Access list elements by placing index numbers inside square brackets [].'
            }
          ]
        }
      ],
      taskObjective:
        'Create a list named task_queue containing ["backup", "scan", "update"]. Extract first_task using index 0 and urgent_task using index -1. Print task_queue, first_task, and urgent_task separated by spaces.',
      taskInstructions: [
        'Declare task_queue = ["backup", "scan", "update"].',
        'Assign first_task = task_queue[0].',
        'Assign urgent_task = task_queue[-1].',
        'Print task_queue, first_task, and urgent_task.'
      ],
      hints: [
        {
          id: 'h-6-1-1',
          level: 1,
          title: 'Square brackets',
          text: 'Use square brackets [] for both creating the list and accessing its elements by index.',
          content:
            'Use square brackets [] for both creating the list and accessing its elements by index.'
        },
        {
          id: 'h-6-1-2',
          level: 2,
          title: 'Code implementation',
          text: 'task_queue = ["backup", "scan", "update"]\nfirst_task = task_queue[0]\nurgent_task = task_queue[-1]\nprint(task_queue, first_task, urgent_task)',
          content:
            'task_queue = ["backup", "scan", "update"]\nfirst_task = task_queue[0]\nurgent_task = task_queue[-1]\nprint(task_queue, first_task, urgent_task)'
        }
      ],
      starterCode: '# Create task_queue list and index first and last tasks below:\n',
      solutionCode:
        'task_queue = ["backup", "scan", "update"]\nfirst_task = task_queue[0]\nurgent_task = task_queue[-1]\nprint(task_queue, first_task, urgent_task)\n',
      expectedOutput: "['backup', 'scan', 'update'] backup update",
      testCases: [
        {
          id: 'tc-6-1-1',
          description: 'Declares task_queue and extracts first_task and urgent_task',
          type: 'state_and_stdout',
          expectedStdout: "['backup', 'scan', 'update'] backup update",
          expectedVariables: {
            task_queue: { value: ['backup', 'scan', 'update'], type: 'list' },
            first_task: { value: 'backup', type: 'str' },
            urgent_task: { value: 'update', type: 'str' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'task_queue',
              message: "Make sure you declare 'task_queue'."
            },
            {
              type: 'variable_assigned',
              target: 'first_task',
              message: "Make sure you extract 'first_task'."
            },
            {
              type: 'variable_assigned',
              target: 'urgent_task',
              message: "Make sure you extract 'urgent_task'."
            }
          ]
        },
        {
          id: 'tc-6-1-2',
          description: 'Verifies task_queue contains exactly 3 items in specified order',
          type: 'state_and_stdout',
          expectedStdout: "['backup', 'scan', 'update'] backup update",
          expectedVariables: {
            task_queue: { value: ['backup', 'scan', 'update'], type: 'list' },
            first_task: { value: 'backup', type: 'str' },
            urgent_task: { value: 'update', type: 'str' }
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
    // Lesson 6.2: Modifying Lists
    // -------------------------------------------------------------------------
    {
      id: 'lesson-6-2',
      chapterId: 'ch-6',
      chapterTitle: 'Lists & Collections',
      lessonNumber: '6.2',
      title: 'Modifying Lists',
      difficulty: 'Intermediate',
      category: 'concept',
      duration: '9 mins',
      durationMinutes: 9,
      xp: 70,
      status: 'locked',
      steps: [
        {
          id: 'l6-2-step-explanation',
          type: 'explanation',
          title: 'Lists Are Mutable',
          content: `Unlike strings and integers, lists are **mutable**, meaning they can be modified in-place!

Key modification methods:
- **\`.append(item)\`:** Adds a new element to the very end of the list.
- **\`.pop(index)\`:** Removes and returns the element at the specified index (or the last item if no index is passed).

\`\`\`python
returns_bin = ["Hamlet", "Odyssey"]
returns_bin.append("1984")      # ["Hamlet", "Odyssey", "1984"]
processed = returns_bin.pop(0)  # removes "Hamlet", leaves ["Odyssey", "1984"]
\`\`\``
        },
        {
          id: 'l6-2-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Library Return Bin',
          description:
            'Observe how append adds a book to the back of the queue and pop(0) takes the first book from the front.',
          code: 'returns_bin = ["Hamlet", "Odyssey"]\nreturns_bin.append("1984")\nprocessed = returns_bin.pop(0)\nprint(returns_bin, processed)',
          expectedStdout: "['Odyssey', '1984'] Hamlet",
          explanation:
            '.append("1984") added "1984" to the end. .pop(0) removed "Hamlet" and assigned it to processed.'
        },
        {
          id: 'l6-2-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Train Cargo Coupling',
          question: 'What will the following code output to the console?',
          codeSnippet: 'train = ["Engine", "Cargo"]\ntrain.append("Caboose")\nprint(len(train))',
          options: [
            {
              id: 'opt-6-2-correct',
              text: '3',
              isCorrect: true,
              explanation:
                'Correct! train started with 2 cars; calling .append("Caboose") increased the length to 3.'
            },
            {
              id: 'opt-6-2-two',
              text: '2',
              isCorrect: false,
              explanation: 'Incorrect: append() adds an element to the list, expanding its length.'
            },
            {
              id: 'opt-6-2-name',
              text: 'Caboose',
              isCorrect: false,
              explanation:
                'Incorrect: len() returns the count of items in the list, not the item text.'
            },
            {
              id: 'opt-6-2-err',
              text: 'Error',
              isCorrect: false,
              explanation: 'Incorrect: .append() is a built-in method on all Python lists.'
            }
          ]
        },
        {
          id: 'l6-2-step-true-false',
          type: 'true_false',
          title: 'Concept Check 2: Append Insertion Position',
          statement:
            'In Python, the list method .append() inserts a new element at the beginning (index 0) of the list.',
          correctAnswer: false,
          explanation:
            'Correct! .append() always adds elements to the end of the list. (To insert at the beginning, you would use .insert(0, item)).'
        },
        {
          id: 'l6-2-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Clinic Patient Waiting Room',
          objective:
            'Start with patients = ["Emma", "Liam"]. Add "Sophia" to the end with .append(), then remove the first patient using patients.pop(0) into current_patient. Print patients and current_patient separated by a space.',
          instructions: [
            'Initialize patients = ["Emma", "Liam"].',
            'Call patients.append("Sophia") to add "Sophia" to the end.',
            'Remove the first item using patients.pop(0) and store it in current_patient.',
            'Print patients and current_patient using print(patients, current_patient).'
          ],
          starterCode:
            'patients = ["Emma", "Liam"]\n\n# Append "Sophia" and pop the first patient into current_patient:\n',
          solutionCode:
            'patients = ["Emma", "Liam"]\npatients.append("Sophia")\ncurrent_patient = patients.pop(0)\nprint(patients, current_patient)\n',
          hints: [
            {
              id: 'h-6-2-1',
              level: 1,
              title: 'Methods syntax',
              text: 'Use `patients.append("Sophia")` on line 1, then `current_patient = patients.pop(0)`.',
              content:
                'Use `patients.append("Sophia")` on line 1, then `current_patient = patients.pop(0)`.'
            },
            {
              id: 'h-6-2-2',
              level: 2,
              title: 'Code implementation',
              text: 'patients = ["Emma", "Liam"]\npatients.append("Sophia")\ncurrent_patient = patients.pop(0)\nprint(patients, current_patient)',
              content:
                'patients = ["Emma", "Liam"]\npatients.append("Sophia")\ncurrent_patient = patients.pop(0)\nprint(patients, current_patient)'
            }
          ],
          testCases: [
            {
              id: 'tc-6-2-1',
              description: 'patients is ["Liam", "Sophia"], current_patient is "Emma"',
              type: 'state_and_stdout',
              expectedStdout: "['Liam', 'Sophia'] Emma",
              expectedVariables: {
                patients: { value: ['Liam', 'Sophia'], type: 'list' },
                current_patient: { value: 'Emma', type: 'str' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'current_patient',
                  message: "Make sure you store the popped item into 'current_patient'."
                }
              ]
            },
            {
              id: 'tc-6-2-2',
              description: 'Verifies in-place list modification and final length equals 2',
              type: 'state_and_stdout',
              expectedStdout: "['Liam', 'Sophia'] Emma",
              expectedVariables: {
                patients: { value: ['Liam', 'Sophia'], type: 'list' },
                current_patient: { value: 'Emma', type: 'str' }
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
          heading: 'Lists Are Mutable',
          paragraphs: [
            'Unlike strings and integers, lists can be altered in-place without creating a new list.',
            'Key modification methods:',
            '• .append(item) -> Adds an element to the end of the list.\n• .pop(index) -> Removes and returns the item at the given index (or the last item if no index is given).'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'returns_bin = ["Hamlet", "Odyssey"]\nreturns_bin.append("1984")\nprocessed = returns_bin.pop(0)\nprint(returns_bin, processed)  # ["Odyssey", "1984"] Hamlet',
              caption: 'append adds to the end; pop removes by index.'
            }
          ]
        }
      ],
      taskObjective:
        'Start with patients = ["Emma", "Liam"]. Add "Sophia" to the list with .append(), then remove the first element using patients.pop(0) into current_patient.',
      taskInstructions: [
        'Initialize patients = ["Emma", "Liam"].',
        'Call patients.append("Sophia") to add "Sophia" to the end.',
        'Remove the first item and store it: current_patient = patients.pop(0).',
        'Print patients and current_patient.'
      ],
      hints: [
        {
          id: 'h-6-2-1',
          level: 1,
          title: 'Methods syntax',
          text: 'Use `patients.append("Sophia")` followed by `current_patient = patients.pop(0)`.',
          content:
            'Use `patients.append("Sophia")` followed by `current_patient = patients.pop(0)`.'
        },
        {
          id: 'h-6-2-2',
          level: 2,
          title: 'Code implementation',
          text: 'patients = ["Emma", "Liam"]\npatients.append("Sophia")\ncurrent_patient = patients.pop(0)\nprint(patients, current_patient)',
          content:
            'patients = ["Emma", "Liam"]\npatients.append("Sophia")\ncurrent_patient = patients.pop(0)\nprint(patients, current_patient)'
        }
      ],
      starterCode:
        'patients = ["Emma", "Liam"]\n\n# Append "Sophia" and pop the first patient into current_patient:\n',
      solutionCode:
        'patients = ["Emma", "Liam"]\npatients.append("Sophia")\ncurrent_patient = patients.pop(0)\nprint(patients, current_patient)\n',
      expectedOutput: "['Liam', 'Sophia'] Emma",
      testCases: [
        {
          id: 'tc-6-2-1',
          description: 'patients is ["Liam", "Sophia"], current_patient is "Emma"',
          type: 'state_and_stdout',
          expectedStdout: "['Liam', 'Sophia'] Emma",
          expectedVariables: {
            patients: { value: ['Liam', 'Sophia'], type: 'list' },
            current_patient: { value: 'Emma', type: 'str' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'current_patient',
              message: "Make sure you store the popped item into 'current_patient'."
            }
          ]
        },
        {
          id: 'tc-6-2-2',
          description: 'Verifies in-place list modification and final length equals 2',
          type: 'state_and_stdout',
          expectedStdout: "['Liam', 'Sophia'] Emma",
          expectedVariables: {
            patients: { value: ['Liam', 'Sophia'], type: 'list' },
            current_patient: { value: 'Emma', type: 'str' }
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
    // Lesson 6.3: List Length & Slicing
    // -------------------------------------------------------------------------
    {
      id: 'lesson-6-3',
      chapterId: 'ch-6',
      chapterTitle: 'Lists & Collections',
      lessonNumber: '6.3',
      title: 'List Length & Slicing',
      difficulty: 'Intermediate',
      category: 'concept',
      duration: '9 mins',
      durationMinutes: 9,
      xp: 70,
      status: 'locked',
      steps: [
        {
          id: 'l6-3-step-explanation',
          type: 'explanation',
          title: 'Measuring and Slicing Lists',
          content: `### Measuring with \`len()\`
The built-in \`len()\` function returns the total number of items stored in any sequence, including lists and strings.

### Slicing Sublists \`list[start:end]\`
Just like string slicing, you can extract portions of a list using \`list[start:end]\`.
- The slice begins at \`start\` up to, but **excluding**, \`end\`.
- \`elevations[1:3]\` extracts elements at indexes 1 and 2.`
        },
        {
          id: 'l6-3-step-worked-example',
          type: 'worked_example',
          title: 'Worked Example: Mountain Peak Elevations',
          description:
            'Observe how len() counts total peaks and slicing extracts a middle altitude subset.',
          code: 'elevations = [1200, 2400, 3600, 4800]\nprint(len(elevations))\nprint(elevations[1:3])',
          expectedStdout: '4\n[2400, 3600]',
          explanation:
            'len(elevations) evaluates to 4. elevations[1:3] slices elements at index 1 (2400) and index 2 (3600).'
        },
        {
          id: 'l6-3-step-predict-output',
          type: 'predict_output',
          title: 'Concept Check 1: Temperature Sensor Slicing',
          question: 'What will the following slice output to the console?',
          codeSnippet: 'readings = [68, 72, 75, 71, 69]\nprint(readings[:3])',
          options: [
            {
              id: 'opt-6-3-correct',
              text: '[68, 72, 75]',
              isCorrect: true,
              explanation: 'Correct! [:3] takes the first three elements (indexes 0, 1, and 2).'
            },
            {
              id: 'opt-6-3-two',
              text: '[68, 72]',
              isCorrect: false,
              explanation: 'Incorrect: [:3] includes indexes 0, 1, and 2 (three elements total).'
            },
            {
              id: 'opt-6-3-four',
              text: '[68, 72, 75, 71]',
              isCorrect: false,
              explanation: 'Incorrect: The end index 3 is excluded from the slice.'
            },
            {
              id: 'opt-6-3-num',
              text: '75',
              isCorrect: false,
              explanation: 'Incorrect: Slicing returns a new sublist, not a single number.'
            }
          ]
        },
        {
          id: 'l6-3-step-fill-blank',
          type: 'fill_blank',
          title: 'Concept Check 2: Length Function',
          prompt:
            'Fill in the blank with the built-in function that measures the total number of items in a list:',
          codeTemplate: 'scores = [90, 85, 78]\ncount = {{blank}}(scores)',
          acceptedAnswers: ['len'],
          explanation:
            'The len() function returns the length (count of elements) of any Python sequence.',
          hint: 'The function name is len.'
        },
        {
          id: 'l6-3-step-code-task',
          type: 'code_task',
          title: 'Coding Task: Warehouse Pallet Shipment Batches',
          objective:
            'Given pallet_ids = [101, 102, 103, 104, 105, 106], compute total_pallets using len(pallet_ids), and extract priority_batch using the slice pallet_ids[1:4]. Print total_pallets and priority_batch separated by a space.',
          instructions: [
            'Start with pallet_ids = [101, 102, 103, 104, 105, 106].',
            'Calculate total_pallets = len(pallet_ids) (evaluates to 6).',
            'Extract priority_batch = pallet_ids[1:4] (evaluates to [102, 103, 104]).',
            'Print total_pallets and priority_batch separated by a space.'
          ],
          starterCode:
            'pallet_ids = [101, 102, 103, 104, 105, 106]\n\n# Calculate total_pallets and extract priority_batch below:\n',
          solutionCode:
            'pallet_ids = [101, 102, 103, 104, 105, 106]\ntotal_pallets = len(pallet_ids)\npriority_batch = pallet_ids[1:4]\nprint(total_pallets, priority_batch)\n',
          hints: [
            {
              id: 'h-6-3-1',
              level: 1,
              title: 'Functions vs Slicing',
              text: 'Use len(pallet_ids) for count, and pallet_ids[1:4] with square brackets for the slice.',
              content:
                'Use len(pallet_ids) for count, and pallet_ids[1:4] with square brackets for the slice.'
            },
            {
              id: 'h-6-3-2',
              level: 2,
              title: 'Code implementation',
              text: 'pallet_ids = [101, 102, 103, 104, 105, 106]\ntotal_pallets = len(pallet_ids)\npriority_batch = pallet_ids[1:4]\nprint(total_pallets, priority_batch)',
              content:
                'pallet_ids = [101, 102, 103, 104, 105, 106]\ntotal_pallets = len(pallet_ids)\npriority_batch = pallet_ids[1:4]\nprint(total_pallets, priority_batch)'
            }
          ],
          testCases: [
            {
              id: 'tc-6-3-1',
              description: 'Variable total_pallets is 6 and priority_batch is [102, 103, 104]',
              type: 'state_and_stdout',
              expectedStdout: '6 [102, 103, 104]',
              expectedVariables: {
                total_pallets: { value: 6, type: 'int' },
                priority_batch: { value: [102, 103, 104], type: 'list' }
              },
              caseSensitive: true,
              normalizeLineEndings: true,
              ignoreOneFinalNewline: true,
              trimLines: false,
              semanticConstraints: [
                {
                  type: 'variable_assigned',
                  target: 'total_pallets',
                  message: "Make sure you calculate 'total_pallets'."
                },
                {
                  type: 'variable_assigned',
                  target: 'priority_batch',
                  message: "Make sure you extract 'priority_batch'."
                }
              ]
            },
            {
              id: 'tc-6-3-2',
              description: 'Verifies sliced list bounds are strictly [102, 103, 104]',
              type: 'state_and_stdout',
              expectedStdout: '6 [102, 103, 104]',
              expectedVariables: {
                total_pallets: { value: 6, type: 'int' },
                priority_batch: { value: [102, 103, 104], type: 'list' }
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
          heading: 'Measuring Lists with len()',
          paragraphs: [
            'The built-in len() function returns the total number of items stored in any sequence or collection, including lists, strings, and dictionaries.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'elevations = [1200, 2400, 3600, 4800]\nprint(len(elevations))  # 4\nprint(elevations[1:3])  # [2400, 3600]',
              caption: 'len(list) returns total count; list[start:end] slices a sublist.'
            }
          ]
        }
      ],
      taskObjective:
        'Given pallet_ids = [101, 102, 103, 104, 105, 106], find total_pallets using len(pallet_ids), and extract priority_batch = pallet_ids[1:4]. Print total_pallets and priority_batch.',
      taskInstructions: [
        'Calculate total_pallets = len(pallet_ids) (evaluates to 6).',
        'Extract priority_batch = pallet_ids[1:4] (evaluates to [102, 103, 104]).',
        'Print total_pallets and priority_batch.'
      ],
      hints: [
        {
          id: 'h-6-3-1',
          level: 1,
          title: 'Functions vs Slicing',
          text: 'Use len() with parentheses for count, and [1:4] with square brackets for the slice.',
          content:
            'Use len() with parentheses for count, and [1:4] with square brackets for the slice.'
        },
        {
          id: 'h-6-3-2',
          level: 2,
          title: 'Code implementation',
          text: 'pallet_ids = [101, 102, 103, 104, 105, 106]\ntotal_pallets = len(pallet_ids)\npriority_batch = pallet_ids[1:4]\nprint(total_pallets, priority_batch)',
          content:
            'pallet_ids = [101, 102, 103, 104, 105, 106]\ntotal_pallets = len(pallet_ids)\npriority_batch = pallet_ids[1:4]\nprint(total_pallets, priority_batch)'
        }
      ],
      starterCode:
        'pallet_ids = [101, 102, 103, 104, 105, 106]\n\n# Calculate total_pallets and extract priority_batch below:\n',
      solutionCode:
        'pallet_ids = [101, 102, 103, 104, 105, 106]\ntotal_pallets = len(pallet_ids)\npriority_batch = pallet_ids[1:4]\nprint(total_pallets, priority_batch)\n',
      expectedOutput: '6 [102, 103, 104]',
      testCases: [
        {
          id: 'tc-6-3-1',
          description: 'Variable total_pallets is 6 and priority_batch is [102, 103, 104]',
          type: 'state_and_stdout',
          expectedStdout: '6 [102, 103, 104]',
          expectedVariables: {
            total_pallets: { value: 6, type: 'int' },
            priority_batch: { value: [102, 103, 104], type: 'list' }
          },
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          trimLines: false,
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'total_pallets',
              message: "Make sure you calculate 'total_pallets'."
            },
            {
              type: 'variable_assigned',
              target: 'priority_batch',
              message: "Make sure you extract 'priority_batch'."
            }
          ]
        },
        {
          id: 'tc-6-3-2',
          description: 'Verifies sliced list bounds are strictly [102, 103, 104]',
          type: 'state_and_stdout',
          expectedStdout: '6 [102, 103, 104]',
          expectedVariables: {
            total_pallets: { value: 6, type: 'int' },
            priority_batch: { value: [102, 103, 104], type: 'list' }
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
