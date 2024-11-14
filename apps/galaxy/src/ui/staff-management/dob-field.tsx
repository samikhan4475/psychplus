'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const DobField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>DOB</FormFieldLabel>
      <DatePickerInput field="dateOfBirth" />
    </FormFieldContainer>
  )
}

export { DobField }
