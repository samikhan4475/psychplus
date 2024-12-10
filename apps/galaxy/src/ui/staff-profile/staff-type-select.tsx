import React from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'

interface StaffTypeSelectProps {
  staffs: SelectOptionType[]
}

const StaffTypeSelect = ({ staffs }: StaffTypeSelectProps) => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Staff Type</FormFieldLabel>
      <SelectInput
        options={staffs}
        disabled
        field="staffUserRoleIds.0"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
