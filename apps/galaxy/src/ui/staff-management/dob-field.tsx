'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { getLocalTimeZone, today } from '@internationalized/date'

const DobField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>DOB</FormFieldLabel>
      <DatePickerInput
        field="dateOfBirth"
        yearFormat="YYYY"
        maxValue={today(getLocalTimeZone())}
      />
    </FormFieldContainer>
  )
}

export { DobField }
