'use client'

import { useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Box } from '@radix-ui/themes'
import { getStaffAction } from './actions'
import { OrganizationPracticesListTable } from './organization-practices-list-table'
import { PracticesHeading } from './practices-heading'
import { useStore } from './store'

const OrganizationPracticesView = () => {
  const { id } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')
  const { setStaff, searchStaffOrganizations } = useStore((state) => ({
    setStaff: state.setStaff,
    searchStaffOrganizations: state.searchStaffOrganizations,
  }))

  useEffect(() => {
    init()
  }, [id])

  const init = async () => {
    if (userId) {
      searchStaffOrganizations(userId)
    }
    const response = await getStaffAction(id)
    if (response.state === 'success') {
      setStaff(response.data)
    }
  }

  return (
    <Box className="w-full py-1">
      <PracticesHeading />
      <OrganizationPracticesListTable />
    </Box>
  )
}

export { OrganizationPracticesView }
