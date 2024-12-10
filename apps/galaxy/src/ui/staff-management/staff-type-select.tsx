import React from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from './store'

const StaffTypeSelect = () => {
  const staffs = useStore((state) => state.dropDownOptions.staffs)
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Staff Type</FormFieldLabel>
      <SelectInput
        options={staffs}
        field="staffType"
        className="w-full"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
