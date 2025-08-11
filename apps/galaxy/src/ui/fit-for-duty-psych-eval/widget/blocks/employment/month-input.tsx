'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { generateMonthOptions, MONTH_LABELS } from '@/utils'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'

const MonthInput = ({ disabled = false }: BlockProps) => {
  const form = useFormContext<SchemaType>()
  const options = useMemo(() => generateMonthOptions(MONTH_LABELS), [])
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Month</FormFieldLabel>
      <SelectInput
        field="employedSinceMonth"
        options={options}
        disabled={disabled}
        buttonClassName="w-[95px]"
        onValueChange={(value) => {
          form.setValue('employedSinceMonth', value, {
            shouldValidate: true,
          })
        }}
      />
      <FormFieldError name="employedSinceMonth" />
    </FormFieldContainer>
  )
}

export { MonthInput }
