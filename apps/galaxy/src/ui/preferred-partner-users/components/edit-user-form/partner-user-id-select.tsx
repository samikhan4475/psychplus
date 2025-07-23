'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { PreferredPartnerUser } from '@/types'
import { EditUserSchemaType } from '../edit-user-schema'
import { PP_USER_TYPES, USER_STATUS } from '../../constants'

interface PartnerUserIDSelectProps {
  allUsers: PreferredPartnerUser[]
  currentUserId: string
}

const PartnerUserIDSelect = ({
  allUsers,
  currentUserId,
}: PartnerUserIDSelectProps) => {
  const form = useFormContext<EditUserSchemaType>()
  const selectedUserType = form.watch('ppUserType')

  const filteredUserOptions = useMemo(() => {
    if (!selectedUserType) return []

    let filteredUsers = allUsers.filter((user) => user.id !== currentUserId)

    if (selectedUserType === PP_USER_TYPES.COUPLE) {
      filteredUsers = filteredUsers.filter(
        (user) => user.userType === PP_USER_TYPES.INDIVIDUAL,
      )
    } else if (selectedUserType === PP_USER_TYPES.FAMILY) {
      filteredUsers = filteredUsers.filter(
        (user) => user.userType === PP_USER_TYPES.FAMILY && user.userStatus === USER_STATUS.PRIMARY,
      )
    }

    return filteredUsers.map((user) => ({
      value: user.id,
      label: `${user.name.firstName} ${user.name.lastName} (${user.familyUserNumber})`,
    }))
  }, [allUsers, currentUserId, selectedUserType])

  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>
        {selectedUserType === PP_USER_TYPES.FAMILY ? 'Family Member' : 'Partner User ID'}
      </FormFieldLabel>
      <DropdownSelect
        field="selectedPartnerId"
        options={filteredUserOptions}
        placeholder="Select partner user"
        buttonClassName="h-6 w-full"
        onValueChange={(value) => {
          form.setValue('selectedPartnerId', value, { shouldDirty: true })
        }}
      />
      <FormFieldError name="selectedPartnerId" />
    </FormFieldContainer>
  )
}

export { PartnerUserIDSelect }
