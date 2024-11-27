'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { PatientLabResultView } from '../lab-result'
import { LabOrdersTabs } from './lab-orders-widget/constant'
import { LabOrdersWidget } from './lab-orders-widget/lab-orders-widget'
import { useStore } from './lab-orders-widget/store'

interface LabOrderHeaderProps {
  IsLabOrderHeader: boolean
}

const LabOrdersView = ({ IsLabOrderHeader }: LabOrderHeaderProps) => {
  const { activeTab, setActiveTab } = useStore()

  return (
    <Tabs.Root
      className="flex w-full flex-col"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <Flex>
        <Tabs.List>
          <TabsTrigger value={LabOrdersTabs.LAB_ORDERS}>
            {LabOrdersTabs.LAB_ORDERS}
          </TabsTrigger>
          <TabsTrigger value={LabOrdersTabs.LAB_RESULTS}>
            {LabOrdersTabs.LAB_RESULTS}
          </TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>

      <TabsContent value={LabOrdersTabs.LAB_ORDERS}>
        <LabOrdersWidget IsLabOrderHeader={IsLabOrderHeader} />
      </TabsContent>
      <TabsContent value={LabOrdersTabs.LAB_RESULTS}>
        <PatientLabResultView />
      </TabsContent>
    </Tabs.Root>
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
      className="hidden flex-1 flex-col gap-1 overflow-auto data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { LabOrdersView }
