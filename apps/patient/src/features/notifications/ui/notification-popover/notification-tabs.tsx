'use client'

import React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { NotificationTab } from '../constants'
import { NotificationTabCount } from './notification-tab-count'

const tabsItemClasses =
  'h-[40px] text-[#79808F] text-2 justify-evenly items-center border-t-none border-x-none font-sans font-light transition duration-1000 data-[state=active]:border-[#194595] data-[state=active]:border-b-[2px] outline-none data-[state=active]:text-[#1C2024] data-[state=active]:font-bold mt-3'

const NotificationTabs = () => {
  return (
    <Tabs.Root defaultValue={NotificationTab.All}>
      <Tabs.List className="flex gap-x-8 border-b border-[#D4D4D4] px-5">
        <Tabs.Trigger className={tabsItemClasses} value={NotificationTab.All}>
          {NotificationTab.All}
        </Tabs.Trigger>
        <Tabs.Trigger
          className={tabsItemClasses}
          value={NotificationTab.Appointments}
        >
          <Flex className="gap-x-2">
            {NotificationTab.Appointments}
            <NotificationTabCount count="6" />
          </Flex>
        </Tabs.Trigger>
        <Tabs.Trigger
          className={tabsItemClasses}
          value={NotificationTab.Others}
        >
          {NotificationTab.Others}
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )
}

export { NotificationTabs }
