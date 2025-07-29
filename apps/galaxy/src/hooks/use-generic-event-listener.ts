'use client'

import { useEffect } from 'react'

interface UseGenericEventListenerProps {
  eventType: string
  widgetId: string | string[]
  onEventTrigger: () => void
}

const useGenericEventListener = ({
  eventType,
  onEventTrigger,
  widgetId,
}: UseGenericEventListenerProps) => {
  useEffect(() => {
    const ids = Array.isArray(widgetId) ? widgetId : [widgetId]
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data?.type === eventType &&
        ids.includes(event.data?.widgetId)
      ) {
        setTimeout(() => {
          onEventTrigger()
        }, 3000)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [eventType, onEventTrigger])
}

export { useGenericEventListener }
