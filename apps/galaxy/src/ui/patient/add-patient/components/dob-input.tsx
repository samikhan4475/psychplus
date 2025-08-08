'use client'

import { getLocalTimeZone, today } from '@internationalized/date'
import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
interface DobInputProps {
  setDobFocused: (focused: boolean) => void
}

const DobInput = ({ setDobFocused }: DobInputProps) => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Date of Birth</FormFieldLabel>
      <DatePickerInput
        yearFormat="YYYY"
        field="dateOfBirth"
        maxValue={today(getLocalTimeZone())}
        onFocus={() => setDobFocused(true)}
        onBlur={() => setDobFocused(false)}
      />
    </FormFieldContainer>
  )
}

export { DobInput }
