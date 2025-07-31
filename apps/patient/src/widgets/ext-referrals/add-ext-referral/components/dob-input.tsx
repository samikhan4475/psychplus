'use client'

import { FormField } from '@/components-v2'
import { DatePickerInput } from '@/components-v2/date-picker-input'
import { generateCalendarDateToday } from '@/utils'

const DobInput = () => {
  return (
    <FormField
      containerClassName="flex-1"
      name="patientDateOfBirth"
      label="Date Of Birth"
    >
      <DatePickerInput
        yearFormat="YYYY"
        field="patientDateOfBirth"
        className="text-pp-gray-1 h-[38px] text-[14px] font-regular uppercase"
        dateInputClass="h-[38px]"
        maxValue={generateCalendarDateToday()}
        showError={false}
      />
    </FormField>
  )
}

export { DobInput }
