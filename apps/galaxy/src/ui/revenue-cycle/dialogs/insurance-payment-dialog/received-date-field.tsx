'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const ReceivedDateField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Received Date</FormFieldLabel>
      <DatePickerInput field="receivedDate" />
    </FormFieldContainer>
  )
}

export { ReceivedDateField }
