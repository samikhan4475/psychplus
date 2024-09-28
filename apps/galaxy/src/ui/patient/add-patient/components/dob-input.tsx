'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const DobInput = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Date of Birth</FormFieldLabel>
      <DatePickerInput field="dateOfBirth" />
    </FormFieldContainer>
  )
}

export { DobInput }
