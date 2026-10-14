import { useEffect } from 'react'

interface GlobalShortcutsOptions {
  onSubmitTests?: () => void
  onPreviousLesson?: () => void
  onNextLesson?: () => void
  onToggleSidebar?: () => void
  onOpenCommandPalette?: () => void
  onCloseModals?: () => void
}

export function useGlobalShortcuts({
  onSubmitTests,
  onPreviousLesson,
  onNextLesson,
  onToggleSidebar,
  onOpenCommandPalette,
  onCloseModals
}: GlobalShortcutsOptions): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      const isModifier = e.ctrlKey || e.metaKey

      // Escape key: close any open modal or dialog
      if (e.key === 'Escape') {
        if (onCloseModals) {
          onCloseModals()
        }
        return
      }

      // Ctrl / Cmd + K: Open Command Palette
      if (isModifier && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        e.stopPropagation()
        onOpenCommandPalette?.()
        return
      }

      // Ctrl / Cmd + B: Toggle Curriculum Sidebar
      if (isModifier && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault()
        e.stopPropagation()
        onToggleSidebar?.()
        return
      }

      // Ctrl / Cmd + [: Previous Lesson
      if (isModifier && e.key === '[') {
        e.preventDefault()
        e.stopPropagation()
        onPreviousLesson?.()
        return
      }

      // Ctrl / Cmd + ]: Next Lesson
      if (isModifier && e.key === ']') {
        e.preventDefault()
        e.stopPropagation()
        onNextLesson?.()
        return
      }

      // Ctrl / Cmd + Enter: Submit & Run Tests
      if (isModifier && e.key === 'Enter') {
        // Prevent default form submission or newlines
        e.preventDefault()
        onSubmitTests?.()
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    onSubmitTests,
    onPreviousLesson,
    onNextLesson,
    onToggleSidebar,
    onOpenCommandPalette,
    onCloseModals
  ])
}
