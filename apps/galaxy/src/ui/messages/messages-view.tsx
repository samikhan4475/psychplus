'use client'

import { StoreProvider } from '@/ui/messages/store'
import { MessagesTabs } from './messages-tabs'
import { Tabs as TabsEnum } from './types'

const MessagesView = ({ tab }: { tab: TabsEnum }) => {
  return (
    <StoreProvider tab={tab}>
      <MessagesTabs />
    </StoreProvider>
  )
}

export { MessagesView }
