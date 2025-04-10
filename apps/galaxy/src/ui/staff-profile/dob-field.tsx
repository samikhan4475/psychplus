'use client'

import { getLocalTimeZone, today } from '@internationalized/date'
import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const DobField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>DOB</FormFieldLabel>
      <DatePickerInput
        field="dob"
        yearFormat="YYYY"
        maxValue={today(getLocalTimeZone())}
      />
    </FormFieldContainer>
  )
}

export { DobField }
