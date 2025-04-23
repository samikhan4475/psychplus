'use client'

import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'

const EndDateTimeInput = ({ index }: DrugBlockProps) => {
  const form = useFormContext()
  const endTimeField = getFieldName(index, 'endTime')

  return (
    <FormFieldContainer className="flex-1 gap-1">
      <FormFieldLabel required>Time</FormFieldLabel>
      <TextField.Root
        type="time"
        size="1"
        {...form.register(endTimeField)}
        className="border-pp-gray-2 h-7 w-full  border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
        disabled
      />
      <FormFieldError name={endTimeField} />
    </FormFieldContainer>
  )
}

export { EndDateTimeInput }
