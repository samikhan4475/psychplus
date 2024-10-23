'use client'

import { getStaffOptionsAction } from '@/actions/get-staff'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const OrderingProvider = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Ordering Provider</FormFieldLabel>
      <AsyncSelect
        field="orderingProviderId"
        placeholder="Select"
        fetchOptions={getStaffOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { OrderingProvider }
