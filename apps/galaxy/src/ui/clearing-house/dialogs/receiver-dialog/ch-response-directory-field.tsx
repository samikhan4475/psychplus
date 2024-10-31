'use client'

import { useFormContext } from 'react-hook-form'
import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './receiver-form'

const ChResponseDirectoryField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>CH. Response Directory</FormFieldLabel>
      <TextInput
        field="chResponseDirectory"
        className="w-full"
        disabled={form.watch('isSupportMultipleDirectory') === 'no'}
      />
      <FormFieldError name="chResponseDirectory" />
    </FormFieldContainer>
  )
}

export { ChResponseDirectoryField }
