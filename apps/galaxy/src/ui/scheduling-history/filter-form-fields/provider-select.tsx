'use client'

import { useCallback } from 'react'
import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const ProviderSelect = () => {
  const fetchOptions = useCallback(() => getProvidersOptionsAction(), [])
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <AsyncSelect
        field="providerStaffId"
        placeholder="Select"
        fetchOptions={fetchOptions}
        buttonClassName="w-[150px] h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderSelect }
