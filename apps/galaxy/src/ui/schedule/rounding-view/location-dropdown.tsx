'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../shared'
import { useDropdownContext } from '../context'

const LocationDropdown = () => {
  const { clinics } = useDropdownContext()

  return (
    <FormFieldContainer className="h-full flex-1">
      <FormFieldLabel>Location</FormFieldLabel>
      <SelectInput
        field="locationId"
        placeholder="Select"
        options={clinics}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
