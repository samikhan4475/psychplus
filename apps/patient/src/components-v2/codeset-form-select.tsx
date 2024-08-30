'use client'
 
import { useState } from 'react'
import { cn } from '@psychplus-v2/utils'
import { Select } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { useCodesetCodes } from '@/providers'

interface CodesetFormSelectProps
  extends React.ComponentProps<typeof Select.Root> {
  name: string
  codeset: string
  exclude?: string[]
  placeholder?: string
}

const CodesetFormSelect = ({
  name,
  codeset,
  exclude,
  placeholder,
  ...selectProps
}: CodesetFormSelectProps) => {
  const form = useFormContext()
  const [resetSelectedValue, setResetSelectedValue] = useState(true)
  const codes = useCodesetCodes(codeset)
  const selectedValue = form.watch(name)
 
  const items = codes
    .filter((code) => !exclude?.includes(code.value))
    .map((code) => (
      <Select.Item
        key={code.value}
        value={code.value}
        className={cn(
          'hover:bg-[#151B4A] hover:text-[white]',
          selectedValue === code.value && resetSelectedValue
            && 'bg-[#151B4A] text-[white]',
        )}
        onMouseOver={() => setResetSelectedValue(false)}
      >
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
              radius="full"
              className={cn(
                'outline outline-1 outline-gray-7 font-[400] text-gray-12',
                selectProps.disabled ? 'bg-gray-3 text-gray-11' : 'bg-[white]',
              )}
              onClick={() => setResetSelectedValue(true)}
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

export { CodesetFormSelect }