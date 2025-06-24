'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const NotificationToDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>To</FormFieldLabel>
      <DatePickerInput
        field="notificationStatusEndDate"
        className="w-[120px]"
      />
    </FormFieldContainer>
  )
}

export { NotificationToDateField }
