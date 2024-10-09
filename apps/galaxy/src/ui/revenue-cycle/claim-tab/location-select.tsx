'use client'

import { getClinicsOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const LocationSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Location</FormFieldLabel>
      <AsyncSelect
        field="locationId"
        placeholder="Select"
        fetchOptions={getClinicsOptionsAction}
        buttonClassName="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { LocationSelect }
