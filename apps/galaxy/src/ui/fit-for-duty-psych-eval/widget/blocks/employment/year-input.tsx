'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { generateYearOptions } from '@/utils'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'

const YearInput = ({ disabled = false }: BlockProps) => {
  const form = useFormContext<SchemaType>()
  const currentYear = new Date().getFullYear()
  const options = useMemo(
    () => generateYearOptions(1900, currentYear + 30),
    [currentYear],
  )
  return (
    <FormFieldContainer className="flex flex-row items-center gap-2">
      <FormFieldLabel>Year</FormFieldLabel>
      <SelectInput
        field="employedSinceYear"
        options={options}
        disabled={disabled}
        buttonClassName="w-[95px]"
        onValueChange={(value) => {
          form.setValue('employedSinceYear', value)
          form.trigger('employedSinceYear')
        }}
      />
      <FormFieldError name="employedSinceYear" />
    </FormFieldContainer>
  )
}

export { YearInput }
