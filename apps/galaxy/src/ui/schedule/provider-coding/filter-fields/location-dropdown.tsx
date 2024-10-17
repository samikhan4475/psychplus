'use client'

import { getClinicsOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'

const LocationDropdown = () => {
  return (
    <FormFieldContainer className="h-full flex-1">
      <FormFieldLabel>Location</FormFieldLabel>
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

export { LocationDropdown }
