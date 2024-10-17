'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const CheckDateField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Check Date</FormFieldLabel>
      <DatePickerInput field="checkDate" />
    </FormFieldContainer>
  )
}

export { CheckDateField }
