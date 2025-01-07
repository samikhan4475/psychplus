'use client'

import { DatePickerInput } from '@/components'
import { FieldLabel, FormFieldContainer } from '../../shared'

const DateOfBirthInput = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>DOB</FieldLabel>
      <DatePickerInput field="dateOfBirth" />
    </FormFieldContainer>
  )
}

export { DateOfBirthInput }
