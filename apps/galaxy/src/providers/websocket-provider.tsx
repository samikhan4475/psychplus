'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { getUserAuthAction, getUserSessionAction } from '@/actions'
import { useConstants } from '@/hooks/use-constants'
import { webSocketEventBus } from '@/lib/websocket-event-bus'
import { WebSocketEventType } from '@/types'

type WebSocketContextType = {
  sendMessage: (
    type: WebSocketEventType,
    payload?: Record<string, unknown>,
  ) => void
  connectionStatus: 'connected' | 'disconnected' | 'connecting'
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
)

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { webSocketUrl } = useConstants()

  const [connectionStatus, setConnectionStatus] = useState<
    'connected' | 'disconnected' | 'connecting'
  >('connecting')
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 100
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isLoggedOut = useRef(false)

  const connectWebSocket = useCallback(() => {
    if (reconnectAttempts.current >= maxReconnectAttempts) {
      console.error('Max reconnect attempts reached.')
      return
    }

    if (isLoggedOut.current) {
      console.log('Socket will not reconnect due to logout.')
      return
    }
    setConnectionStatus('connecting')
    const ws = new WebSocket(webSocketUrl)
    wsRef.current = ws

    ws.onopen = async () => {
      reconnectAttempts.current = 0

      const userSessionResponse = await getUserSessionAction()
      if (userSessionResponse.state === 'error') {
        console.log('Failed to authenticate WebSocket')
        isLoggedOut.current = true
        ws.close()
        return
      }

      const { data } = userSessionResponse
      if (!data?.sessionId || !data?.refreshToken) {
        ws.close()
        return
      }

      sendMessage(WebSocketEventType.Auth, {
        userId: data.user?.userId,
        refreshToken: data.refreshToken,
        sessionId: data.sessionId,
      })

      setConnectionStatus('connected')

      if (!pingIntervalRef.current) {
        pingIntervalRef.current = setInterval(() => {
          console.log('sending ping')
          sendMessage(WebSocketEventType.Pong)
        }, 29000)
      }
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.id) {
          webSocketEventBus.emit(data.id, data)
        }
      } catch (_) {
        console.warn('Invalid WebSocket message:', event.data)
      }
    }

    ws.onclose = () => {
      setConnectionStatus('disconnected')
      if (isLoggedOut.current) {
        console.log('WebSocket will not reconnect due to logout.')
        return
      }

      const delay = 3000
      console.log(
        `WebSocket closed. Reconnecting in ${delay / 1000} seconds...`,
      )

      reconnectAttempts.current += 1

      clearInterval(pingIntervalRef.current!)
      pingIntervalRef.current = null

      setTimeout(connectWebSocket, delay)
    }

    ws.onerror = async (event) => {
      console.warn('WebSocket Error:', event)

      const auth = await getUserAuthAction()
      if (!auth) {
        isLoggedOut.current = true
      }
      ws.close()
    }
  }, [])

  useEffect(() => {
    isLoggedOut.current = false
    connectWebSocket()
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      clearInterval(pingIntervalRef.current!)
    }
  }, [])

  const sendMessage = useCallback(
    (type: WebSocketEventType, payload: object = {}) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type, ...payload }))
      }
    },
    [],
  )
  const ctxValue = useMemo(
    () => ({
      sendMessage,
      connectionStatus,
    }),
    [sendMessage, connectionStatus],
  )

  console.log('Socket ' + connectionStatus)

  return (
    <WebSocketContext.Provider value={ctxValue}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}
