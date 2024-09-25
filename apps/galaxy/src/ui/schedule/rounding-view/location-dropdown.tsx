'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'
import { FormFieldContainer } from '../shared'

const LocationDropdown = () => {
  const clinicOptions = useStore((state) => state.clinics)

  return (
    <FormFieldContainer className="h-full flex-1">
      <FormFieldLabel>Location</FormFieldLabel>
      <SelectInput
        field="location"
        placeholder="Select"
        options={clinicOptions}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
