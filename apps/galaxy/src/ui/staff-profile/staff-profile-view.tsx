'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { getStaffRolesOrganizationAction } from '../staff-management/actions/get-organization-staff-roles'
import { OrganizationOptions } from '../staff-management/types'
import { getStaffAction } from './actions/get-staff'
import { getUserTimeZoneSettingsActions } from './actions/get-user-timezone-settings'
import { StaffProfileForm } from './staff-profile-form'
import { StaffUpdatePayload } from './types'

interface StaffProfileViewProps {
  googleApiKey: string
  isProfileView?: boolean
}

const StaffProfileView = ({
  googleApiKey,
  isProfileView,
}: StaffProfileViewProps) => {
  const [staff, setStaff] = useState<StaffUpdatePayload>()
  const { user } = useGlobalStore((state) => ({ user: state.user }))
  const params = useParams()
  const id = isProfileView ? `${user.staffId}` : params.id
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
      getStaffAction({ staffId: id, languageOptions }).then(async (result) => {
        if (result.state === 'success') {
          setStaff(result.data)
          await getUserSetting(result.data.userId)
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

  const getUserSetting = async (userId: string) => {
    setLoading(true)
    const userSettingResponse = await getUserTimeZoneSettingsActions({
      userId: userId,
      level: 'User',
      categoryValue: 'PreferredTimeZone',
    })
    if (
      userSettingResponse.state === 'success' &&
      userSettingResponse.data.length > 0 &&
      userSettingResponse.data[0].content
    ) {
      const timeZonePreference = userSettingResponse.data[0].content

      setStaff((prevStaff) => {
        if (prevStaff) {
          return {
            ...prevStaff,
            timeZonePreference,
          }
        }
        return prevStaff
      })
    } else if (userSettingResponse.state === 'error')
      toast.error(userSettingResponse.error ?? 'Error fetching user settings')

    setLoading(false)
  }

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
