import { PropsWithChildren, useEffect } from 'react'
import { Tabs } from '@radix-ui/themes'
import { FEATURE_FLAGS, MAIN_PAGE_FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { InboxNavigation } from '../inbox-navigation'
import { InboxLabOrder } from '../lab-orders'
import { MedicationOrderView } from '../medication-orders'
import { NotesView } from '../notes/notes-view'
import { SecureMessagesView } from '../secure-messages/secure-messages-view'
import { useStore } from './store'
import { Tabs as TabsEnum } from './types'

const MessagesTabs = () => {
  const {
    activeTab,
    fetchUnreadCount,
    fetchEmrDirectStatus,
    fetchNotes,
    notesData,
    loading,
    setActiveTab,
  } = useStore((state) => ({
    activeTab: state.activeTab,
    fetchUnreadCount: state.fetchUnreadCount,
    fetchEmrDirectStatus: state.fetchEmrDirectStatus,
    setActiveTab: state.setActiveTab,
    fetchNotes: state.fetchNotes,
    notesData: state.notesData,
    loading: state.loading,
  }))
  useEffect(() => {
    fetchUnreadCount()
    fetchEmrDirectStatus()
  }, [])
  useEffect(() => {
    const status =
      activeTab === TabsEnum.PENDING_NOTES ? ['pending'] : ['SignedPending']
    fetchNotes(status)
  }, [activeTab, fetchNotes])

  const status =
    activeTab === TabsEnum.PENDING_NOTES ? 'pending' : 'SignedPending'
  const isSureScriptFeatureFlag = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr7406Surescripts,
  )
  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex w-full flex-1 gap-3 overflow-y-auto"
    >
      <InboxNavigation />
      <TabsContent value={TabsEnum.INBOX}>
        <SecureMessagesView tab={TabsEnum.INBOX} />
      </TabsContent>
      <TabsContent value={TabsEnum.SENT}>
        <SecureMessagesView tab={TabsEnum.SENT} />
      </TabsContent>
      <TabsContent value={TabsEnum.ARCHIVED}>
        <SecureMessagesView tab={TabsEnum.ARCHIVED} />
      </TabsContent>
      <TabsContent value={TabsEnum.DRAFT}>
        <SecureMessagesView tab={TabsEnum.DRAFT} />
      </TabsContent>
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
      {isSureScriptFeatureFlag && (
        <TabsContent value={TabsEnum.MEDICATION_ORDERS}>
          <MedicationOrderView />
        </TabsContent>
      )}

      <TabsContent value={TabsEnum.LAB_RESULTS}>
        <InboxLabOrder />
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
