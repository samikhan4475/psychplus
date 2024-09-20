'use client'

import { useState } from 'react'
import { Flex, Tabs, Text } from '@radix-ui/themes'
import { BillingTab } from './billing-tab'
import { TreatmentTab } from './treatment-tab'

const TabButtons =
  'data-[state=inactive]:text-gray-10 data-[state=inactive]:font-normal data-[state=inactive]:text-1 data-[state=active]:text-black data-[state=active]:font-medium data-[state=active]:text-1'

const StaffCommentsTab = () => {
  const [activeTab, setActiveTab] = useState<string>('treatment')
  return (
    <Flex direction="column" className="overflow-hidden rounded-2">
      <Text className="bg-blue-3 px-2 py-0.5" size="2" weight="medium">
        Staff Comments
      </Text>
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List
          size="1"
          color="iris"
          highContrast
          className="inline-flex [box-shadow:none]"
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

export { StaffCommentsTab }
