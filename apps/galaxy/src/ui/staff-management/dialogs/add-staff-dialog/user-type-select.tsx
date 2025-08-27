import React, { useMemo } from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SelectOptionType } from '@/types'
import { UserType } from '../../types'

const RoleSelect = () => {
  const codes = useCodesetCodes(CODESETS.UserActorCategory)

  const options: SelectOptionType[] = useMemo(() => {
    const allowedRoles = Object.values(UserType)

    return codes
      .filter((code) => allowedRoles.includes(code.value as UserType))
      .map((code) => ({
        value: code.value,
        label: code.display,
      }))
  }, [codes])

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Role</FormFieldLabel>
      <SelectInput
        options={options}
        field="userActorCategory"
        placeholder="Select role"
        className="w-full"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="userActorCategory" />
    </FormFieldContainer>
  )
}

export { RoleSelect }
