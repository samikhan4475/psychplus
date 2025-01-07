'use client'

import { AsyncSelect } from '@/components'
import { getClinicsOptionsAction } from '../actions'
import { FieldLabel, FormFieldContainer } from '../shared'

const LocationDropdown = () => {
  return (
    <FormFieldContainer className="h-full flex-1">
      <FieldLabel>Location</FieldLabel>
      <AsyncSelect
        field="locationId"
        placeholder="Select"
        fetchOptions={getClinicsOptionsAction}
        buttonClassName="h-6 w-full truncate max-w-[10px] min-w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
