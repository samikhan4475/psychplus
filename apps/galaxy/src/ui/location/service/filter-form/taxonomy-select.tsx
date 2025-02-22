'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { transformInOptions } from '../transform'

const TaxonomySelect = () => {
  const option = useCodesetOptions(CODESETS.ProviderTaxonomy)

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Taxonomy</FormFieldLabel>
      <SelectInput
        options={transformInOptions(option)}
        field="taxonomy"
        size="1"
        buttonClassName="w-[120px]"
      />
    </FormFieldContainer>
  )
}

export { TaxonomySelect }
