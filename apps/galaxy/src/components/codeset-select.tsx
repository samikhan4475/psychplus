'use client'

import { useMemo } from 'react'
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
  className?: string
  groupingCodes?: string[]
}

const CodesetSelect = ({
  name,
  codeset,
  exclude,
  placeholder,
  className,
  groupingCodes,
  ...selectProps
}: CodesetFormSelectProps) => {
  const form = useFormContext()
  const codes = useCodesetCodes(codeset)

  const groupedCodes = useMemo(
    () =>
      groupingCodes
        ? codes.filter((item) =>
            groupingCodes.some((code) => item.groupingCode?.startsWith(code)),
          )
        : codes,
    [codes, groupingCodes],
  )

  const items = useMemo(
    () =>
      groupedCodes
        .filter((code) => !exclude?.includes(code.value))
        .map((code) => (
          <Select.Item key={code.value} value={code.value}>
            {code.display}
          </Select.Item>
        )),
    [groupedCodes, exclude],
  )

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
            disabled={form.formState.disabled}
            {...rest}
            {...selectProps}
          >
            <Select.Trigger
              {...triggerProps}
              variant="soft"
              className={cn(
                'border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] disabled:bg-gray-3 disabled:text-gray-11',
                selectProps.disabled ? 'bg-gray-3 text-gray-11' : 'bg-[white]',
                className,
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
