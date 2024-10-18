'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { useStore } from './store'
import { CodingTab } from './types'

const CodingTabs = () => {
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))

  return (
    <Box className="flex-1 px-1 pt-1">
      <Tabs.Root
        defaultValue={CodingTab.ICD}
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex w-full flex-col"
      >
        <Flex className="z-50">
          <Tabs.List>
            <TabsTrigger value={CodingTab.ICD}>{CodingTab.ICD}</TabsTrigger>
            <TabsTrigger value={CodingTab.CPT}>{CodingTab.CPT}</TabsTrigger>
            <TabsTrigger value={CodingTab.Modifier}>
              {CodingTab.Modifier}
            </TabsTrigger>
            <TabsTrigger value={CodingTab.POS}>{CodingTab.POS}</TabsTrigger>
          </Tabs.List>
        </Flex>
        <TabsContent value={CodingTab.ICD}>
          <div>ICD</div>
        </TabsContent>
        <TabsContent value={CodingTab.CPT}>
          <div>CPT </div>
        </TabsContent>
        <TabsContent value={CodingTab.Modifier}>
          <div>Modifier </div>
        </TabsContent>
        <TabsContent value={CodingTab.POS}>
          <div>POS </div>
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

export { CodingTabs }
