'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const TaxonomySelect = () => {
  const options = useCodesetOptions(CODESETS.ProviderTaxonomy)
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>Taxonomy</FormFieldLabel>
      <SelectInput
        options={options}
        field="taxonomy"
        size="1"
        buttonClassName="w-full h-7"
      />
    </FormFieldContainer>
  )
}

export { TaxonomySelect }
