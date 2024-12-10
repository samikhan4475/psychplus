'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { getStaffRolesOrganizationAction } from '../staff-management/actions/get-organization-staff-roles'
import { OrganizationOptions } from '../staff-management/types'
import { getStaffAction } from './actions/get-staff'
import { StaffProfileForm } from './staff-profile-form'
import { StaffUpdatePayload } from './types'

interface StaffProfileViewProps {
  googleApiKey: string
}

const StaffProfileView = ({ googleApiKey }: StaffProfileViewProps) => {
  const [staff, setStaff] = useState<StaffUpdatePayload>()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const languageOptions = useCodesetOptions(CODESETS.Language)

  const [selectOptions, setSelectOptions] = useState<OrganizationOptions>({
    organizations: [],
    staffs: [],
    roles: [],
    practices: [],
  })
  useEffect(() => {
    if (id && typeof id === 'string')
      getStaffAction({ staffId: id, languageOptions }).then((result) => {
        if (result.state === 'success') {
          setStaff(result.data)
          setLoading(false)
        } else if (result.state === 'error') {
          toast.error(result.error)
        }
      })

    getStaffRolesOrganizationAction().then((result) => {
      if (result.state === 'success') {
        setSelectOptions(result.data)
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
    })
  }, [])

  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      {loading || !staff ? (
        <Flex
          height="45vh"
          className="bg-white"
          align="center"
          justify="center"
        >
          <LoadingPlaceholder />
        </Flex>
      ) : (
        <StaffProfileForm
          selectOptions={selectOptions}
          staff={staff}
          googleApiKey={googleApiKey}
        />
      )}
    </Flex>
  )
}

export { StaffProfileView }
