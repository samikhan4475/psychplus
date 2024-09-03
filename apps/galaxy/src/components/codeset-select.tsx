'use client'

import { Select } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { useCodesetCodes } from '@/hooks'
import { cn } from '@/utils'

interface CodesetFormSelectProps
  extends React.ComponentProps<typeof Select.Root> {
  name: string
  codeset: string
  exclude?: string[]
  placeholder?: string
}

const CodesetSelect = ({
  name,
  codeset,
  exclude,
  placeholder,
  ...selectProps
}: CodesetFormSelectProps) => {
  const form = useFormContext()
  const codes = useCodesetCodes(codeset)

  const items = codes
    .filter((code) => !exclude?.includes(code.value))
    .map((code) => (
      <Select.Item key={code.value} value={code.value}>
        {code.display}
      </Select.Item>
    ))

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        const { ref, ...rest } = field

        const triggerProps = {
          placeholder: placeholder ?? 'Select',
        }

        return (
          <Select.Root
            onValueChange={field.onChange}
            {...rest}
            {...selectProps}
          >
            <Select.Trigger
              {...triggerProps}
              variant="soft"
              className={cn(
                'font-[400] text-gray-12 outline outline-1 outline-gray-7',
                selectProps.disabled ? 'bg-gray-3 text-gray-11' : 'bg-[white]',
              )}
            />
            <Select.Content position="popper" align="center" highContrast>
              {items}
            </Select.Content>
          </Select.Root>
        )
      }}
    />
  )
}
export { CodesetSelect }
