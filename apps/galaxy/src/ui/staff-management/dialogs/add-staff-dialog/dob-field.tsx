'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { getCalendarDate } from '@/utils'

const DobField = () => {
  const today = getCalendarDate(new Date().toDateString())

  return (
    <FormFieldContainer>
      <FormFieldLabel required>DOB</FormFieldLabel>
      <DatePickerInput field="dateOfBirth" maxValue={today} yearFormat="YYYY" />
    </FormFieldContainer>
  )
}

export { DobField }
