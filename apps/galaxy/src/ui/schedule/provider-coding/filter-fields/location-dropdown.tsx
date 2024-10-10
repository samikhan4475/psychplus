'use client'

import { AsyncSelect, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'
import { getClinicsOptionsAction } from '@/actions'

const LocationDropdown = () => {
  return (
    <FormFieldContainer className="h-full flex-1">
    <FormFieldLabel>Location</FormFieldLabel>
    <AsyncSelect
      field="primaryInsuranceName"
      placeholder="Select"
      fetchOptions={getClinicsOptionsAction}
      buttonClassName="w-full h-6"
      className="h-full flex-1"
    />
  </FormFieldContainer>
  )
}

export { LocationDropdown }
