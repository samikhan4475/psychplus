'use client'

import { AsyncSelect, FormFieldLabel } from '@/components'
import { getProvidersOptionsAction } from '../../actions'
import { FormFieldContainer } from '../../shared'

const ProviderDropdown = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <AsyncSelect
        field="provider"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
