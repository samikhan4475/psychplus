'use client'

import { AsyncSelect } from '@/components'
import { getProvidersOptionsAction } from '../../client-actions'
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
