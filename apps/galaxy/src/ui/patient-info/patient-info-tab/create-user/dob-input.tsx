'use client'

import { DatePickerInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const DobInput = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1" required>
        Date of Birth
      </FormFieldLabel>
      <DatePickerInput field="dob" datePickerClass={textFieldClassName} />
      <FormFieldError name="dob" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { DobInput }
