'use client'

import React from 'react'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { AddPreferredPartnerButton } from './add-preferred-partner-button'
import { PreferredPartnerFilterForm } from './preferred-partner-filter-form'
import { PreferredPartnerListTable } from './preferred-partner-list-table'
import { PreferredPartnerListTablePagination } from './preferred-partner-list-table-pagination'

interface PreferredPartnerViewProps {
  googleApiKey: string
}

const PreferredPartnerView = ({ googleApiKey }: PreferredPartnerViewProps) => {
  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      <TabContentHeading title="Preferred Partner">
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          <AddPreferredPartnerButton />
        </GooglePlacesContextProvider>
      </TabContentHeading>
      <PreferredPartnerFilterForm />
      <PreferredPartnerListTable />
      <PreferredPartnerListTablePagination />
    </Flex>
  )
}

export { PreferredPartnerView }
