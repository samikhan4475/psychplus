'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const DobDateField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>DOB</FormFieldLabel>
      <DatePickerInput field="dateOfBirth" yearFormat="YYYY" />
    </FormFieldContainer>
  )
}

export { DobDateField }
