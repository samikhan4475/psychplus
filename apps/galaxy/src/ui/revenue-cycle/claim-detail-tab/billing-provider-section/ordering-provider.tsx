'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getProviderOptionsAction } from '../actions'

const OrderingProvider = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Ordering Provider</FormFieldLabel>
      <AsyncSelect
        field="orderingProviderId"
        placeholder="Select"
        fetchOptions={getProviderOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { OrderingProvider }
