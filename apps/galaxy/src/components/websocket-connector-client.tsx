'use client'

import dynamic from 'next/dynamic'

const WebSocketConnector = dynamic(
  () =>
    import('@/providers/websocket-provider.tsx').then(
      (mod) => mod.WebSocketConnector,
    ),
  { ssr: false },
)

export { WebSocketConnector }