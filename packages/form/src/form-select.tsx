import * as React from 'react'
import { Controller } from 'react-hook-form'
import { Select } from '@psychplus/ui/select'
import { FormField, useFormField, type UseFormFieldProps } from './form-field'

interface Props
  extends UseFormFieldProps,
    React.ComponentProps<typeof Select.Root> {
  name: string
  label: string
  placeholder?: string
  buttonClassName?: string
  contentClassName?: string
  options: {
    label: string
    value: string
    disabled?: boolean
  }[]
}

const FormSelect = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { formFieldProps, childProps } = useFormField(props)

  return (
    <FormField {...formFieldProps}>
      <Controller
        name={childProps.id}
        render={({ field }) => {
          return (
            <Select.Root
              size="3"
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={props.defaultValue}
              {...childProps}
            >
              <Select.Trigger
                ref={ref}
                className={props.buttonClassName?? ''}
                id={formFieldProps.id}
                placeholder={props.placeholder}
              />
              <Select.Content position='popper' className={props.contentClassName?? ''}>
                {childProps?.options?.map((option) => (
                  <Select.Item
                    value={option.value}
                    key={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )
        }}
      />
    </FormField>
  )
})

FormSelect.displayName = 'FormSelect'

export { FormSelect }
