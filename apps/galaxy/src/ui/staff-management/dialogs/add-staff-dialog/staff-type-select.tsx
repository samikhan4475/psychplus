import React from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../../store'

const StaffTypeSelect = () => {
  const staffs = useStore((state) => state.dropDownOptions.staffs)
  return (
    <FormFieldContainer>
      <FormFieldLabel>Staff Type</FormFieldLabel>
      <SelectInput
        options={staffs}
        disabled
        field="staffType"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
