'use client'

import * as React from 'react'
import { useMemo, useRef } from 'react'

type PublishFunc = <T>(event: string, data?: T | undefined) => void
type SubscribeFunc = <T>(type: string, handler: (data: T) => void) => () => void

interface PubsubContextType {
  publish: PublishFunc
  subscribe: SubscribeFunc
}

const PubsubContext = React.createContext<PubsubContextType | undefined>(
  undefined,
)

interface PubsubProviderProps {
  allowedOrigins?: string[]
}

const PubsubProvider = ({
  allowedOrigins = ['*'],
  children,
}: React.PropsWithChildren<PubsubProviderProps>) => {
  const _allowedOrigins = useRef(allowedOrigins)

  const value = useMemo(
    () => ({
      publish: publish(_allowedOrigins.current),
      subscribe: subscribe(_allowedOrigins.current),
    }),
    [],
  )

  return (
    <PubsubContext.Provider value={value}>{children}</PubsubContext.Provider>
  )
}

const usePubsub = () => {
  const pubsub = React.useContext(PubsubContext)
  if (!pubsub) {
    throw new Error(
      'PubsubContext not found. Did you forget to use PubsubProvider?',
    )
  }
  return pubsub
}

const publish =
  (allowedOrigins: Iterable<string>) =>
  <T,>(event: string, data?: T) => {
    const message = { type: event, data }

    // Publish message to self always.
    safePostMessage(window, message, allowedOrigins)

    if (window.parent !== window.self) {
      // Window is a child (embedded); publish message to parent window.
      safePostMessage(window.parent, message, allowedOrigins)
    } else {
      // Window is root window (not embedded); publish message to child windows.
      document.querySelectorAll('iframe').forEach((i) => {
        safePostMessage(i.contentWindow, message, allowedOrigins)
      })
    }
  }

const safePostMessage = (
  window: Window | null,
  message: any,
  allowedOrigins: Iterable<string>,
) => {
  if (window) {
    for (const origin of allowedOrigins) {
      // Specify origin of target window for security purposes.
      // See: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#security_concerns
      //
      // If the origin of the target window doesn't match the given target origin,
      // the message is discarded, to avoid information leakage.
      window.postMessage(message, origin)
    }
  }
}

interface Message<T> {
  type: string
  data: T
}

const subscribe = (allowedOrigins: Iterable<string>) => {
  const _allowedOrigins = new Set(allowedOrigins)

  return <T,>(type: string, handler: (data: T) => void) => {
    const listener = (message: MessageEvent<Message<T>>) => {
      // Verify origin of message for security purposes.
      // See: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#security_concerns
      if (!_allowedOrigins.has(message.origin) && !_allowedOrigins.has('*')) {
        console.debug(`rejected message with unknown origin: ${message.origin}`)
        return
      }

      if (message.data.type === type) {
        handler(message.data.data)
      }
    }

    window.addEventListener('message', listener)

    return () => {
      window.removeEventListener('message', listener)
    }
  }
}

export { safePostMessage, usePubsub, PubsubProvider }
