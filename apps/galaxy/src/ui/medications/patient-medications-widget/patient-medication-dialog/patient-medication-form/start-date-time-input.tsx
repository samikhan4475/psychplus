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
import { PatientMedicationSchemaType } from './schema'

const StartDateTimeInput = ({ index }: DrugBlockProps) => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const startTimeField = getFieldName(index, 'startTime')

  return (
    <FormFieldContainer className="flex-1 gap-1">
      <FormFieldLabel required>Time</FormFieldLabel>
      <TextField.Root
        type="time"
        size="1"
        {...form.register(startTimeField)}
        className="border-pp-gray-2 h-7 border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
      />
      <FormFieldError name={startTimeField} />
    </FormFieldContainer>
  )
}

export { StartDateTimeInput }
