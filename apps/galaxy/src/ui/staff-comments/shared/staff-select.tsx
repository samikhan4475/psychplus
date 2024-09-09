'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '../types'

interface StaffSelectProps {
  staffOptions: SelectOptionType[]
}

const StaffSelect = ({ staffOptions }: StaffSelectProps) => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Staff</FormFieldLabel>
      <SelectInput
        placeholder="Select"
        field="staff"
        buttonClassName={buttonClassName}
        options={staffOptions}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[142px]'
export { StaffSelect }
