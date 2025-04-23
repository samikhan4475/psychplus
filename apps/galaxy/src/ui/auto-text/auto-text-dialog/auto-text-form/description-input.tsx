'use client'

import { useFormContext } from 'react-hook-form'
import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AutoTextSchemaType } from './schema'

const DescriptionInput = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext<AutoTextSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1" required>
        Description
      </FormFieldLabel>
      <AutoResizeInput
        field="content"
        className="min-h-44 !w-full !max-w-[615px]"
        enableAutoSuggestions={false}
        disabled={isSubmitting}
        maxLength={4000}
      />
      <FormFieldError name="content" />
    </FormFieldContainer>
  )
}

export { DescriptionInput }
