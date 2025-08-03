'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { useOrganizationMember } from '@/hooks'
import { Role } from '@/types'
import { getRoleProfileAction } from './actions'
import { ProfileForm } from './profile-form'

const OrganizationProfileView = () => {
  const [roleData, setRoleData] = useState<Role | null>()
  const [loading, setLoading] = useState(false)
  const { roleId, id } = useParams<{ roleId: string; id: string }>()
  const isMember = useOrganizationMember(id ?? '')

  useEffect(() => {
    ;(async () => {
      if (!isMember) return
      setLoading(true)
      if (!roleId) return

      const response = await getRoleProfileAction({
        payload: { roleIds: [roleId] },
      })

      if (response.state === 'success') {
        setRoleData(response.data)
        setLoading(false)
      } else {
        setLoading(false)
      }
    })()
  }, [roleId])

  if (!isMember) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <h1>You are unauthorized to view this page</h1>
      </Flex>
    )
  }

  if (loading) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return roleData && <ProfileForm defaultValues={roleData} />
}

export { OrganizationProfileView }
