import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { SchemaType } from './schema'

interface StaffTypeSelectProps {
  staffs: SelectOptionType[]
}

const StaffTypeSelect = ({ staffs }: StaffTypeSelectProps) => {
  const { setValue } = useFormContext<SchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel>Staff Type</FormFieldLabel>
      <SelectInput
        options={staffs}
        field="staffTypeIds.0"
        onValueChange={(type) => {
          setValue('staffTypeIds.0', type)
          setValue('staffUserRoleIds.0', '')
        }}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
