'use client'

import { Box, Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { OrganizationStaffDialog } from './dialogs'
import { OrganizationStaffListFilterForm } from './organization-staff-list-filter-form'
import { OrganizationStaffListTable } from './organization-staff-list-table'
import { OrganizationStaffListTablePagination } from './organization-staff-list-table-pagination'

interface ClearingHouseViewProps {
  googleApiKey: string
}

const OrganizationStaffView = ({ googleApiKey }: ClearingHouseViewProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <Box className="w-full p-1">
        <Flex direction="column" className="gap-0.5" width="100%">
          <TabContentHeading title="Staff">
            <OrganizationStaffDialog />
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
