'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const DeactivateDatePicker = ({ disabled }: { disabled: boolean }) => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1">Deactivate</FormFieldLabel>
      <DatePickerInput
        field="deactivateDate"
        aria-label="add-codeset"
        isDisabled={disabled}
      />
      <FormFieldError name="deactivateDate" />
    </FormFieldContainer>
  )
}

export { DeactivateDatePicker }
