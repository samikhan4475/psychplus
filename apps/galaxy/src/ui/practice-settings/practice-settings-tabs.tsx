'use client'

import { TabsTrigger } from '@/components'
import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import { CredentialingTabView } from './credentialing'
import { SchedulingTabView } from './scheduling'
import { useStore } from './store'
import { PracticeSettingsTab } from './types'
import { UsersTabView } from './users'

const PracticeSettingsTabs = () => {
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))

  return (
    <Box className="flex-1 px-1 pt-1">
      <Tabs.Root
        defaultValue={PracticeSettingsTab.SCHEDULING}
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex w-full flex-col"
      >
        <Flex className="z-50">
          <Tabs.List>
            <TabsTrigger value={PracticeSettingsTab.SCHEDULING}>
              {PracticeSettingsTab.SCHEDULING}
            </TabsTrigger>
            <TabsTrigger value={PracticeSettingsTab.CREDENTIALING}>
              {PracticeSettingsTab.CREDENTIALING}
            </TabsTrigger>
            <TabsTrigger value={PracticeSettingsTab.USERS}>
              {PracticeSettingsTab.USERS}
            </TabsTrigger>
          </Tabs.List>
        </Flex>
        <TabsContent value={PracticeSettingsTab.SCHEDULING}>
          <SchedulingTabView />
        </TabsContent>
        <TabsContent value={PracticeSettingsTab.CREDENTIALING}>
          <CredentialingTabView />
        </TabsContent>
        <TabsContent value={PracticeSettingsTab.USERS}>
          <UsersTabView />
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

export { PracticeSettingsTabs }
