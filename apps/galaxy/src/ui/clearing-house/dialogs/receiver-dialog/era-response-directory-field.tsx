'use client'

import { useFormContext } from 'react-hook-form'
import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './receiver-form'

const EraResponseDirectoryField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>ERA Response Directory</FormFieldLabel>
      <TextInput
        field="eraResponseDirectory"
        className="w-full"
        disabled={form.watch('isSupportMultipleDirectory') === 'no'}
      />
      <FormFieldError name="eraResponseDirectory" />
    </FormFieldContainer>
  )
}

export { EraResponseDirectoryField }
