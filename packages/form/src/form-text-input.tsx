import * as React from 'react'
import { TextField, type TextFieldInputProps } from '@psychplus/ui/text-field'
import { FormField, useFormField, UseFormFieldProps } from './form-field'

type FormTextInputProps = UseFormFieldProps & TextFieldInputProps

const FormTextInput = React.forwardRef<HTMLInputElement, FormTextInputProps>(
  (props, ref) => {
    const { formFieldProps, childProps } = useFormField(props)

    return (
      <FormField {...formFieldProps}>
        <TextField.Input size="3" {...childProps} ref={ref} />
      </FormField>
    )
  },
)

FormTextInput.displayName = 'FormTextInput'

export { FormTextInput }
