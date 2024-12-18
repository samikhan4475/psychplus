'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const DobDateField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>DOB</FormFieldLabel>
      <DatePickerInput field="checkDate" />
    </FormFieldContainer>
  )
}

export { DobDateField }
