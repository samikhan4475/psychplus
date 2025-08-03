'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { useOrganizationMember } from '@/hooks'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { AddStaffButton } from './add-staff-button'
import { FEATURE_TYPES } from './constants'
import { StaffFilterForm } from './staff-filter-form'
import { StaffListTable } from './staff-list-table'
import { StaffListTablePagination } from './staff-list-table-pagination'

interface StaffManagementViewProps {
  googleApiKey: string
}

const StaffManagementView = ({ googleApiKey }: StaffManagementViewProps) => {
  const { type, id } = useParams<{ type: string; id: string }>()
  const isMember = useOrganizationMember(
    type === FEATURE_TYPES.ORGANIZATION ? id : '',
  )

  if (!isMember) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <h1>You are unauthorized to view this page</h1>
      </Flex>
    )
  }

  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      <TabContentHeading title="Staff">
        {type !== FEATURE_TYPES.PRACTICE && (
          <GooglePlacesContextProvider apiKey={googleApiKey}>
            <AddStaffButton />
          </GooglePlacesContextProvider>
        )}
      </TabContentHeading>
      <StaffFilterForm />
      <StaffListTable />
      <StaffListTablePagination />
    </Flex>
  )
}

export { StaffManagementView }
