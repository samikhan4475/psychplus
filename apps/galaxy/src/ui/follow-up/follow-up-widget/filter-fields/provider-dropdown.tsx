'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getProvidersOptionsAction } from '@/ui/schedule/actions'

const ProviderDropdown = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <AsyncSelect
        field="provider"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        buttonClassName="w-full h-6"
        className="w-[150px]"
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
