'use client'

import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect } from '@/components'
import { FieldLabel, FormFieldContainer } from '../../shared'

const ProviderDropdown = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Provider</FieldLabel>
      <AsyncSelect
        field="staffIds"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
