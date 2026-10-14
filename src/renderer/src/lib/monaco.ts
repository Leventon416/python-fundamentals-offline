import * as monaco from 'monaco-editor'
import { loader } from '@monaco-editor/react'
import editorWorker from 'monaco-editor/editor/editor.worker?worker'

// 1. Configure local Monaco Environment with local worker to prevent any CDN/network requests
self.MonacoEnvironment = {
  getWorker() {
    return new editorWorker()
  }
}

// 2. Force @monaco-editor/react to use bundled local monaco instance
loader.config({ monaco })

// 3. Define Coddy-inspired dark theme
export const CODDY_DARK_THEME = 'coddy-dark'

monaco.editor.defineTheme(CODDY_DARK_THEME, {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: '', foreground: 'e2e8f0', background: '0f172a' },
    // Keywords & flow control
    { token: 'keyword', foreground: 'c084fc', fontStyle: 'bold' },
    { token: 'keyword.control', foreground: 'c084fc', fontStyle: 'bold' },
    { token: 'keyword.operator', foreground: 'f43f5e' },
    // Strings & numbers
    { token: 'string', foreground: '34d399' },
    { token: 'string.escape', foreground: '2dd4bf' },
    { token: 'number', foreground: 'fbbf24' },
    // Comments
    { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
    // Functions & Built-ins
    { token: 'type', foreground: '38bdf8' },
    { token: 'identifier', foreground: 'e2e8f0' },
    { token: 'delimiter', foreground: '94a3b8' },
    { token: 'operator', foreground: '38bdf8' }
  ],
  colors: {
    'editor.background': '#0f172a',
    'editor.foreground': '#f8fafc',
    'editorLineNumber.foreground': '#475569',
    'editorLineNumber.activeForeground': '#38bdf8',
    'editor.selectionBackground': '#1e293b',
    'editor.inactiveSelectionBackground': '#1e293b80',
    'editorCursor.foreground': '#10b981',
    'editor.lineHighlightBackground': '#1e293b50',
    'editorGutter.background': '#0f172a',
    'editorIndentGuide.background1': '#33415540',
    'editorIndentGuide.activeBackground1': '#38bdf860',
    'editorBracketMatch.background': '#1e293b',
    'editorBracketMatch.border': '#10b981',
    'editorOverviewRuler.border': '#0f172a',
    'scrollbarSlider.background': '#33415560',
    'scrollbarSlider.hoverBackground': '#47556980',
    'scrollbarSlider.activeBackground': '#64748b'
  }
})

export { monaco }
