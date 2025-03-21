'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { getUserSessionAction } from '@/actions'
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
  const maxReconnectAttempts = 10
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const connectWebSocket = () => {
    if (reconnectAttempts.current >= maxReconnectAttempts) {
      console.error('Max reconnect attempts reached.')
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
          sendMessage(WebSocketEventType.Ping)
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
        console.log('Invalid WebSocket message:', event.data)
      }
    }

    ws.onclose = () => {
      setConnectionStatus('disconnected')

      const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30000) // Exponential backoff up to 30s
      console.log(
        `WebSocket closed. Reconnecting in ${delay / 1000} seconds...`,
      )

      reconnectAttempts.current += 1

      clearInterval(pingIntervalRef.current!)
      pingIntervalRef.current = null

      setTimeout(connectWebSocket, delay)
    }

    ws.onerror = (event) => {
      console.error('WebSocket Error:', event)
      ws.close()
    }
  }
  useEffect(() => {
    connectWebSocket()
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      clearInterval(pingIntervalRef.current!)
    }
  }, [])

  const sendMessage = (type: WebSocketEventType, payload: object = {}) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      if (payload && Object.keys(payload)?.length > 0) {
        wsRef.current.send(JSON.stringify({ type, ...payload }))
      } else {
        wsRef.current.send(JSON.stringify(type))
      }
    }
  }

  console.log('Socket ' + connectionStatus)
  return (
    <WebSocketContext.Provider
      value={{
        sendMessage,
        connectionStatus,
      }}
    >
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
