'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { DEFAULT_OPTIONS } from '../../constants'

const ToStaffSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Staff Members</FormFieldLabel>
      <SelectInput
        field="toUserId"
        options={DEFAULT_OPTIONS}
        disabled
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full"
        className="w-full"
        value="all"
      />
      <FormFieldError name="toUserId" />
    </FormFieldContainer>
  )
}

export { ToStaffSelect }
