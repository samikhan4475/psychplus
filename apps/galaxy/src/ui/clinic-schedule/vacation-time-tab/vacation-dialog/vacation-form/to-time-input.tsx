'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError } from '@/components/form'
import { AddVacationSchemaType } from './schema'

const ToTimeInput = () => {
  const form = useFormContext<AddVacationSchemaType>()
  return (
    <FormFieldContainer className="flex-1 gap-1">
      <TextField.Root
        size="1"
        type="time"
        {...form.register('toTime')}
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
      />
      <FormFieldError name="toTime" />
    </FormFieldContainer>
  )
}

export { ToTimeInput }
