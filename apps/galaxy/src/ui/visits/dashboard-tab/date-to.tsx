'use client'

import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
  today,
} from '@internationalized/date'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DateTo = ({
  setActiveFilter,
  dateFrom,
}: {
  setActiveFilter: (activeFilter: string) => void
  dateFrom: DateValue | undefined
}) => {
  const onChange = (date: CalendarDate) => {
    if (date) {
      setActiveFilter('')
    }
  }
  return (
    <FormFieldContainer className="max-w-44 flex-1 flex-row">
      <FormFieldLabel className="!text-1">To</FormFieldLabel>
      <DatePickerInput
        field="dateTo"
        handleChange={onChange}
        minValue={dateFrom ?? today(getLocalTimeZone())}
      />
    </FormFieldContainer>
  )
}

export { DateTo }
