'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const TaxonomyCodeField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="pb-[3px]">Taxonomy Code</FormFieldLabel>
      <TextInput field="taxonomy" className="h-6 w-full" />
      <FormFieldError name="taxonomy" />
    </FormFieldContainer>
  )
}

export { TaxonomyCodeField }
