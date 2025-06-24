'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const NotificationFromDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>From</FormFieldLabel>
      <DatePickerInput
        field="notificationStatusStartDate"
        className="w-[120px]"
      />
    </FormFieldContainer>
  )
}

export { NotificationFromDateField }
