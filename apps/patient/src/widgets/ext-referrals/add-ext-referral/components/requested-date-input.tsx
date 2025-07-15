'use client'

import { FormField } from '@/components-v2'
import { DatePickerInput } from '@/components-v2/date-picker-input'
import {
  generateCalendarDateToday,
  getCalendarDateOffsetFromToday,
} from '@/utils'

const RequestedDateInput = () => {
  return (
    <FormField
      containerClassName="flex-1"
      name="requestedTime"
      label="Select Date"
      showError={false}
    >
      <DatePickerInput
        field="requestedTime"
        className="text-pp-gray-1 h-[38px] text-[14px] font-regular uppercase"
        dateInputClass="h-[38px]"
        minValue={generateCalendarDateToday()}
        maxValue={getCalendarDateOffsetFromToday(90)}
      />
    </FormField>
  )
}

export { RequestedDateInput }
