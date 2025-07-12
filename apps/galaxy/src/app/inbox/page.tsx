'use client'

import { MessagesView } from '@/ui/messages/messages-view'
import { Tabs } from '@/ui/messages/types'

const MessagesPage = ({ searchParams }: { searchParams: { tab: Tabs } }) => {
  let tab = searchParams.tab
  if (!Object.values(Tabs).includes(tab)) {
    tab = Tabs.INBOX
  }

  return <MessagesView tab={tab} />
}

export default MessagesPage
