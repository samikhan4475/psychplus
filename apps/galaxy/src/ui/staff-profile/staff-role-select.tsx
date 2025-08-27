import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { SchemaType } from './schema'

interface StaffRoleSelectProps {
  roles: SelectOptionType[]
}

const StaffRoleSelect = ({ roles }: StaffRoleSelectProps) => {
  const { setValue } = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Permission group</FormFieldLabel>
      <SelectInput
        field="staffUserRoleIds.0"
        options={roles}
        onValueChange={(val) => {
          setValue('staffUserRoleIds.0', val)
          setValue('staffTypeIds.0', '')
        }}
        disabled
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="staffUserRoleIds.0" />
    </FormFieldContainer>
  )
}

export { StaffRoleSelect }
