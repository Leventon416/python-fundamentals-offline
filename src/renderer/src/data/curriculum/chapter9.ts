import { Chapter } from '../../types/curriculum'

export const chapter9: Chapter = {
  id: 'ch-9',
  chapterNumber: 9,
  title: 'Project: Trip Cost Estimator',
  description:
    'Build a multi-milestone Trip Cost Estimator application step-by-step with code carry-forward and cumulative validation.',
  lessons: [
    {
      id: 'lesson-9-1',
      chapterId: 'ch-9',
      chapterTitle: 'Project: Trip Cost Estimator',
      lessonNumber: '9.1',
      title: 'Milestone 1: Base Distance & Rate',
      difficulty: 'Beginner',
      category: 'project_step',
      projectId: 'trip-cost-estimator',
      milestoneIndex: 1,
      totalMilestones: 4,
      duration: '10 mins',
      durationMinutes: 10,
      xp: 80,
      status: 'locked',
      theory: [
        {
          heading: 'Project Overview: Trip Cost Estimator',
          paragraphs: [
            'Welcome to your first multi-milestone project! In this project, you will build a complete Trip Cost Estimator program step-by-step.',
            'Each milestone builds directly upon your earlier progress. When you pass Milestone 1, your accepted code will automatically carry forward to Milestone 2.',
            'In Milestone 1, your goal is to calculate the base trip cost using a given distance and rate per kilometer.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'distance = 120\nrate_per_km = 0.5\nbase_cost = distance * rate_per_km\nprint(base_cost)  # 60.0',
              caption: 'Multiplying distance by rate produces base_cost as a float.'
            }
          ]
        }
      ],
      taskObjective:
        'Define distance = 120 and rate_per_km = 0.5, then calculate base_cost = distance * rate_per_km.',
      taskInstructions: [
        'Ensure distance is set to 120.',
        'Ensure rate_per_km is set to 0.5.',
        'Calculate base_cost by multiplying distance by rate_per_km (distance * rate_per_km).',
        'Run your code and check that base_cost equals 60.0.'
      ],
      task: {
        objective:
          'Define distance = 120 and rate_per_km = 0.5, then calculate base_cost = distance * rate_per_km.',
        instructions: [
          'Ensure distance is set to 120.',
          'Ensure rate_per_km is set to 0.5.',
          'Calculate base_cost by multiplying distance by rate_per_km (distance * rate_per_km).',
          'Run your code and check that base_cost equals 60.0.'
        ]
      },
      hints: [
        {
          id: 'h-9-1-1',
          level: 1,
          title: 'Calculating base_cost',
          content:
            'Use the multiplication operator * to compute base_cost = distance * rate_per_km.'
        },
        {
          id: 'h-9-1-2',
          level: 2,
          title: 'Full solution preview',
          content: 'base_cost = distance * rate_per_km'
        }
      ],
      starterCode: `# Project: Trip Cost Estimator - Milestone 1
# Calculate the base trip cost using distance and rate per km

distance = 120
rate_per_km = 0.5

# Calculate base_cost below:
`,
      solutionCode: `# Project: Trip Cost Estimator - Milestone 1
# Calculate the base trip cost using distance and rate per km

distance = 120
rate_per_km = 0.5

base_cost = distance * rate_per_km
`,
      testCases: [
        {
          id: 't-9-1-1',
          description: 'Calculate base_cost = distance * rate_per_km (equals 60.0)',
          type: 'state_and_stdout',
          mode: 'state_and_stdout',
          expectedVariables: {
            distance: { value: 120, type: 'int' },
            rate_per_km: { value: 0.5, type: 'float' },
            base_cost: { value: 60.0, type: 'float' }
          },
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'base_cost',
              message: 'Assign base_cost = distance * rate_per_km in your code.'
            }
          ]
        },
        {
          id: 't-9-1-2',
          description: 'Verify base_cost is of type float with value 60.0',
          type: 'state_and_stdout',
          mode: 'state_and_stdout',
          expectedVariables: {
            base_cost: { value: 60.0, type: 'float' }
          }
        }
      ]
    },
    {
      id: 'lesson-9-2',
      chapterId: 'ch-9',
      chapterTitle: 'Project: Trip Cost Estimator',
      lessonNumber: '9.2',
      title: 'Milestone 2: Service Fees & Total',
      difficulty: 'Beginner',
      category: 'project_step',
      projectId: 'trip-cost-estimator',
      milestoneIndex: 2,
      totalMilestones: 4,
      previousMilestoneLessonId: 'lesson-9-1',
      duration: '10 mins',
      durationMinutes: 10,
      xp: 85,
      status: 'locked',
      theory: [
        {
          heading: 'Building on Milestone 1: Fees & Total Cost',
          paragraphs: [
            'Notice that your code from Milestone 1 has been automatically carried forward into your editor!',
            'In Milestone 2, you will add a standard service fee of $15 and compute the cumulative total_cost.',
            'Cumulative testing ensures that your earlier milestone variables (distance, rate_per_km, base_cost) remain intact while verifying your new total_cost calculation.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'service_fee = 15\ntotal_cost = base_cost + service_fee\nprint(total_cost)  # 75.0',
              caption: 'Summing base_cost and service_fee yields total_cost.'
            }
          ]
        }
      ],
      taskObjective:
        'Carry forward Milestone 1 code. Define service_fee = 15 and compute total_cost = base_cost + service_fee.',
      taskInstructions: [
        'Keep your existing code from Milestone 1.',
        'Define service_fee = 15.',
        'Calculate total_cost = base_cost + service_fee.',
        'Verify both base_cost == 60.0 and total_cost == 75.0.'
      ],
      task: {
        objective:
          'Carry forward Milestone 1 code. Define service_fee = 15 and compute total_cost = base_cost + service_fee.',
        instructions: [
          'Keep your existing code from Milestone 1.',
          'Define service_fee = 15.',
          'Calculate total_cost = base_cost + service_fee.',
          'Verify both base_cost == 60.0 and total_cost == 75.0.'
        ]
      },
      hints: [
        {
          id: 'h-9-2-1',
          level: 1,
          title: 'Adding service_fee',
          content: 'Set service_fee = 15 on a new line.'
        },
        {
          id: 'h-9-2-2',
          level: 2,
          title: 'Computing total_cost',
          content: 'total_cost = base_cost + service_fee'
        }
      ],
      starterCode: `# Project: Trip Cost Estimator - Milestone 2
# Starter preloaded from Milestone 1:
distance = 120
rate_per_km = 0.5
base_cost = distance * rate_per_km

# Add service_fee = 15 and calculate total_cost below:
`,
      solutionCode: `# Project: Trip Cost Estimator - Milestone 2
distance = 120
rate_per_km = 0.5
base_cost = distance * rate_per_km

service_fee = 15
total_cost = base_cost + service_fee
`,
      testCases: [
        {
          id: 't-9-2-1',
          description: 'Cumulative Check: base_cost remains 60.0 from Milestone 1',
          type: 'state_and_stdout',
          mode: 'state_and_stdout',
          expectedVariables: {
            distance: { value: 120 },
            rate_per_km: { value: 0.5 },
            base_cost: { value: 60.0 }
          }
        },
        {
          id: 't-9-2-2',
          description: 'Milestone 2: Define service_fee = 15 and total_cost = 75.0',
          type: 'state_and_stdout',
          mode: 'state_and_stdout',
          expectedVariables: {
            service_fee: { value: 15 },
            total_cost: { value: 75.0 }
          },
          semanticConstraints: [
            {
              type: 'variable_assigned',
              target: 'service_fee',
              message: 'Assign service_fee = 15 in your code.'
            },
            {
              type: 'variable_assigned',
              target: 'total_cost',
              message: 'Assign total_cost = base_cost + service_fee in your code.'
            }
          ]
        },
        {
          id: 't-9-2-3',
          description: 'Cumulative Assertion: base_cost == 60.0 AND total_cost == 75.0',
          type: 'state_and_stdout',
          mode: 'state_and_stdout',
          expectedVariables: {
            base_cost: { value: 60.0 },
            total_cost: { value: 75.0 }
          }
        }
      ]
    },
    {
      id: 'lesson-9-3',
      chapterId: 'ch-9',
      chapterTitle: 'Project: Trip Cost Estimator',
      lessonNumber: '9.3',
      title: 'Milestone 3: Receipt Output Formatting',
      difficulty: 'Beginner',
      category: 'project_step',
      projectId: 'trip-cost-estimator',
      milestoneIndex: 3,
      totalMilestones: 4,
      previousMilestoneLessonId: 'lesson-9-2',
      duration: '10 mins',
      durationMinutes: 10,
      xp: 90,
      status: 'locked',
      theory: [
        {
          heading: 'Milestone 3: Receipt Formatting with f-strings',
          paragraphs: [
            'Great progress! In Milestone 3, you will turn your calculations into a readable customer receipt.',
            'Using Python f-strings, print two formatted lines:',
            '- Line 1: Base: $60.0',
            '- Line 2: Total: $75.0',
            'Our composite testing engine will verify both the exact printed stdout and your existing variable states.'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'print(f"Base: ${base_cost}")\nprint(f"Total: ${total_cost}")',
              caption: 'f-strings embed variables cleanly into receipt labels.'
            }
          ]
        }
      ],
      taskObjective:
        'Carry forward Milestone 2 code and print two formatted lines: "Base: $60.0" and "Total: $75.0".',
      taskInstructions: [
        'Keep your existing distance, rate_per_km, base_cost, service_fee, and total_cost code.',
        'Print the first line: Base: $60.0 (use f"Base: ${base_cost}").',
        'Print the second line: Total: $75.0 (use f"Total: ${total_cost}").',
        'Ensure exact capitalization and punctuation.'
      ],
      task: {
        objective:
          'Carry forward Milestone 2 code and print two formatted lines: "Base: $60.0" and "Total: $75.0".',
        instructions: [
          'Keep your existing distance, rate_per_km, base_cost, service_fee, and total_cost code.',
          'Print the first line: Base: $60.0 (use f"Base: ${base_cost}").',
          'Print the second line: Total: $75.0 (use f"Total: ${total_cost}").',
          'Ensure exact capitalization and punctuation.'
        ]
      },
      hints: [
        {
          id: 'h-9-3-1',
          level: 1,
          title: 'Using f-strings for receipt formatting',
          content: 'Write print(f"Base: ${base_cost}") followed by print(f"Total: ${total_cost}").'
        },
        {
          id: 'h-9-3-2',
          level: 2,
          title: 'Full solution preview',
          content: 'print(f"Base: ${base_cost}")\nprint(f"Total: ${total_cost}")'
        }
      ],
      starterCode: `# Project: Trip Cost Estimator - Milestone 3
# Starter preloaded from Milestone 2:
distance = 120
rate_per_km = 0.5
base_cost = distance * rate_per_km
service_fee = 15
total_cost = base_cost + service_fee

# Print formatted summary lines:
# "Base: $60.0" and "Total: $75.0"
`,
      solutionCode: `# Project: Trip Cost Estimator - Milestone 3
distance = 120
rate_per_km = 0.5
base_cost = distance * rate_per_km
service_fee = 15
total_cost = base_cost + service_fee

print(f"Base: \${base_cost}")
print(f"Total: \${total_cost}")
`,
      testCases: [
        {
          id: 't-9-3-1',
          description: 'Cumulative State: base_cost == 60.0 and total_cost == 75.0',
          type: 'state_and_stdout',
          mode: 'state_and_stdout',
          expectedVariables: {
            base_cost: { value: 60.0 },
            service_fee: { value: 15 },
            total_cost: { value: 75.0 }
          }
        },
        {
          id: 't-9-3-2',
          description: 'Receipt output formatting: print "Base: $60.0" and "Total: $75.0"',
          type: 'state_and_stdout',
          mode: 'state_and_stdout',
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          expectedStdout: 'Base: $60.0\nTotal: $75.0',
          expectedVariables: {
            base_cost: { value: 60.0 },
            total_cost: { value: 75.0 }
          }
        }
      ]
    },
    {
      id: 'lesson-9-4',
      chapterId: 'ch-9',
      chapterTitle: 'Project: Trip Cost Estimator',
      lessonNumber: '9.4',
      title: 'Milestone 4: Discount Condition',
      difficulty: 'Intermediate',
      category: 'project_step',
      projectId: 'trip-cost-estimator',
      milestoneIndex: 4,
      totalMilestones: 4,
      previousMilestoneLessonId: 'lesson-9-3',
      duration: '15 mins',
      durationMinutes: 15,
      xp: 100,
      status: 'locked',
      theory: [
        {
          heading: 'Milestone 4: Applying Conditional Long-Distance Discounts',
          paragraphs: [
            'In this final milestone, you will add a promotional discount for long-distance trips!',
            'If the distance is greater than 100 kilometers (distance > 100):',
            '- Set discount = 10',
            '- Deduct discount from total_cost (total_cost = total_cost - discount)',
            '- Print "Discount Applied: $10"',
            'With distance = 120, total_cost drops from $75.0 to $65.0. Print your final receipt with base cost, discount note, and discounted total!'
          ],
          codeSnippets: [
            {
              language: 'python',
              code: 'if distance > 100:\n    discount = 10\n    total_cost = total_cost - discount\n    print("Discount Applied: $10")',
              caption: 'Conditional deduction modifies total_cost and announces the discount.'
            }
          ]
        }
      ],
      taskObjective:
        'Carry forward Milestone 3 code. If distance > 100, apply discount = 10 to total_cost and print "Discount Applied: $10".',
      taskInstructions: [
        'Keep your existing calculations from Milestone 3.',
        'Add an if condition: if distance > 100:',
        'Inside the if block: set discount = 10, deduct discount from total_cost (total_cost = total_cost - discount), and print "Discount Applied: $10".',
        'Print "Base: $60.0" and final "Total: $65.0".'
      ],
      task: {
        objective:
          'Carry forward Milestone 3 code. If distance > 100, apply discount = 10 to total_cost and print "Discount Applied: $10".',
        instructions: [
          'Keep your existing calculations from Milestone 3.',
          'Add an if condition: if distance > 100:',
          'Inside the if block: set discount = 10, deduct discount from total_cost (total_cost = total_cost - discount), and print "Discount Applied: $10".',
          'Print "Base: $60.0" and final "Total: $65.0".'
        ]
      },
      hints: [
        {
          id: 'h-9-4-1',
          level: 1,
          title: 'Condition structure',
          content:
            'Use if distance > 100: followed by indented lines for discount = 10 and total_cost = total_cost - discount.'
        },
        {
          id: 'h-9-4-2',
          level: 2,
          title: 'Printing discount and final total',
          content:
            'print("Discount Applied: $10") inside the if block, and print(f"Total: ${total_cost}") after applying the discount.'
        }
      ],
      starterCode: `# Project: Trip Cost Estimator - Milestone 4
# Starter preloaded from Milestone 3:
distance = 120
rate_per_km = 0.5
base_cost = distance * rate_per_km
service_fee = 15
total_cost = base_cost + service_fee

# Add discount condition if distance > 100:
# apply discount = 10 to total_cost and print "Discount Applied: $10"
`,
      solutionCode: `# Project: Trip Cost Estimator - Milestone 4
distance = 120
rate_per_km = 0.5
base_cost = distance * rate_per_km
service_fee = 15
total_cost = base_cost + service_fee

print(f"Base: \${base_cost}")

if distance > 100:
    discount = 10
    total_cost = total_cost - discount
    print("Discount Applied: $10")

print(f"Total: \${total_cost}")
`,
      testCases: [
        {
          id: 't-9-4-1',
          description:
            'Cumulative Logic: base_cost == 60.0, discount == 10, and discounted total_cost == 65.0',
          type: 'state_and_stdout',
          mode: 'state_and_stdout',
          expectedVariables: {
            distance: { value: 120 },
            rate_per_km: { value: 0.5 },
            base_cost: { value: 60.0 },
            service_fee: { value: 15 },
            discount: { value: 10 },
            total_cost: { value: 65.0 }
          },
          semanticConstraints: [
            {
              type: 'pattern_present',
              target: 'distance\\s*>\\s*100',
              message: 'Check that distance > 100 with an if statement.'
            },
            {
              type: 'variable_assigned',
              target: 'discount',
              message: 'Assign discount = 10 inside the conditional block.'
            }
          ]
        },
        {
          id: 't-9-4-2',
          description:
            'Final Output Summary: prints "Discount Applied: $10" and final receipt lines',
          type: 'state_and_stdout',
          mode: 'state_and_stdout',
          caseSensitive: true,
          normalizeLineEndings: true,
          ignoreOneFinalNewline: true,
          expectedStdout: 'Base: $60.0\nDiscount Applied: $10\nTotal: $65.0',
          alternativeExpectedStdout: ['Discount Applied: $10\nBase: $60.0\nTotal: $65.0'],
          expectedVariables: {
            base_cost: { value: 60.0 },
            total_cost: { value: 65.0 },
            discount: { value: 10 }
          }
        }
      ]
    }
  ]
}
