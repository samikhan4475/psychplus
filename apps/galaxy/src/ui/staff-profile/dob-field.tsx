'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const DobField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>DOB</FormFieldLabel>
      <DatePickerInput isRequired={false} field="dateOfBirth" />
    </FormFieldContainer>
  )
}

export { DobField }
