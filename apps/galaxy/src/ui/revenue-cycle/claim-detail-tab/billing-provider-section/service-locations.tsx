'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useRevCycleDataProvider } from '../../revCycleContext'

const ServiceLocations = () => {
  const { locationsData } = useRevCycleDataProvider()
  return (
    <FormFieldContainer>
      <FormFieldLabel required={true}>Service Location</FormFieldLabel>
      <SelectInput
        disabled={true}
        field="locationId"
        placeholder="Select"
        options={locationsData}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ServiceLocations }
