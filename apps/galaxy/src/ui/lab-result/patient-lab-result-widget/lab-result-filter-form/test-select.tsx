'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { LabResultSchemaType } from './schema'

const TestSelect = () => {
  const form = useFormContext<LabResultSchemaType>()
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Test</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Test name"
        className="border-pp-gray-2 h-6 w-[122px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('labTestNamePartial')}
      />
    </FormFieldContainer>
  )
}

export { TestSelect }
