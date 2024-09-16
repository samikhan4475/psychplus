'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const RemainingVisitInput = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1">Remaining Visits</FormFieldLabel>
      <TextField.Root
        disabled
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('remainingVisits')}
        size="1"
      />
      <FormFieldError name="remainingVisits" />
    </FormFieldContainer>
  )
}

export { RemainingVisitInput }
