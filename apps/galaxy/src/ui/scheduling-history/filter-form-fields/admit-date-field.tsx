'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const AdmitDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Admit Date</FormFieldLabel>
      <DatePickerInput field="admissionDateTime" className="w-[101px]" />
    </FormFieldContainer>
  )
}

export { AdmitDateField }
