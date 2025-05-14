import React from 'react'
import { CalendarDate } from '@internationalized/date'
import { addDays } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  RadioGroup,
} from '@/components'

const PriorityRadioField = () => {
  const form = useFormContext()

  const handlePriorityChange = (value: string) => {
    form.setValue('priority', value)
    if (value === 'FirstAvailable') {
      const today = new Date()
      const from = new CalendarDate(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
      )
      const to = new CalendarDate(
        addDays(today, 14).getFullYear(),
        addDays(today, 14).getMonth() + 1,
        addDays(today, 14).getDate(),
      )

      form.setValue('fromDate', from)
      form.setValue('toDate', to)
    }
  }

  return (
    <FormFieldContainer className="w-full flex-col">
      <FormFieldLabel required>Priority</FormFieldLabel>
      <RadioGroup
        className="bg-white border-none"
        field="priority"
        onValueChange={handlePriorityChange}
        options={[
          { label: 'First available', value: 'FirstAvailable' },
          { label: 'Custom', value: 'Custom' },
        ]}
      />
      <FormFieldError name="priority" />
    </FormFieldContainer>
  )
}

export { PriorityRadioField }
