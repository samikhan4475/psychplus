'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ChargeDatePicker = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1 !font-medium">
        Charge Date
      </FormFieldLabel>
      <DatePickerInput field="chargeDate" dateInputClass="w-[100px] !h-7" />
    </FormFieldContainer>
  )
}

export { ChargeDatePicker }
