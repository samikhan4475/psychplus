'use client'

import { getLocalTimeZone, today } from '@internationalized/date'
import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const DobInput = () => {
  return (
    <FormFieldContainer className=' flex-row items-center gap-2 min-w-[135px]'>
      <FormFieldLabel>DOB</FormFieldLabel>
      <DatePickerInput
        yearFormat="YYYY"
        field="dateOfBirth"
        maxValue={today(getLocalTimeZone())}
      />
    </FormFieldContainer>
  )
}

export { DobInput }
