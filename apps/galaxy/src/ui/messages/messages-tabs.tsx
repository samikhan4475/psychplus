import { PropsWithChildren, useEffect } from 'react'
import { Tabs } from '@radix-ui/themes'
import { InboxNavigation } from '../inbox-navigation'
import { NotesView } from '../notes/notes-view'
import { useStore } from './store'
import { Tabs as TabsEnum } from './types'

const MessagesTabs = () => {
  const { activeTab, setActiveTab, fetchNotes, notesData, loading } = useStore(
    (state) => state,
  )

  useEffect(() => {
    const status =
      activeTab === TabsEnum.PENDING_NOTES ? ['pending'] : ['SignedPending']
    fetchNotes(status)
  }, [activeTab, fetchNotes])

  const status =
    activeTab === TabsEnum.PENDING_NOTES ? 'pending' : 'SignedPending'

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex w-full flex-1 gap-3 overflow-y-auto"
    >
      <InboxNavigation />
      <TabsContent value={TabsEnum.PENDING_NOTES}>
        <NotesView
          patientNotes={notesData}
          loading={loading}
          isInboxNotes={true}
          tab={status}
        />
      </TabsContent>
      <TabsContent value={TabsEnum.PENDING_COSIGNER_NOTES}>
        <NotesView
          patientNotes={notesData}
          loading={loading}
          isInboxNotes={true}
          tab={status}
        />
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
