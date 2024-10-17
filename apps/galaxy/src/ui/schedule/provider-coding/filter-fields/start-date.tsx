'use client'

import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'

const StartDate = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>From</FormFieldLabel>
      <DatePickerInput field="startingDate" />
    </FormFieldContainer>
  )
}

export { StartDate }
