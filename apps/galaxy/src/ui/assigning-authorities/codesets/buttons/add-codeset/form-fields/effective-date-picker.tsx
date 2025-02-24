'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const EffectiveDatePicker = ({ disabled }: { disabled: boolean }) => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1">Effective</FormFieldLabel>
      <DatePickerInput
        field="effectiveDate"
        aria-label="add-codeset"
        isDisabled={disabled}
      />
      <FormFieldError name="effectiveDate" />
    </FormFieldContainer>
  )
}

export { EffectiveDatePicker }
