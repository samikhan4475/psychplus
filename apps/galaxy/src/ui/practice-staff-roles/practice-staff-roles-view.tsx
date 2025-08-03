'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Box, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { useOrganizationMember } from '@/hooks'
import { Practice } from '@/types'
import { getAllPracticesAction } from './actions'
import { OrganizationPracticesListTable } from './practice-staff-roles-table'
import { PracticesHeading } from './practices-heading'

const PracticeStaffRolesView = () => {
  const [practiceData, setPracticeData] = useState<Practice>()
  const [loading, setLoading] = useState(true)
  const { id } = useParams<{ id: string }>()
  const isMember = useOrganizationMember(practiceData?.organizationId ?? '')

  useEffect(() => {
    init()
  }, [id])

  const init = async () => {
    setLoading(true)
    const response = await getAllPracticesAction({
      payload: { practiceId: id },
    })
    if (response.state === 'success' && response.data.length > 0) {
      setPracticeData(response.data[0])
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <Box className="flex h-screen w-full items-center justify-center">
        <LoadingPlaceholder />
      </Box>
    )
  }

  if (!practiceData) {
    return (
      <Box className="flex h-screen w-full">
        <Text>No practice found</Text>
      </Box>
    )
  }
  if (!isMember) {
    return (
      <Box className="flex h-screen w-full items-center justify-center">
        <Text>You are unauthorized to view this page</Text>
      </Box>
    )
  }

  return (
    <Box className="w-full py-1">
      <PracticesHeading practice={practiceData} />
      <OrganizationPracticesListTable />
    </Box>
  )
}

export { PracticeStaffRolesView }
