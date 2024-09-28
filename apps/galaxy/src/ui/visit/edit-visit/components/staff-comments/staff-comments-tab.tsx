'use client'

import { useState } from 'react'
import { Flex, Tabs, Text } from '@radix-ui/themes'
import { BillingTab } from './billing-tab'
import { TreatmentTab } from './treatment-tab'

const TabButtons =
  'data-[state=inactive]:text-gray-10 data-[state=inactive]:text-1 data-[state=inactive]:font-normal data-[state=active]:text-black data-[state=active]:font-medium data-[state=active]:text-1'

const StaffComments = () => {
  const [activeTab, setActiveTab] = useState<string>('treatment')

  return (
    <Flex className="overflow-hidden rounded-2" direction="column">
      <Text className="py-1" weight="bold" size="4">
        Staff Comments
      </Text>
      <Tabs.Root onValueChange={setActiveTab} value={activeTab}>
        <Tabs.List
          highContrast
          size="1"
          className="inline-flex [box-shadow:none]"
          color="iris"
        >
          <Tabs.Trigger value="treatment" className={TabButtons}>
            Treatment
          </Tabs.Trigger>

          <Tabs.Trigger value="billing" className={TabButtons}>
            Billing
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="treatment">
          <TreatmentTab />
        </Tabs.Content>
        <Tabs.Content value="billing">
          <BillingTab />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  )
}

export { StaffComments }
