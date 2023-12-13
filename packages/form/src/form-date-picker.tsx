import * as React from 'react'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@psychplus/ui/date-picker'
import { FormField, useFormField, UseFormFieldProps } from './form-field'

type DateFieldInputProps = React.ComponentPropsWithRef<typeof DatePicker>
type FormDatePickerProps = UseFormFieldProps & DateFieldInputProps

const FormDatePicker = React.forwardRef<HTMLInputElement, FormDatePickerProps>(
  (props, ref) => {
    const { formFieldProps, childProps } = useFormField(props)

    return (
      <FormField {...formFieldProps}>
        <Controller
          name={childProps.id}
          render={({ field }) => {
            return (
              <DatePicker
                onSelect={field.onChange}
                date={field.value}
                {...childProps}
              />
            )
          }}
        />
      </FormField>
    )
  },
)

FormDatePicker.displayName = 'FormDatePicker'

export { FormDatePicker }
