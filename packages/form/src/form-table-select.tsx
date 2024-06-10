import * as React from 'react'
import { Controller } from 'react-hook-form'
import { Select } from '@psychplus/ui/select'

interface Props
  extends
    React.ComponentProps<typeof Select.Root> {
  name: string
  placeholder?: string
  buttonClassName?:string
  options: {
    label: string
    value: string
    disabled?: boolean
  }[]
}

const FormTableSelect = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {

  return (
      <Controller
        name={props.name}
        render={({ field }) => {
          return (
            <Select.Root
              size="2"
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={props.defaultValue}
              {...props}
            >
              <Select.Trigger
                ref={ref}
                id={props.name}
                className={`${props.buttonClassName?? '[box-shadow:none] w-full h-5' }`}
                placeholder={props.placeholder}
              />
              <Select.Content>
                {props.options.map((option) => (
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
  )
})

FormTableSelect.displayName = 'FormTableSelect'

export { FormTableSelect }
