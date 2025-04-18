import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { useStore } from '../../store'
import { SchemaType } from './schema'

const StaffRoleSelect = () => {
  const form = useFormContext<SchemaType>()
  const roles = useStore((state) => state.dropDownOptions.roles)
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Role</FormFieldLabel>
      <SelectInput
        onValueChange={(value) => {
          form.setValue('staffUserRoleIds.0', value)
          form.setValue('staffType', '')
        }}
        options={roles}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="staffUserRoleIds.[0]" />
    </FormFieldContainer>
  )
}

export { StaffRoleSelect }
