'use client'

import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'

const LastCoverageDateRange = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>LCD</FormFieldLabel>
      <DatePickerInput field="lastCoverageDateStart" />
      <DatePickerInput field="lastCoverageDateEnd" />
    </FormFieldContainer>
  )
}

export { LastCoverageDateRange }
