'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const DobField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>DOB</FormFieldLabel>
      <DatePickerInput isRequired={false} field="dob" />
    </FormFieldContainer>
  )
}

export { DobField }
