'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useRevCycleDataProvider } from '../revCycleContext'

const LocationSelect = () => {
  const { locationsData } = useRevCycleDataProvider()

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Location</FormFieldLabel>
      <SelectInput
        field="locationId"
        placeholder="Select"
        options={locationsData}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationSelect }
