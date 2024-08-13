'use client'

import { Box } from '@radix-ui/themes'
import { Tabs } from '@psychplus/ui/tabs'
import {
  AddCreditCardDialog,
  CreditCardTable,
  ServicesHistoryTable,
  SubscriptionHistoryTable,
} from './components'
import { useStore } from './store'

const PreferredPartnersFinancialInfoWidgetClient = ({
  preferredPartnerId,
}: {
  preferredPartnerId: string
}) => {
  const { setPreferredPartnerId } = useStore((state) => ({
    setPreferredPartnerId: state.setPreferredPartnerId,
  }))

  setPreferredPartnerId(preferredPartnerId)

  return (
    <Box mb="7">
      <Tabs.Root defaultValue="cards">
        <Tabs.List className="bg-[#f0f4ff]">
          <Tabs.Trigger
            value="cards"
            className="border-r-1 border-b-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
          >
            Card
          </Tabs.Trigger>
          <Tabs.Trigger
            value="subscriptionHistory"
            className="border-r-1 border-b-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
          >
            Subscription History
          </Tabs.Trigger>
          <Tabs.Trigger
            value="servicesHistory"
            className="border-r-1 border-b-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
          >
            Services History
          </Tabs.Trigger>
        </Tabs.List>

        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="cards">
            <AddCreditCardDialog />
            <CreditCardTable />
          </Tabs.Content>

          <Tabs.Content value="subscriptionHistory">
            <SubscriptionHistoryTable />
          </Tabs.Content>

          <Tabs.Content value="servicesHistory">
            <ServicesHistoryTable />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  )
}

export { PreferredPartnersFinancialInfoWidgetClient }
