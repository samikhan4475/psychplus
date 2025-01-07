'use client'

import { getClinicsOptionsAction } from '@/actions'
import { AsyncSelect } from '@/components'
import { FieldLabel, FormFieldContainer } from '../../shared'

const LocationDropdown = () => {
  return (
    <FormFieldContainer className="h-full flex-1">
      <FieldLabel>Location</FieldLabel>
      <AsyncSelect
        field="locationId"
        placeholder="Select"
        fetchOptions={getClinicsOptionsAction}
        buttonClassName="w-full h-6 max-w-[10px] min-w-full truncate"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
