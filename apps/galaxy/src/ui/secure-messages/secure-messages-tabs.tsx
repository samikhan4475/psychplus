'use client'

import { useState } from 'react'
import { Flex, Tabs } from '@radix-ui/themes'
import { SecureMessagesTable } from './secure-message-table'
import { ActiveComponentProps, SecureMessagesTab } from './types'

const SecureMessagesTabs = ({ setActiveComponent }: ActiveComponentProps) => {
  const [activeTab, setActiveTab] = useState(SecureMessagesTab.ALL)
  return (
    <Flex direction="column" className=" p-2">
      <Tabs.Root className="mt-2 h-[32px] w-[416px]" value={activeTab}>
        <Tabs.List className="bg-pp-light-white flex rounded-2 p-1  [box-shadow:none]">
          <Tabs.Trigger
            className="text-sm text-gray-600  data-[state=active]:bg-white data-[state=active]:shadow-md text-pp-gray-3 data-[state=active]:text-black h-[24px] w-[99px] rounded-2 px-4  py-1 font-medium focus:outline-none data-[state=active]:before:w-0"
            value={SecureMessagesTab.ALL}
            onClick={() => setActiveTab(SecureMessagesTab.ALL)}
          >
            All
          </Tabs.Trigger>
          <Tabs.Trigger
            className="text-sm text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-md text-pp-gray-3 data-[state=active]:text-black h-[24px] w-[99px] rounded-2  px-4 py-1 font-medium focus:outline-none data-[state=active]:before:w-0"
            value={SecureMessagesTab.DRAFT}
            onClick={() => setActiveTab(SecureMessagesTab.DRAFT)}
          >
            Drafts
          </Tabs.Trigger>
          <Tabs.Trigger
            className="text-sm text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-md text-pp-gray-3 data-[state=active]:text-black h-[24px] w-[99px] rounded-2  px-4 py-1 font-medium focus:outline-none data-[state=active]:before:w-0"
            value={SecureMessagesTab.SENT}
            onClick={() => setActiveTab(SecureMessagesTab.SENT)}
          >
            Sent
          </Tabs.Trigger>
          <Tabs.Trigger
            className="text-sm text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-black text-pp-gray-3 h-[24px] w-[99px] rounded-2  px-4 py-1 font-medium focus:outline-none data-[state=active]:before:w-0"
            value={SecureMessagesTab.ARCHIVED}
            onClick={() => setActiveTab(SecureMessagesTab.ARCHIVED)}
          >
            Archived
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <SecureMessagesTable setActiveComponent={setActiveComponent} />
    </Flex>
  )
}

export { SecureMessagesTabs }
