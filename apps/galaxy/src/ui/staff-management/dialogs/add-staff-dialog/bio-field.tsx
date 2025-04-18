import React from 'react'
import { TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './schema'

const BioField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel>Bio Text</FormFieldLabel>
      <TextArea
        size="1"
        rows={2}
        maxLength={128}
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        {...form.register('biography')}
      />
    </FormFieldContainer>
  )
}

export { BioField }
