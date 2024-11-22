'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex, Text } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { useStore } from './store'
import { CredentialingTab } from './types'

const CredentialingTabs = () => {
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))

  return (
    <Box className="flex-1 px-1 pt-1">
      <Tabs.Root
        defaultValue={CredentialingTab.License}
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex w-full flex-col"
      >
        <Flex className="z-50">
          <Tabs.List>
            <TabsTrigger value={CredentialingTab.License}>
              {CredentialingTab.License}
            </TabsTrigger>
            <TabsTrigger value={CredentialingTab.DEA}>
              {CredentialingTab.DEA}
            </TabsTrigger>
            <TabsTrigger value={CredentialingTab.CSA}>
              {CredentialingTab.CSA}
            </TabsTrigger>
            <TabsTrigger value={CredentialingTab.PrescriberSettings}>
              {CredentialingTab.PrescriberSettings}
            </TabsTrigger>
          </Tabs.List>
        </Flex>
        <TabsContent value={CredentialingTab.License}>
          <Text>License View </Text>
        </TabsContent>
        <TabsContent value={CredentialingTab.DEA}>
          <Text>Dea View</Text>
        </TabsContent>
        <TabsContent value={CredentialingTab.CSA}>
          <Text>CSA </Text>
        </TabsContent>
        <TabsContent value={CredentialingTab.PrescriberSettings}>
          <Text>Prescriber Settings </Text>
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

export { CredentialingTabs }
