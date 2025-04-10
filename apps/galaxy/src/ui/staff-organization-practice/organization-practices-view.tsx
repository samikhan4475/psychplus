'use client'

import { useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Box } from '@radix-ui/themes'
import { useStore as useGlobalStore } from '@/store'
import { getStaffAction } from './actions'
import { OrganizationPracticesListTable } from './organization-practices-list-table'
import { PracticesHeading } from './practices-heading'
import { useStore } from './store'

const OrganizationPracticesView = ({
  isProfileView,
}: {
  isProfileView?: boolean
}) => {
  const { user } = useGlobalStore((state) => ({ user: state.user }))
  const { id } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const userId = isProfileView ? `${user.id}` : searchParams.get('id') || ''
  const staffId = isProfileView ? `${user.staffId}` : id
  const { setStaff, searchStaffOrganizations } = useStore((state) => ({
    setStaff: state.setStaff,
    searchStaffOrganizations: state.searchStaffOrganizations,
  }))

  useEffect(() => {
    init()
  }, [staffId])

  const init = async () => {
    if (userId) {
      searchStaffOrganizations(userId)
    }
    const response = await getStaffAction(staffId)
    if (response.state === 'success') {
      setStaff(response.data)
    }
  }

  return (
    <Box className="w-full py-1">
      <PracticesHeading userId={userId} />
      <OrganizationPracticesListTable userId={userId} />
    </Box>
  )
}

export { OrganizationPracticesView }
