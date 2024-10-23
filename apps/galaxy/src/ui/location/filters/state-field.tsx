'use client'
import { CodesetSelect } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { CODESETS } from '@/constants'
import { useFormContext } from 'react-hook-form';
import { FormSchemaType } from '../form-schema';

const StateField = () => {
  const form = useFormContext<FormSchemaType>()
  
  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel>State</FormFieldLabel>
      <CodesetSelect
        className="w-[120px]"
        codeset={CODESETS.UsStates}
        size="1"
        placeholder="Select Type"
        {...form.register('locationState')}
      />
    </FormFieldContainer>
  )
}

export { StateField }