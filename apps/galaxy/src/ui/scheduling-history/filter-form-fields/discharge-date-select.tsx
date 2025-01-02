'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DischargeDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Discharge Date</FormFieldLabel>
      <DatePickerInput
        field="dischargeVisitSequenceDate"
        className="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { DischargeDateField }
