import * as React from 'react'
import { Controller } from 'react-hook-form'
import { PhoneNumberInput } from '@psychplus/ui/phone-number-input'
import { FormField, useFormField, UseFormFieldProps } from './form-field'

type FormPhoneNumberInputProps = UseFormFieldProps

const FormPhoneNumberInput = React.forwardRef<
  HTMLInputElement,
  FormPhoneNumberInputProps
>((props, ref) => {
  const { formFieldProps, childProps } = useFormField(props)

  return (
    <FormField {...formFieldProps}>
      <Controller
        name={childProps.id}
        render={({ field }) => {
          return (
            <PhoneNumberInput
              size="3"
              id={childProps.id}
              ref={field.ref}
              name={field.name}
              value={field.value}
              disabled={field.disabled}
              onBlur={field.onBlur}
              onValueChange={(value) => {
                field.onChange(value)
              }}
            />
          )
        }}
      />
    </FormField>
  )
})

FormPhoneNumberInput.displayName = 'FormPhoneNumberInput'

export { FormPhoneNumberInput }
