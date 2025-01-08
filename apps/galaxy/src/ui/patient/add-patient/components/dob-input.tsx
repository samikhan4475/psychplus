'use client'

import { getLocalTimeZone, today } from '@internationalized/date'
import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const DobInput = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Date of Birth</FormFieldLabel>
      <DatePickerInput
        field="dateOfBirth"
        maxValue={today(getLocalTimeZone())}
      />
    </FormFieldContainer>
  )
}

export { DobInput }
