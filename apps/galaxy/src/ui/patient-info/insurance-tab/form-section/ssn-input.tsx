'use client'

import * as React from 'react'
import { TextField } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { InsuranceSchemaType } from './schema'

type InputProps = Pick<React.ComponentProps<typeof TextField.Root>, 'size'>

interface SSNInputProps extends InputProps {
  name: keyof InsuranceSchemaType
  editable?: boolean
  placeholder?: string
}

const SSNInput = ({
  name,
  editable,
  placeholder = 'SSN',
  ...rest
}: SSNInputProps) => {
  const form = useFormContext<InsuranceSchemaType>()

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1">SSN</FormFieldLabel>
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => {
          return (
            <PatternFormat
              id={name}
              type="text"
              inputMode="numeric"
              format="###-##-####"
              mask="_"
              allowEmptyFormatting={false}
              placeholder={placeholder}
              name={name}
              value={typeof field.value === 'string' ? field.value : ''}
              disabled={field.disabled}
              onValueChange={({ value }) => field.onChange(value)}
              onBlur={field.onBlur}
              customInput={TextField.Root}
              className="border-pp-gray-2 h-7 w-full border border-solid !text-1 !outline-none [box-shadow:none]"
              readOnly={editable}
              {...rest}
            />
          )
        }}
      />
    </FormFieldContainer>
  )
}

export { SSNInput }
