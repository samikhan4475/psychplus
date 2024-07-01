'use client'

import { useEffect } from 'react'
import { safePostMessage } from './pubsub'

interface TypedEvent {
  type: string
  data: any
}

const useRelay = () => {
  useEffect(() => {
    const iframes = document.querySelectorAll('iframe')

    const listener = (message: MessageEvent<TypedEvent>) => {

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

export { useRelay }
