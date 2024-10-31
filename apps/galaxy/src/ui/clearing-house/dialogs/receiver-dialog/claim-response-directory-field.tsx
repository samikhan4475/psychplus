'use client'

import { useFormContext } from 'react-hook-form'
import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './receiver-form'

const ClaimResponseDirectoryField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Claim Response Directory</FormFieldLabel>
      <TextInput
        field="claimResponseDirectory"
        className="w-full"
        disabled={form.watch('isSupportMultipleDirectory') === 'no'}
      />
      <FormFieldError name="claimResponseDirectory" />
    </FormFieldContainer>
  )
}

export { ClaimResponseDirectoryField }
