'use client'

import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { MailIcon } from 'lucide-react'
import { CountIndicator } from '@/components'
import { webSocketEventBus } from '@/lib/websocket-event-bus'
import { useStore } from '@/store'
import { WebSocketEventType } from '@/types'

interface InboxLinkProps {
  href: string
  label: string
  inboxCountTotal?: number
}

const InboxLink = ({ href, label, inboxCountTotal }: InboxLinkProps) => {
  const addTab = useStore((state) => state.addTab)
  const [inboxCount, setInboxCount] = useState(inboxCountTotal ?? 0)

  useEffect(() => {
    const handleInboxCount = (message: { lv?: number }) => {
      setInboxCount(message.lv ?? 0)
    }

    webSocketEventBus.on(WebSocketEventType.InboxCount, handleInboxCount)

    return () => {
      webSocketEventBus.off(WebSocketEventType.InboxCount, handleInboxCount)
    }
  }, [])

  return (
    <NextLink
      href={href}
      onClick={() => {
        addTab({
          href: href,
          label,
        })
      }}
      className="flex items-center gap-1 rounded-2 px-1 text-[16px]"
    >
      <CountIndicator count={inboxCount} maxCount={999}>
        <MailIcon width={16} height={16} strokeWidth={1.25} />
      </CountIndicator>
      Inbox
    </NextLink>
  )
}

export { InboxLink }
