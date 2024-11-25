'use client'

import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const OrderBySelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Ordered By</FormFieldLabel>
      <AsyncSelect
        field="orderBy"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { OrderBySelect }
