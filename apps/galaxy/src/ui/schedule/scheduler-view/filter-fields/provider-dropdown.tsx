'use client'

import { useCallback } from 'react'
import { AsyncSelect } from '@/components'
import { getProvidersOptionsAction } from '../../client-actions'
import { FieldLabel, FormFieldContainer } from '../../shared'

const ProviderDropdown = () => {
  const fetchOptions = useCallback(() => getProvidersOptionsAction(), [])
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Provider</FieldLabel>
      <AsyncSelect
        field="staffIds"
        placeholder="Select"
        fetchOptions={fetchOptions}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
