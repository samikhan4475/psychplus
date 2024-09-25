'use client'

import { FormFieldLabel, TimeInput } from '@/components'
import { FormFieldContainer } from '../../shared'

const TimeInputField = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Time</FormFieldLabel>
      <TimeInput field="time" dateInputClass='h-6' />
    </FormFieldContainer>
  )
}

export { TimeInputField }
