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
  isRequired: boolean
}

const TemplateFilterDatePicker = ({
  title,
  name,
  isRequired,
}: TemplateDatePickerProps) => {
  const { register } = useFormContext()
  const today = getCalendarDate()
  const isScheduleReport = name?.includes('scheduleParameterValue') ?? false
  return (
    <FormFieldContainer
      className={`w-full ${
        !isScheduleReport ? 'flex-row items-baseline justify-start' : ''
      } gap-1`}
    >
      <FormFieldLabel className="!text-1" required={isRequired}>
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
