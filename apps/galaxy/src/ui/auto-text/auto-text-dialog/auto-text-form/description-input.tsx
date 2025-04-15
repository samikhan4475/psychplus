'use client'

import { TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AutoTextSchemaType } from './schema'

const DescriptionInput = () => {
  const form = useFormContext<AutoTextSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1" required>
        Description
      </FormFieldLabel>
      <TextArea
        size="1"
        rows={8}
        {...form.register('content')}
        className="border-pp-gray-2 w-full border border-solid text-1 !outline-none [box-shadow:none]"
      />
      <FormFieldError name="name" />
    </FormFieldContainer>
  )
}

export { DescriptionInput }
