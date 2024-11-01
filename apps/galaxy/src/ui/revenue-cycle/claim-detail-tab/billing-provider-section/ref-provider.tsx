'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getProviderOptionsAction } from '../actions'

const RefProvider = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Ref. Provider</FormFieldLabel>
      <AsyncSelect
        field="referringProviderId"
        placeholder="Select"
        fetchOptions={getProviderOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { RefProvider }
