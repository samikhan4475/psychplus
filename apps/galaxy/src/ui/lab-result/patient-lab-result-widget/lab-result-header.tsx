'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex, Text } from '@radix-ui/themes'
import { ListIcon, SignalIcon } from 'lucide-react'

interface LabResultHeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const LabResultHeader = ({ activeTab, setActiveTab }: LabResultHeaderProps) => {
  return (
    <Flex
      className="bg-white rounded-1"
      justify="between"
      align="center"
      p="2"
      width="100%"
    >
      <Flex width="100%" className="flex-1 items-center space-x-4">
        <Text className="text-pp-black-1 flex  items-center gap-x-[11px] text-[20px] font-bold">
          Lab Results
        </Text>
        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col"
          defaultValue="SheetView"
        >
          <Flex justify="between">
            <Tabs.List>
              <Flex direction="row" justify="between">
                <Flex gap="2">
                  <TabsTrigger value="SheetView">
                    <Flex align="center" gap="2">
                      <ListIcon size={16} />
                      Sheet View
                    </Flex>
                  </TabsTrigger>
                  <TabsTrigger value="DataView">
                    <Flex align="center" gap="2">
                      <SignalIcon size={14} />
                      Data View
                    </Flex>
                  </TabsTrigger>
                </Flex>
              </Flex>
            </Tabs.List>
          </Flex>
        </Tabs.Root>
      </Flex>
    </Flex>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
}

const TabsTrigger = ({ value, children }: TabsTriggerProps) => (
  <Tabs.Trigger
    value={value}
    className="bg-white rounded-2 border border-accent-6 px-2 py-0.5 text-[12px] text-gray-12 first:border-l data-[state=active]:cursor-default data-[state=active]:border-gray-5 data-[state=active]:bg-accent-4 data-[state=active]:font-[500] data-[state=active]:text-accent-12"
  >
    <Flex align="center" gap="2">
      {children}
    </Flex>
  </Tabs.Trigger>
)

export { LabResultHeader }
