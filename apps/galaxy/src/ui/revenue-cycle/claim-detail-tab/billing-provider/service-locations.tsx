'use client'

import { getClinicsOptionsAction } from '@/actions'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ServiceLocations = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required={true}>Service Location</FormFieldLabel>
      <AsyncSelect
        disabled={true}
        field="locationId"
        placeholder="Select"
        fetchOptions={getClinicsOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ServiceLocations }
