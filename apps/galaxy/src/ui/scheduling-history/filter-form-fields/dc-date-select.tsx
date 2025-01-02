'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DcDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>DC Date</FormFieldLabel>
      <DatePickerInput field="dischargeHospitalDate" className="w-[101px]" />
    </FormFieldContainer>
  )
}

export { DcDateField }
