'use client'

import { AsyncSelect, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../shared'
import { getClinicsOptionsAction } from '../actions'

const LocationDropdown = () => {
  return (
    <FormFieldContainer className="h-full flex-1">
      <FormFieldLabel>Location</FormFieldLabel>
      <AsyncSelect
        field="locationId"
        placeholder="Select"
        fetchOptions={getClinicsOptionsAction}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
