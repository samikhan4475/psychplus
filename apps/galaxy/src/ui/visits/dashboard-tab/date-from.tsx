'use client'

import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DateFrom = ({
  setActiveFilter,
}: {
  setActiveFilter: (activeFilter: string) => void
}) => {
  const onChange = (date?: CalendarDate) => {
    if (date) {
      setActiveFilter('')
    }
  }

  return (
    <FormFieldContainer className="max-w-44 flex-1 flex-row">
      <FormFieldLabel className="!text-1">From</FormFieldLabel>
      <DatePickerInput
        field="dateFrom"
        handleChange={onChange}
        maxValue={today(getLocalTimeZone())}
      />
    </FormFieldContainer>
  )
}

export { DateFrom }
