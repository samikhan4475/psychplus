'use client'

import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const OrderBySelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Ordered By</FormFieldLabel>
      <AsyncSelect
        field="orderingStaffId"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full w-[144px] flex-1"
      />
    </FormFieldContainer>
  )
}

export { OrderBySelect }
