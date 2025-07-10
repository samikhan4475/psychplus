import React from 'react'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { AddPlanAddressButton } from './add-plan-address-button'
import { PracticePlanAddressPagination } from './practice-plan-address-pagination'
import { PracticePlanAddressTable } from './practice-plan-address-table'

interface PracticePlanAddressViewProps {
  googleApiKey: string
}
const PracticePlanAddressView = ({
  googleApiKey,
}: PracticePlanAddressViewProps) => {
  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      <GooglePlacesContextProvider apiKey={googleApiKey}>
        <TabContentHeading title="Plan Address">
          <AddPlanAddressButton />
        </TabContentHeading>
        <PracticePlanAddressTable />
        <PracticePlanAddressPagination />
      </GooglePlacesContextProvider>
    </Flex>
  )
}

export { PracticePlanAddressView }
