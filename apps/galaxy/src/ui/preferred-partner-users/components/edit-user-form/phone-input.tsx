'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PhoneNumberInput as PhoneNumberInputBase,
} from '@/components'

interface PhoneInputProps {
  disabled?: boolean
}

const PhoneInput = ({ disabled = false }: PhoneInputProps) => {
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>Phone</FormFieldLabel>
      <div className={disabled ? 'pointer-events-none opacity-50' : ''}>
        <PhoneNumberInputBase field="phone" placeholder="(XXX) XXX-XXXX" />
      </div>
      <FormFieldError name="phone" />
    </FormFieldContainer>
  )
}

export { PhoneInput }
