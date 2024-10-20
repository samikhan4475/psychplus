'use client'

import { getClinicsOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const BillingLocations = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required={true}>Billing Location</FormFieldLabel>
      <AsyncSelect
        field="locationId"
        placeholder="Select"
        fetchOptions={getClinicsOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { BillingLocations }
