import React from 'react'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { AddUserButton } from './blocks/add-user-button'
import { PreferredPartnerWorklistFiltersForm } from './blocks/preferred-partner-worklist-filters-form'
import { PreferredPartnerUsersWorklistTable } from './preferred-partner-users-worklist-table'

interface PreferredPartnerWorklistTabProps {
  ppid: string
  googleApiKey: string
}

const PreferredPartnerWorklistTab: React.FC<
  PreferredPartnerWorklistTabProps
> = ({ ppid, googleApiKey }) => {
  return (
    <Flex direction="column" className="w-full">
      <Flex
        direction="column"
        className="w-full"
        style={{ overflow: 'hidden' }}
      >
        <TabContentHeading title="Worklist" className="bg-white">
          <AddUserButton ppid={ppid} />
        </TabContentHeading>
        <PreferredPartnerWorklistFiltersForm ppid={ppid} />
      </Flex>

      <PreferredPartnerUsersWorklistTable
        ppid={ppid}
        googleApiKey={googleApiKey}
      />
    </Flex>
  )
}

export { PreferredPartnerWorklistTab }
