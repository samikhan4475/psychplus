'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const InitiatedDateField = () => {
  return (
    <>
      <FormFieldContainer className="flex-row items-center gap-1">
        <FormFieldLabel>Initiated From Date</FormFieldLabel>
        <DatePickerInput
          field="initiatedFromDate"
          className="w-[101px]"
        />
      </FormFieldContainer>
      <FormFieldContainer className="flex-row items-center gap-1">
        <FormFieldLabel>Initiated To Date</FormFieldLabel>
        <DatePickerInput
          field="initiatedToDate"
          className="w-[101px]"
        />
      </FormFieldContainer>
    </>
  )
}

export { InitiatedDateField }
