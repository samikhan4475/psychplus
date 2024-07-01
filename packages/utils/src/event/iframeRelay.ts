'use client'

import { useEffect } from 'react'
import { safePostMessage } from './pubsub'

interface TypedEvent {
  type: string
  data: any
}

const useIframeRelay = () => {
  useEffect(() => {
    const iframes = document.querySelectorAll('iframe')
    const listener = (message: MessageEvent<TypedEvent>) => {
      // If current window is an iframe, relay message to parent window
      if (window.parent !== window.self) {
        safePostMessage(window.parent, message.data, ['*'])
      }

      // Relay message to all nested iframes except the source iframe
      iframes.forEach((i) => {
        if (message.source === i.contentWindow) {
          return
        }
        safePostMessage(i.contentWindow, message.data, ['*'])
      })
    }

    window.addEventListener('message', listener)

    return () => {
      window.removeEventListener('message', listener)
    }
  }, [])
}

export { useIframeRelay }

/**
 * This hook enables message relaying from nested iframes to the root window.
 * It's useful for widgets with sub-widgets in iframes that need to communicate with the root window.
 * Ensures popups open in the main window rather than within nested iframes.
 */
