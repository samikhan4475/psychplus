import React from 'react'
import { CalendarDate } from '@internationalized/date'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Flex } from '@radix-ui/themes'
import { addDays } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  RadioGroupItem,
} from '@/components-v2'
import { WaitlistSchemaType } from '../waitlist-form'

const PriorityRadioField = () => {
  const form = useFormContext<WaitlistSchemaType>()

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
      if (form.formState.isSubmitted) form.trigger()
    }
  }

  return (
    <FormFieldContainer className="w-full flex-col">
      <FormFieldLabel required>Priority</FormFieldLabel>

      <RadioGroup.Root
        name="priority"
        value={form.watch('priority')}
        onValueChange={handlePriorityChange}
      >
        <Flex gap="2">
          <RadioGroupItem id="FirstAvailable" value="FirstAvailable">
            First available
          </RadioGroupItem>
          <RadioGroupItem id="Custom" value="Custom">
            Custom
          </RadioGroupItem>
        </Flex>
      </RadioGroup.Root>
      <FormFieldError name="priority" />
    </FormFieldContainer>
  )
}

export { PriorityRadioField }
