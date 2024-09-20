'use client'

import { useState } from 'react'
import { Flex, SegmentedControl } from '@radix-ui/themes'
import { SecureMessagesTable } from './secure-message-table'
import { SecureMessagesTab } from './types'

const SecureMessagesTabs = () => {
  const [activeTab, setActiveTab] = useState(SecureMessagesTab.ALL)

  return (
    <Flex direction="column">
      <SegmentedControl.Root
        className="mt-2 h-[32px] w-[416px]"
        value={activeTab}
      >
        <SegmentedControl.Item
          onClick={() => setActiveTab(SecureMessagesTab.ALL)}
          value={SecureMessagesTab.ALL}
        >
          All
        </SegmentedControl.Item>
        <SegmentedControl.Item
          onClick={() => setActiveTab(SecureMessagesTab.DRAFT)}
          value={SecureMessagesTab.DRAFT}
        >
          Drafts
        </SegmentedControl.Item>
        <SegmentedControl.Item
          onClick={() => setActiveTab(SecureMessagesTab.SENT)}
          value={SecureMessagesTab.SENT}
        >
          Sent
        </SegmentedControl.Item>
        <SegmentedControl.Item
          onClick={() => setActiveTab(SecureMessagesTab.ARCHIVED)}
          value={SecureMessagesTab.ARCHIVED}
        >
          Archived
        </SegmentedControl.Item>
      </SegmentedControl.Root>
      <SecureMessagesTable />
    </Flex>
  )
}

export { SecureMessagesTabs }
