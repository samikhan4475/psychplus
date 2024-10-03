'use client'

import { DatePickerInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const AuthDate = () => {
  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel>Auth Date</FormFieldLabel>
      <DatePickerInput dateInputClass="h-[21px]" field="authDate" />
      <FormFieldError name="authDate" />
    </FormFieldContainer>
  )
}

export { AuthDate }
