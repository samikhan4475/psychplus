'use client'

import { getLocalTimeZone, today } from '@internationalized/date'
import { DatePickerInput } from '@/components'
import { FieldLabel, FormFieldContainer } from '../../shared'

const DateOfBirthInput = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>DOB</FieldLabel>
      <DatePickerInput
        maxValue={today(getLocalTimeZone())}
        field="dateOfBirth"
        dateInputClass="h-6"
      />
    </FormFieldContainer>
  )
}

export { DateOfBirthInput }
