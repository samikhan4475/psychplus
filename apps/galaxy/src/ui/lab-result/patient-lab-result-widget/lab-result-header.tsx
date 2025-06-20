'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex, Text } from '@radix-ui/themes'
import { BarChartIcon, ListIcon, SignalIcon } from 'lucide-react'
interface LabResultHeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isQuickNoteView?: boolean
}

const LabResultHeader = ({
  activeTab,
  setActiveTab,
  isQuickNoteView,
}: LabResultHeaderProps) => {
  return (
    <Flex
      className="bg-white rounded-1"
      justify="between"
      align="center"
      p="2"
      width="100%"
    >
      <Flex width="100%" className="flex-1 items-center space-x-4">
        <Text
          size={!isQuickNoteView ? '5' : '3'}
          weight={!isQuickNoteView ? 'bold' : 'medium'}
          className="text-pp-black-1 flex  items-center gap-x-[11px]"
        >
          Lab Results
        </Text>
        {!isQuickNoteView && (
          <Tabs.Root
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex flex-col"
            defaultValue="SheetView"
          >
            <Flex justify="between">
              <Tabs.List>
                <Flex gap="2" direction="row" justify="between">
                  <TabsTrigger value="TableView">
                    <Flex align="center" gap="2">
                      <ListIcon size={16} />
                      Table View
                    </Flex>
                  </TabsTrigger>
                  <TabsTrigger value="SheetView">
                    <Flex align="center" gap="2">
                      <SignalIcon size={14} />
                      Sheet View
                    </Flex>
                  </TabsTrigger>
                   <TabsTrigger value="GraphView">
                    <Flex align="center" gap="2">
                      <BarChartIcon size={14} />
                      Graph View
                    </Flex>
                  </TabsTrigger>
                </Flex>
              </Tabs.List>
            </Flex>
          </Tabs.Root>
        )}
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
