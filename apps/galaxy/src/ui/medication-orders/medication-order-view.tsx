'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { MedicationOrdersTabs } from './medication-order-refill-widget/constant'
import { MedicationOrderRefillWidget } from './medication-order-refill-widget/medication-order-refill-widget'
import { useStore } from './medication-order-refill-widget/store'
import { PharmacyNotificationWidget } from '../pharmacy-notifications/pharmacy-notifications-widget/pharmacy-notifications-widget'

const MedicationOrderView = () => {
  const { activeTab, setActiveTab, data, changeRequestData } = useStore()
  return (
    <Tabs.Root
      className="flex w-full flex-col"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <Flex>
        <Tabs.List>
          <TabsTrigger value={MedicationOrdersTabs.REFILL_REQUESTS}>
            {`${MedicationOrdersTabs.REFILL_REQUESTS} (${data.total})`}
          </TabsTrigger>
          <TabsTrigger value={MedicationOrdersTabs.CHANGE_REQUESTS}>
            {`${MedicationOrdersTabs.CHANGE_REQUESTS} (${changeRequestData.total})`}
          </TabsTrigger>
           <TabsTrigger value={MedicationOrdersTabs.NOTIFICATIONS}>
            {MedicationOrdersTabs.NOTIFICATIONS}
          </TabsTrigger>
        </Tabs.List>
      </Flex>
      <TabsContent value={MedicationOrdersTabs.REFILL_REQUESTS}>
        <MedicationOrderRefillWidget />
      </TabsContent>
      <TabsContent value={MedicationOrdersTabs.CHANGE_REQUESTS}>
        <MedicationOrderRefillWidget />
      </TabsContent>
         <TabsContent value={MedicationOrdersTabs.NOTIFICATIONS}>
        <PharmacyNotificationWidget />
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
  return (
    <Tabs.Content
      value={value}
      forceMount={true}
      className="hidden flex-1 flex-col gap-1 overflow-auto data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { MedicationOrderView }
