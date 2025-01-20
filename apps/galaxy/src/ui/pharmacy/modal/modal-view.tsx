'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import { ListIcon, Map } from 'lucide-react'
import { useStore } from '../store'
import { PharmacyTable } from './pharmacy-table'
import { TabsTrigger } from './tab-trigger'

const ModalView = () => {
  const { activeTab, setActiveTab } = useStore()

  return (
    <Flex
      className="bg-white rounded-1"
      justify="between"
      align="center"
      p="2"
      width="100%"
    >
      <Flex width="100%" className="flex-1 items-center space-x-4">
        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col"
          defaultValue="ListView"
        >
          <Flex justify="between">
            <Tabs.List>
              <Flex direction="row" justify="between" gap="2">
                <TabsTrigger value="ListView">
                  <Flex align="center" gap="2">
                    <ListIcon size={16} />
                    List View
                  </Flex>
                </TabsTrigger>
                <TabsTrigger value="MapView">
                  <Flex align="center" gap="2">
                    <Map size={14} />
                    Map View
                  </Flex>
                </TabsTrigger>
              </Flex>
            </Tabs.List>
          </Flex>
          <TabsContent value="ListView">
            <PharmacyTable />
          </TabsContent>

          <TabsContent value="MapView">
            <Box>Will be next phase Map View </Box>
          </TabsContent>
        </Tabs.Root>
      </Flex>
    </Flex>
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
      value={value}
      forceMount={viewedTabs.has(value) ? true : undefined}
      className="hidden flex-col gap-1 overflow-auto data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { ModalView }
