# Python Fundamentals - Offline Learning Journey

[![Electron](https://img.shields.io/badge/Electron-39.2-47848F?style=for-the-badge&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Pyodide](https://img.shields.io/badge/Pyodide-WASM-FFD43B?style=for-the-badge&logo=python&logoColor=blue)](https://pyodide.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Offline](https://img.shields.io/badge/Status-100%25_Offline-10B981?style=for-the-badge&logo=offline&logoColor=white)](#)

A high-performance, completely offline desktop learning environment inspired by modern interactive coding platforms (such as Coddy.tech). Run and test real Python code directly inside your desktop client using WebAssembly — **no Python installation, external interpreters, or internet connection required**.

---

## 🌟 Key Features

- **⚡ 100% Offline Python Execution (Pyodide & WASM)**: Runs full CPython compiled to WebAssembly inside an isolated Web Worker. Features infinite-loop detection, stdout/stderr stream interception, and execution time monitoring without freezing the UI.
- **💻 Monaco Code Editor**: Powered by VS Code's editor engine with custom dark theme, intelligent syntax highlighting, auto-closing brackets, and keyboard shortcuts (`Ctrl+Enter` to run & grade).
- **🧩 Multi-Step Pedagogical Engine**: Lessons are broken down into bite-sized micro-steps:
  - **Concept Explanation**: Clear theory with highlighted syntax breakdowns.
  - **Worked Examples**: Demonstrative code snippets with instant stdout previews.
  - **Predict the Output**: Multiple-choice checks that build mental model tracing skills.
  - **Identify the Error & Fill in the Blanks**: Interactive problem-solving before coding.
  - **Interactive Coding Tasks**: Hands-on exercises with hints, scaffolding, and instant grading.
- **📚 9 Comprehensive Chapters (33 Lessons & Project)**:
  - **Ch 1: Getting Started** (print, syntax, strings, numbers, reassignments)
  - **Ch 2: Variables & Data Types** (snake_case, float, bool, type conversions)
  - **Ch 3: Numbers & Basic Math** (arithmetic, floor division, modulo, exponents)
  - **Ch 4: Strings & Text** (concatenation, f-strings, methods, slicing)
  - **Ch 5: Conditionals & Logic** (if/elif/else, comparisons, boolean operators)
  - **Ch 6: Lists & Collections** (indexes, append/pop, len, slicing)
  - **Ch 7: Loops & Iteration** (for loops, range, while loops, accumulators)
  - **Ch 8: Functions & Scope** (def, parameters, return values, default arguments)
  - **Ch 9: Final Capstone Project** (4-Milestone "Trip Cost Estimator" with cumulative code carry-forward)
- **🎯 Multi-Strategy Automated Grading**:
  - Exact stdout comparison with whitespace and line-ending normalization
  - Real-time internal variable state inspection (type validation & value checks)
  - Function argument & return value verification including hidden edge cases
  - AST-based static constraints (e.g. verifying variables are declared or required methods are invoked)
- **💾 Local Storage Persistence & Gamification**:
  - Automatically saves code drafts with smart cache-busting and solution sanitization
  - Streaks, XP tracking, lesson unlocked progression, and assisted vs. independent completion badges
- **🔊 Synthesized Audio & Quick Navigation**:
  - Procedural sound effects powered by the Web Audio API (success chimes and error tones)
  - Spotlight Command Palette (`Ctrl+K`) for jumping between lessons, running code, and toggling features

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Electron 39** | Cross-platform native desktop runtime |
| **React 19** | Component-driven user interface |
| **TypeScript 5.9** | Strict, end-to-end type safety |
| **Pyodide (v0.27 / WASM)** | Sandboxed client-side Python interpreter in Web Worker |
| **Monaco Editor** | Code editing experience with VS Code fidelity |
| **Tailwind CSS v4** | Design system with responsive glassmorphism & dark aesthetics |
| **Zustand** | Lightweight client state management with localStorage persistence |
| **Lucide Icons & Canvas Confetti** | Visual icons and celebratory animations |
| **Electron-Vite** | Blazing-fast build toolchain and hot-reloading dev server |

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18, v20, or v22+ recommended)
- `npm` (included with Node.js)

### 1. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/Leventon416/python-fundamentals-offline.git
cd python-fundamentals-offline
npm install
```

### 2. Run Locally in Development Mode
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### 3. Build & Package for Production
Build standalone executables for your operating system:

```bash
# Package Windows installer (.exe) & portable binary
npm run build:win

# Or generate portable package:
npm run build:portable

# For macOS:
npm run build:mac

# For Linux (AppImage / deb):
npm run build:linux
```
Output binaries will be placed in the `dist/` directory.

---

## ⌨️ Global Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + Enter` / `Cmd + Enter` | Run code & evaluate test suite |
| `Ctrl + K` / `Cmd + K` | Open Spotlight Command Palette |
| `Ctrl + [` | Navigate to previous lesson |
| `Ctrl + ]` | Navigate to next lesson |
| `Ctrl + B` | Toggle curriculum sidebar |
| `Escape` | Close active modals & command palette |

---

## 📂 Project Architecture

```
├── build/                        # App icons and packaging resources
├── resources/                    # Runtime platform binaries and assets
├── src/
│   ├── main/                     # Electron main process (lifecycle, window management)
│   ├── preload/                  # Electron preload scripts (secure context bridge)
│   └── renderer/                 # React frontend application
│       ├── public/pyodide/       # Bundled offline WebAssembly Pyodide runtime
│       └── src/
│           ├── assets/           # Global styles and Tailwind v4 CSS
│           ├── components/
│           │   ├── common/       # Markdown renderer, modal wrappers, confetti
│           │   ├── layout/       # Header, Sidebar, Command Palette, Stats
│           │   └── workspace/    # EditorPanel, ConsoleDock, LessonPanel, Steps
│           ├── data/curriculum/  # Chapters 1-9 structured curriculum & test cases
│           ├── hooks/            # Pyodide runner worker hook, global keyboard shortcuts
│           ├── lib/              # Test suite grading harness, Web Audio sound synthesis
│           ├── store/            # Zustand stores (useCourseStore, useQuizStore)
│           └── types/            # Curriculum, test cases, and application TypeScript types
├── electron.vite.config.ts       # Multi-target Vite bundler configuration
└── package.json                  # Scripts and dependencies
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
