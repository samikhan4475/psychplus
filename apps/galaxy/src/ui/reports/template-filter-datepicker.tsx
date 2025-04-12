'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getCalendarDate, getCalendarDateLabel } from '@/utils'

type TemplateDatePickerProps = {
  title: string
  name: string
}

const TemplateFilterDatePicker = ({ title, name }: TemplateDatePickerProps) => {
  const { register } = useFormContext()
  const today = getCalendarDate()
  return (
    <FormFieldContainer className="w-full flex-row items-baseline justify-start gap-1">
      <FormFieldLabel className="!text-1" required>
        {title}
      </FormFieldLabel>
      <Flex direction="column">
        <TextField.Root
          type="date"
          className="border-pp-gray-2 h-6"
          {...register(name)}
          min={getCalendarDateLabel(today.subtract({ years: 40 }))}
          max={getCalendarDateLabel(today.add({ years: 100 }))}
        />
        <FormFieldError name={name} />
      </Flex>
    </FormFieldContainer>
  )
}

export { TemplateFilterDatePicker }
