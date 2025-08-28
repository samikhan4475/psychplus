import * as React from 'react'
import { Controller } from 'react-hook-form'
import { PhoneNumberInput } from '@psychplus/ui/phone-number-input'
import { FormField, useFormField, UseFormFieldProps } from './form-field'

type FormPhoneNumberInputProps = UseFormFieldProps & {
  className?: string,
  disabled?: boolean,
  size?: React.ComponentProps<typeof PhoneNumberInput>['size'],
  radius?: React.ComponentProps<typeof PhoneNumberInput>['radius'],
  placeholder?: string
}

const FormPhoneNumberInput = React.forwardRef<
  HTMLInputElement,
  FormPhoneNumberInputProps
>((props, ref) => {
  const { formFieldProps, childProps } = useFormField(props)
  const { size = "3", radius, placeholder, ...restChildProps } = childProps

  return (
    <FormField {...formFieldProps}>
      <Controller
        name={restChildProps.id}
        render={({ field }) => {
          return (
            <PhoneNumberInput
              size={size}
              radius={radius}
              placeholder={placeholder}
              id={restChildProps.id}
              ref={field.ref}
              name={field.name}
              value={field.value}
              disabled={restChildProps.disabled}
              onBlur={field.onBlur}
              onValueChange={(value) => {
                field.onChange(value)
              }}
              className={restChildProps.className ?? ''}
            />
          )
        }}
      />
    </FormField>
  )
})

FormPhoneNumberInput.displayName = 'FormPhoneNumberInput'

export { FormPhoneNumberInput }
