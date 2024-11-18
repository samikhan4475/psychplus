'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const DobField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>DOB</FormFieldLabel>
      <DatePickerInput field="dateOfBirth" />
    </FormFieldContainer>
  )
}

export { DobField }
