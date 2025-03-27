'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { MedicationOrdersTabs } from './medication-order-refill-widget/constant'
import { MedicationOrderRefillWidget } from './medication-order-refill-widget/medication-order-refill-widget'
import { useStore } from './medication-order-refill-widget/store'



const MedicationOrderView = () => {
  const { activeTab, setActiveTab } = useStore()

  return (
    <Tabs.Root
      className="flex w-full flex-col"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <Flex>
        <Tabs.List>
          <TabsTrigger value={MedicationOrdersTabs.REFILL_REQUESTS}>
            {MedicationOrdersTabs.REFILL_REQUESTS}
          </TabsTrigger>
          <TabsTrigger value={MedicationOrdersTabs.CHANGE_REQUESTS}>
            {MedicationOrdersTabs.CHANGE_REQUESTS}
          </TabsTrigger>
          <TabsTrigger value={MedicationOrdersTabs.NEW_PRESCRIPTIONS}>
            {MedicationOrdersTabs.NEW_PRESCRIPTIONS}
          </TabsTrigger>
          <TabsTrigger value={MedicationOrdersTabs.ERRORS}>
            {MedicationOrdersTabs.ERRORS}
          </TabsTrigger>
        </Tabs.List> 
        </Flex>
      <TabsContent value={MedicationOrdersTabs.REFILL_REQUESTS}>
        <MedicationOrderRefillWidget />
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

export { MedicationOrderView }
