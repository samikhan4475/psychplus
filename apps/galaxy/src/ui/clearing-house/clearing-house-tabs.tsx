'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { ReceiverTabView } from './receiver-tab'
import { useStore } from './store'
import { ClearingHouseTab } from './types'

const ClearingHouseTabs = () => {
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))

  return (
    <Box className="flex-1 px-1 pt-1">
      <Tabs.Root
        defaultValue={ClearingHouseTab.Receiver}
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex w-full flex-col"
      >
        <Flex className="z-50">
          <Tabs.List>
            <TabsTrigger value={ClearingHouseTab.Receiver}>
              {ClearingHouseTab.Receiver}
            </TabsTrigger>
            <TabsTrigger value={ClearingHouseTab.Submitter}>
              {ClearingHouseTab.Submitter}
            </TabsTrigger>
          </Tabs.List>
        </Flex>
        <TabsContent value={ClearingHouseTab.Receiver}>
          <ReceiverTabView />
        </TabsContent>
        <TabsContent value={ClearingHouseTab.Submitter}>
          <div>submitter </div>
        </TabsContent>
      </Tabs.Root>
    </Box>
  )
}

const TabsContent = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  const viewedTabs = useStore((state) => state.viewedTabs)
  return (
    <Tabs.Content
      forceMount={viewedTabs.has(value) ? true : undefined}
      value={value}
      className="hidden flex-1 flex-col gap-2 data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { ClearingHouseTabs }
