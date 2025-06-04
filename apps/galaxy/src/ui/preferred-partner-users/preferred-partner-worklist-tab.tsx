import React from 'react'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { AddUserButton } from './blocks/add-user-button'
import { PreferredPartnerWorklistFiltersForm } from './blocks/preferred-partner-worklist-filters-form'
import { PreferredPartnerUsersWorklistTable } from './preferred-partner-users-worklist-table'

interface PreferredPartnerWorklistTabProps {
  ppid: string
}

const PreferredPartnerWorklistTab: React.FC<PreferredPartnerWorklistTabProps> = ({
  ppid,
}) => {
  return (
    <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Flex direction="column" className="w-full">
        <Flex direction="column" className="w-full" style={{ overflow: 'hidden' }}>
          <TabContentHeading title="Worklist" className="bg-white">
            <AddUserButton ppid={ppid} />
          </TabContentHeading>
          <PreferredPartnerWorklistFiltersForm ppid={ppid} />
        </Flex>
        
        <PreferredPartnerUsersWorklistTable ppid={ppid} />
      </Flex>
    </GooglePlacesContextProvider>
  )
}

export { PreferredPartnerWorklistTab }
