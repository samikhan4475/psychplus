'use client'

import { useEffect, useMemo, useState } from 'react'
import { Flex, IconButton, Text, Tooltip } from '@radix-ui/themes'
import { Info } from 'lucide-react'
import { CloseIcon, MegaPhoneIcon } from '@/components/icons'
import { webSocketEventBus } from '@/lib/websocket-event-bus'
import { WebSocketEventType } from '@/types'

const ICON_MAP: Partial<Record<WebSocketEventType, JSX.Element>> = {
  [WebSocketEventType.ScrollMessage]: <MegaPhoneIcon />,
  [WebSocketEventType.ScrollAlert]: (
    <Info className="text-yellow-8" size={14} />
  ),
}

const ScrollAlert = () => {
  const [alert, setAlert] = useState<{
    message: string
    type: WebSocketEventType | null
  }>({
    message: '',
    type: null,
  })

  useEffect(() => {
    const handleScrollEvent = (
      type: WebSocketEventType,
      message?: { sv?: string },
    ) => {
      if (message?.sv) {
        setAlert({ message: message.sv, type })
      }
    }

    webSocketEventBus.on(WebSocketEventType.ScrollMessage, (msg) =>
      handleScrollEvent(WebSocketEventType.ScrollMessage, msg),
    )
    webSocketEventBus.on(WebSocketEventType.ScrollAlert, (msg) =>
      handleScrollEvent(WebSocketEventType.ScrollAlert, msg),
    )

    return () => {
      webSocketEventBus.off(WebSocketEventType.ScrollMessage, (msg) =>
        handleScrollEvent(WebSocketEventType.ScrollMessage, msg),
      )
      webSocketEventBus.off(WebSocketEventType.ScrollAlert, (msg) =>
        handleScrollEvent(WebSocketEventType.ScrollAlert, msg),
      )
    }
  }, [])

  const icon = useMemo(
    () => (alert.type ? ICON_MAP[alert.type] ?? null : null),
    [alert.type],
  )

  if (!alert.message) return null

  return (
    <Flex
      className="max-w-[calc(100vw-915px)]"
      justify="between"
      gap="1"
      align="center"
    >
      {icon}
      <Tooltip content={alert.message}>
        <Text size="1" className="flex-1 truncate">
          {alert.message}
        </Text>
      </Tooltip>
      <Tooltip content="Remove">
        <IconButton
          size="1"
          variant="ghost"
          color="red"
          type="button"
          radius="full"
          onClick={() => setAlert({ message: '', type: null })}
        >
          <CloseIcon width={14} height={14} />
        </IconButton>
      </Tooltip>
    </Flex>
  )
}

export { ScrollAlert }
