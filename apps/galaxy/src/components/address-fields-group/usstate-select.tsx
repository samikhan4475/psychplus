'use client'

import { useMemo } from 'react'
import { Select } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { cn } from '@/utils'
import { fieldName } from './utils'

interface UsStateSelectProps {
  required?: boolean
  prefix?: string
  className?: string
  labelClassName?: string
  disabled?: boolean
  fieldContainerClassName?: string
  stateFieldContainerClassName?: string
}
const UsStateSelect = ({
  prefix,
  required = true,
  className,
  labelClassName,
  disabled,
  fieldContainerClassName = 'flex-1',
  stateFieldContainerClassName,
  ...selectProps
}: UsStateSelectProps) => {
  const form = useFormContext()
  const name = fieldName('state', prefix)

  const codes = useCodesetCodes(CODESETS.UsStates)
  const items = useMemo(() => {
    const mapped = codes.map((code) => (
      <Select.Item key={code.value} value={code.value}>
        {code.value}
      </Select.Item>
    ))
    return mapped
  }, [codes])

  return (
    <FormFieldContainer
      className={cn(fieldContainerClassName, stateFieldContainerClassName)}
    >
      <FormFieldLabel
        className={cn('!text-1', labelClassName)}
        required={required}
      >
        State
      </FormFieldLabel>
      <Controller 
        name={name}
        control={form.control}
        render={({ field }) => {
          const { ref, ...rest } = field

          const triggerProps = {
            placeholder: 'Select',
          }

          return (
            <Select.Root
              size="1"
              onValueChange={(val) =>
                field.onChange(val === '__none__' ? '' : val)
              }
              disabled={form.formState.disabled}
              {...rest}
              {...selectProps}
            >
              <Select.Trigger
                {...triggerProps}
                variant="soft"
                className={cn(
                  'text-1 border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] disabled:bg-gray-3 disabled:text-gray-11',
                  disabled ? 'bg-gray-3 text-gray-11' : 'bg-[white]',
                  className,
                )}
              />
              <Select.Content position="popper" align="center" highContrast className='text-1'>
                {items}
              </Select.Content>
            </Select.Root>
          )
        }}
      />
      <FormFieldError name={name} />
    </FormFieldContainer>
  )
}

export { UsStateSelect }
