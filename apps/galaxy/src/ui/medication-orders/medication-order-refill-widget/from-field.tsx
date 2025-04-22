'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const FromField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>From</FormFieldLabel>
      <DatePickerInput
        field="notificationDateFrom"
        className="w-[101px]"
        yearFormat="YYYY"
      />
    </FormFieldContainer>
  )
}

export { FromField }
