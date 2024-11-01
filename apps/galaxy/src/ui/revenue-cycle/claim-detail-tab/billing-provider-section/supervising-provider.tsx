'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getProviderOptionsAction } from '../actions'

const SupervisingProvider = () => {
  return (
    <FormFieldContainer className="flex-column">
      <FormFieldLabel>Supervising Provider</FormFieldLabel>
      <AsyncSelect
        field="supervisingProviderId"
        placeholder="Select"
        fetchOptions={getProviderOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { SupervisingProvider }
