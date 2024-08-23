'use client'

import { useEffect } from 'react'
import { useWarnIfUnsavedChanges } from '@/hooks'
import { useStore } from './quicknotes-store'

const QuickNotesSaver = () => {
  const { hasUnsavedChanges, setUnsavedChanges } = useStore((state) => ({
    setUnsavedChanges: state.setUnsavedChanges,
    hasUnsavedChanges: Object.values(state.unsavedChanges).some(
      (value) => value,
    ),
  }))

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type !== 'widget:dirty') {
        return
      }

      const { widgetId, isDirty } = event.data
      setUnsavedChanges(widgetId, isDirty)
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  useWarnIfUnsavedChanges(hasUnsavedChanges)
  return null
}

export { QuickNotesSaver }
