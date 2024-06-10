import React from 'react'
import { Flex, Switch } from '@radix-ui/themes'
import { Controller } from 'react-hook-form'

interface Props extends React.ComponentProps<typeof Switch> {
  name: string
  placeholder?: string
  buttonClassName?: string
}

const FormSwitch = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <Controller
      name={props.name}
      render={({ field }) => {
        return (
          <Flex gap="2">
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              ref={ref}
              {...props}
            />
            {field.value ? 'Yes' : 'No'}
          </Flex>
        )
      }}
    />
  )
})
export { FormSwitch }
