'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { OrganizationsTabView } from './organizations'
import { PracticesTabView } from './practices'
import { useStore } from './store'
import { OrganizationPracticeTab } from './types'

const OrganizationPracticeTabs = () => {
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))

  return (
    <Box className="flex-1 px-1 pt-1">
      <Tabs.Root
        defaultValue={OrganizationPracticeTab.ORGANIZATIONS}
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex w-full flex-col"
      >
        <Flex className="z-50">
          <Tabs.List>
            <TabsTrigger value={OrganizationPracticeTab.ORGANIZATIONS}>
              {OrganizationPracticeTab.ORGANIZATIONS}
            </TabsTrigger>
            <TabsTrigger value={OrganizationPracticeTab.PRACTICES}>
              {OrganizationPracticeTab.PRACTICES}
            </TabsTrigger>
          </Tabs.List>
        </Flex>
        <TabsContent value={OrganizationPracticeTab.ORGANIZATIONS}>
          <OrganizationsTabView />
        </TabsContent>
        <TabsContent value={OrganizationPracticeTab.PRACTICES}>
          <PracticesTabView />
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

export { OrganizationPracticeTabs }
