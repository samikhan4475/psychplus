import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { AddUserButton } from './blocks/add-user-button'
import { PreferredPartnerFiltersForm } from './blocks/preferred-partner-filters-form'
import { PreferredPartnerUsersActiveTable } from './preferred-partner-users-active-table'
import { usePreferredPartnerStore } from './store'

interface PreferredPartnerActiveUsersTabProps {
  ppid: string
  googleApiKey: string
}

const PreferredPartnerActiveUsersTab: React.FC<
  PreferredPartnerActiveUsersTabProps
> = ({ ppid, googleApiKey }) => {
  const { totalCounts, searchActiveUsers } = usePreferredPartnerStore(
    (state) => ({
      totalCounts: state.totalCounts,
      searchActiveUsers: state.searchActiveUsers,
    }),
  )

  return (
    <Flex direction="column" className="w-full">
      <Flex
        direction="column"
        className="w-full"
        style={{ overflow: 'hidden' }}
      >
        <TabContentHeading title="Active Users" className="bg-white">
          <AddUserButton ppid={ppid} />
        </TabContentHeading>
        <Flex direction="row" p="2" wrap="wrap">
          <Text size="1" weight="bold" mr="8">
            Total Users{' '}
            <Text className="text-gray-11">{totalCounts.totalUsers}</Text>
          </Text>
          <Text size="1" weight="bold" mr="8">
            Total Families{' '}
            <Text className="text-gray-11">{totalCounts.totalFamilies}</Text>
          </Text>
          <Text size="1" weight="bold" mr="8">
            Total Couples{' '}
            <Text className="text-gray-11">{totalCounts.totalCouples}</Text>
          </Text>
          <Text size="1" weight="bold" mr="8">
            Total Individuals{' '}
            <Text className="text-gray-11">{totalCounts.totalIndividuals}</Text>
          </Text>
        </Flex>
        <PreferredPartnerFiltersForm
          ppid={ppid}
          searchFunction={searchActiveUsers}
        />
      </Flex>
      <PreferredPartnerUsersActiveTable
        ppid={ppid}
        googleApiKey={googleApiKey}
      />
    </Flex>
  )
}

export { PreferredPartnerActiveUsersTab }
