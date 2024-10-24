'use client'

import { Flex, Tabs } from '@radix-ui/themes'
import { SecureMessagesTable } from './secure-message-table'
import { Tab } from './secure-messages-tab'
import { useStore } from './store'
import { SecureMessagesTab } from './types'

const SecureMessagesTabs = () => {
  const { setActiveTab, activeTab } = useStore((state) => state)

  return (
    <Flex direction="column" className=" p-2">
      <Tabs.Root className="mt-2 h-[32px] w-[416px]" value={activeTab}>
        <Tabs.List className="bg-pp-light-white flex rounded-2 p-1  [box-shadow:none]">
          <Tab
            text="Inbox"
            value={SecureMessagesTab.INBOX}
            onClick={() => setActiveTab(SecureMessagesTab.INBOX)}
          />
          <Tab
            text="Drafts"
            value={SecureMessagesTab.DRAFT}
            onClick={() => setActiveTab(SecureMessagesTab.DRAFT)}
          />

          <Tab
            text="Sent"
            value={SecureMessagesTab.SENT}
            onClick={() => setActiveTab(SecureMessagesTab.SENT)}
          />
          <Tab
            text="Archived"
            value={SecureMessagesTab.ARCHIVED}
            onClick={() => setActiveTab(SecureMessagesTab.ARCHIVED)}
          />
        </Tabs.List>
      </Tabs.Root>
      <SecureMessagesTable />
    </Flex>
  )
}

export { SecureMessagesTabs }
