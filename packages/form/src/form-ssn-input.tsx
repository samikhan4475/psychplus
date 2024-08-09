import * as React from 'react'
import { Controller } from 'react-hook-form'
import { SsnInput } from '@psychplus/ui/ssn-input'
import { FormField, useFormField, UseFormFieldProps } from './form-field'

type SsnInputProps = UseFormFieldProps & {
  className?: string
  disabled?: boolean
}

const FormSsnInput = React.forwardRef<HTMLInputElement, SsnInputProps>(
  (props) => {
    const { formFieldProps, childProps } = useFormField(props)

    return (
      <FormField {...formFieldProps}>
        <Controller
          name={childProps.id}
          render={({ field }) => {
            return (
              <SsnInput
                size="3"
                id={childProps.id}
                ref={field.ref}
                name={field.name}
                value={field.value}
                disabled={childProps.disabled}
                onBlur={field.onBlur}
                onValueChange={(value) => {
                  field.onChange(value)
                }}
                className={childProps.className ?? ''}
              />
            )
          }}
        />
      </FormField>
    )
  },
)

FormSsnInput.displayName = 'FormSsnInput'

export { FormSsnInput }
