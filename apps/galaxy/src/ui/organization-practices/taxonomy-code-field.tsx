'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from './organization-practices-list-filter-form'

const TaxonomyCodeField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Taxonomy Code</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('taxonomyCode')}
        placeholder="Add taxonomy"
      />
    </FormFieldContainer>
  )
}

export { TaxonomyCodeField }
