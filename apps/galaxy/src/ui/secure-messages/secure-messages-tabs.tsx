'use client'

import { Flex, Tabs } from '@radix-ui/themes'
import { SecureMessagesTable } from './secure-message-table'
import { Tab } from './secure-messages-tab'
import { useStore } from './store'
import { ActiveComponent, SecureMessagesTab } from './types'

const SecureMessagesTabs = () => {
  const {
    setActiveTab,
    activeTab,
    setPreviewSecureMessage,
    setActiveComponent,
  } = useStore((state) => state)
  const closeMessage = (tab: SecureMessagesTab) => {
    setPreviewSecureMessage({ activeTab, secureMessage: null })
    setActiveTab(tab)
    setActiveComponent(ActiveComponent.NEW_EMAIL_PLACEHOLDER)
  }
  return (
    <Flex direction="column" className="p-2">
      <Tabs.Root className="mt-2 h-[32px] w-[416px]" value={activeTab}>
        <Tabs.List className="bg-pp-light-white flex rounded-2 p-1 [box-shadow:none]">
          <Tab
            text="Inbox"
            value={SecureMessagesTab.INBOX}
            onClick={closeMessage}
          />
          <Tab
            text="Drafts"
            value={SecureMessagesTab.DRAFT}
            onClick={closeMessage}
          />

          <Tab
            text="Sent"
            value={SecureMessagesTab.SENT}
            onClick={closeMessage}
          />
          <Tab
            text="Archived"
            value={SecureMessagesTab.ARCHIVED}
            onClick={closeMessage}
          />
        </Tabs.List>
      </Tabs.Root>
      <SecureMessagesTable />
    </Flex>
  )
}

export { SecureMessagesTabs }
