'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { Role } from '@/types'
import { getRoleProfileAction } from './actions'
import { ProfileForm } from './profile-form'

const OrganizationProfileView = () => {
  const [roleData, setRoleData] = useState<Role | null>()
  const [loading, setLoading] = useState(false)
  const { roleId } = useParams<{ roleId: string }>()

  useEffect(() => {
    ;(async () => {
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
