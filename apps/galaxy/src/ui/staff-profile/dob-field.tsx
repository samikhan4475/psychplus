'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const DobField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>DOB</FormFieldLabel>
      <DatePickerInput field="dob" />
    </FormFieldContainer>
  )
}

export { DobField }
