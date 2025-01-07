'use client'

import { TimeInput } from '@/components'
import { FieldLabel, FormFieldContainer } from '../../shared'

const TimeInputField = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Time</FieldLabel>
      <TimeInput field="bookedAppointmentTime" dateInputClass="h-6" />
    </FormFieldContainer>
  )
}

export { TimeInputField }
