'use client'

import { useEffect } from 'react'

interface UseGenericEventListenerProps {
  eventType: string
  widgetId: string
  onEventTrigger: () => void
}

const useGenericEventListener = ({
  eventType,
  onEventTrigger,
  widgetId,
}: UseGenericEventListenerProps) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === eventType && event.data?.widgetId === widgetId) {
        onEventTrigger()
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [eventType, onEventTrigger])
}

export { useGenericEventListener }
