'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getProviderOptionsAction } from '../actions'

const RenderingProvider = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required={true}>Rendering Provider</FormFieldLabel>
      <AsyncSelect
        field="renderingProviderId"
        placeholder="Select"
        fetchOptions={getProviderOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { RenderingProvider }
