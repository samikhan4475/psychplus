'use client'

import { useEffect, useMemo, useState } from 'react'
import { Flex, IconButton, Text, Tooltip } from '@radix-ui/themes'
import { Info } from 'lucide-react'
import { CloseIcon } from '@/components/icons/close-icon'
import { MegaPhoneIcon } from '@/components/icons/megaphone-icon'
import { webSocketEventBus } from '@/lib/websocket-event-bus'
import { WebSocketEventType } from '@/types'

const ICONS_MAPPING: Partial<Record<WebSocketEventType, JSX.Element>> = {
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

    webSocketEventBus.on(WebSocketEventType.ScrollAlert, (msg) =>
      handleScrollEvent(WebSocketEventType.ScrollAlert, msg),
    )

    webSocketEventBus.on(WebSocketEventType.ScrollMessage, (msg) =>
      handleScrollEvent(WebSocketEventType.ScrollMessage, msg),
    )

    return () => {
      webSocketEventBus.off(WebSocketEventType.ScrollAlert, (msg) =>
        handleScrollEvent(WebSocketEventType.ScrollAlert, msg),
      )
      webSocketEventBus.off(WebSocketEventType.ScrollMessage, (msg) =>
        handleScrollEvent(WebSocketEventType.ScrollMessage, msg),
      )
    }
  }, [])

  const icon = useMemo(
    () => (alert.type ? ICONS_MAPPING[alert.type] ?? null : null),
    [alert.type],
  )

  if (!alert.message) return null

  const onCloseAlert = () => setAlert({ message: '', type: null })

  return (
    <Flex
      justify="between"
      gap="1"
      align="center"
      className="max-w-[calc(100vw-915px)]"
    >
      {icon}
      <Tooltip content={alert.message}>
        <Text size="1" className="flex-1 truncate">
          {alert.message}
        </Text>
      </Tooltip>
      <Tooltip content="Remove">
        <IconButton
          onClick={onCloseAlert}
          size="1"
          type="button"
          color="red"
          radius="full"
          variant="ghost"
        >
          <CloseIcon width={14} height={14} />
        </IconButton>
      </Tooltip>
    </Flex>
  )
}

export { ScrollAlert }
