'use client'

import { useParams } from 'next/navigation'
import { Box, Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { FEATURE_TYPES } from './constants'
import { OrganizationStaffDialog } from './dialogs'
import { OrganizationStaffListFilterForm } from './organization-staff-list-filter-form'
import { OrganizationStaffListTable } from './organization-staff-list-table'
import { OrganizationStaffListTablePagination } from './organization-staff-list-table-pagination'

interface ClearingHouseViewProps {
  googleApiKey: string
}

const OrganizationStaffView = ({ googleApiKey }: ClearingHouseViewProps) => {
  const { type } = useParams<{ type: string }>()
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <Box className="w-full p-1">
        <Flex direction="column" className="gap-0.5" width="100%">
          <TabContentHeading title="Staff">
            {type === FEATURE_TYPES.ORGANIZATION && <OrganizationStaffDialog />}
          </TabContentHeading>
          <OrganizationStaffListFilterForm />
          <Flex direction="column" className="bg-white w-full">
            <OrganizationStaffListTable />
            <OrganizationStaffListTablePagination />
          </Flex>
        </Flex>
      </Box>
    </GooglePlacesContextProvider>
  )
}

export { OrganizationStaffView }
