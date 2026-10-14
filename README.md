# Python Fundamentals — Offline

A desktop app for learning Python through short lessons and coding exercises. Read an explanation, work through a few questions, then write and check your solution in the built-in editor.

Python runs locally through Pyodide, with the runtime and editor assets bundled into the app. You do not need a separate Python installation or an internet connection to work through the course. Installing dependencies and building from source require internet access for the initial setup.

## The course

There are 33 lessons across nine chapters, including a four-part final project.

| Chapter | Topics |
| --- | --- |
| 1. Getting started | Printing, basic syntax, variables, and reassignment |
| 2. Variables and data types | Naming, floats, booleans, and type conversion |
| 3. Numbers and operators | Arithmetic, floor division, modulo, and precedence |
| 4. Strings | Concatenation, f-strings, methods, indexing, and slicing |
| 5. Conditionals | Comparisons, `if` / `elif` / `else`, and logical operators |
| 6. Lists | Creating, indexing, modifying, and slicing lists |
| 7. Loops | `for`, `range`, and `while` |
| 8. Functions | Parameters, return values, conditions, and default arguments |
| 9. Trip Cost Estimator | A project covering calculations, fees, formatted output, and discounts |

Lessons combine explanations, runnable examples, prediction questions, error identification, fill-in-the-blank questions, and coding tasks. Hints and reference solutions are available when needed. The final project carries your accepted code forward between milestones.

Code drafts, lesson progress, quiz answers, XP, and streaks are saved locally on the device.

## Run locally

Use Node.js 22.12 or later with npm.

```sh
git clone https://github.com/Leventon416/python-fundamentals-offline.git
cd python-fundamentals-offline
npm ci
npm run dev
```

The install step copies Pyodide from `node_modules` into `src/renderer/public/pyodide`. If those assets are missing, restore them with:

```sh
npm run copy:pyodide
```

## Build and package

Run linting and the production build before packaging:

```sh
npm run lint
npm run build
```

`npm run build` copies the Python runtime, checks TypeScript, and compiles the application. Compiled files go into `out/`.

Choose a packaging command for your platform:

| Command | Output |
| --- | --- |
| `npm run build:win` | Windows x64 installer and portable executable |
| `npm run build:portable` | Windows x64 portable executable only |
| `npm run build:mac` | macOS package |
| `npm run build:linux` | Linux package |
| `npm run build:unpack` | Unpacked application directory |

Packaged output is written to `dist/`. Windows installer and portable targets are explicitly configured in `electron-builder.yml`; the macOS and Linux scripts use electron-builder's default targets.

For type checking without a build, run `npm run typecheck`.

## Working on the project

The app uses Electron, React, TypeScript, Monaco Editor, Tailwind CSS, and Zustand. electron-vite handles development and compilation.

| Path | Responsibility |
| --- | --- |
| `src/main/` | Desktop window, app lifecycle, and local asset loading |
| `src/preload/` | Bridge between Electron and the renderer |
| `src/renderer/src/components/` | Lesson views, editor, console, and navigation |
| `src/renderer/src/data/curriculum/` | Chapter content, starter code, solutions, and exercise checks |
| `src/renderer/src/types/curriculum.ts` | Lesson and test-case types |
| `src/renderer/src/workers/pythonWorker.ts` | Python runtime initialization and execution |
| `src/renderer/src/hooks/usePythonRunner.ts` | Worker lifecycle and execution timeout |
| `src/renderer/src/lib/testRunner.ts` | Exercise grading |
| `src/renderer/src/store/` | Course and quiz state, persisted in local storage |

To change a lesson, edit its chapter file under `data/curriculum/`. New chapters also need to be registered in that directory's `index.ts`.

Python code runs in a Web Worker. Executions that exceed five seconds are stopped, and the worker is restarted. Exercise checks can compare printed output, inspect variable values and types, call functions, and enforce code patterns defined by the lesson.
