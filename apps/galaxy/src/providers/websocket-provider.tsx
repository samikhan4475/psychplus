'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getUserAuthAction, getUserSessionAction } from '@/actions'
import { useConstants } from '@/hooks/use-constants'
import { webSocketEventBus } from '@/lib/websocket-event-bus'
import { WebSocketEventType } from '@/types'

export const WebSocketConnector = () => {
  const { webSocketUrl } = useConstants()

  const [connectionStatus, setConnectionStatus] = useState<
    'connected' | 'disconnected' | 'connecting'
  >('connecting')
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 7
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

      const delay = 10000
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

      try {
        const auth = await getUserAuthAction()
        if (!auth) {
          isLoggedOut.current = true
        }
      } catch (error) {
        console.error('Error while checking auth after WebSocket error:', error)
        // Optionally handle the error or notify the user
      } finally {
        if (wsRef?.current) {
          ws.close()
        }
      }
    }
  }, [])

  useEffect(() => {
    isLoggedOut.current = false
    try {
      connectWebSocket()
    } catch (e) {
      console.error('WebSocket setup failed:', e)
    }
    return () => {
      if (wsRef?.current) {
        wsRef?.current?.close()
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

  console.log('Socket ' + connectionStatus)

  return null
}
