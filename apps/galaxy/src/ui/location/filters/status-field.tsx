'use client'
import { CodesetSelect } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { CODESETS } from '@/constants'
import { useFormContext } from 'react-hook-form';
import { FormSchemaType } from '../form-schema';

const StatusField = () => {
  const form = useFormContext<FormSchemaType>()
  
  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel required>Status</FormFieldLabel>
      <CodesetSelect
        className="w-[120px]"
        codeset={CODESETS.LegalStatus}
        size="1"
        placeholder="Select Type"
        {...form.register('locationStatus')}
      />
    </FormFieldContainer>
  )
}

export { StatusField }