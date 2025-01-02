'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DateOfServiceField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Date of service</FormFieldLabel>
      <DatePickerInput field="dateOfService" className="w-[101px]" />
    </FormFieldContainer>
  )
}

export { DateOfServiceField }
