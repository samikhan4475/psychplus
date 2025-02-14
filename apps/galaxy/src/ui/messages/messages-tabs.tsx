import { Tabs } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'
import { InboxNavigation } from '../inbox-navigation'
import { PendingNotesView } from './pending-notes-view'
import { useStore } from './store'
import { Tabs as TabsEnum } from './types'

const MessagesTabs = () => {
  const { activeTab, setActiveTab } = useStore((state) => state)
  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex w-full flex-1 gap-3 overflow-y-auto"
    >
      <InboxNavigation />
      <TabsContent value={TabsEnum.PENDING_NOTES}>
        <PendingNotesView />
      </TabsContent>
    </Tabs.Root>
  )
}

const TabsContent = ({
  value,
  children,
}: PropsWithChildren<{ value: string }>) => {
  const visitedTabs = useStore((state) => state.visitedTabs)
  return (
    <Tabs.Content
      value={value}
      className="hidden flex-1 flex-col overflow-y-auto data-[state=active]:flex"
      forceMount={visitedTabs.has(value) ? true : undefined}
    >
      {children}
    </Tabs.Content>
  )
}

export { MessagesTabs }
