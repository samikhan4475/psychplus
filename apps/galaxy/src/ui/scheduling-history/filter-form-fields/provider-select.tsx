'use client'

import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const ProviderSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <AsyncSelect
        field="providerStaffId"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        buttonClassName="w-[150px] h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderSelect }
