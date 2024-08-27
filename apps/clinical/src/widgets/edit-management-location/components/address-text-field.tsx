import React from 'react'
import { useFormContext } from 'react-hook-form'
import { AddressForm } from '../types'
import TextFieldLabel from './text-field'

interface AddressTextFieldProps {
  label: string
  name: keyof AddressForm
  placeholder?: string
  required?: boolean
  disabled?: boolean
}

const AddressTextField = ({
  label,
  name,
  placeholder = '',
  required = false,
  disabled = false,
}: AddressTextFieldProps) => {
  const { formState, register, setValue } = useFormContext()

  return (
    <TextFieldLabel
      label={label}
      type="text"
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      error={formState.errors?.[name]?.message as string | undefined}
      onChange={(value: string) => {
        setValue(name, value)
      }}
      register={register(name)}
    />
  )
}

export { AddressTextField }
