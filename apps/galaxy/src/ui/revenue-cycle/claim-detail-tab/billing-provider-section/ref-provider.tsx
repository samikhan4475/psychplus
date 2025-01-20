'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useRevCycleDataProvider } from '../../revCycleContext'

const RefProvider = () => {
  const { staffData } = useRevCycleDataProvider()
  return (
    <FormFieldContainer>
      <FormFieldLabel>Ref. Provider</FormFieldLabel>
      <SelectInput
        field="referringProviderId"
        placeholder="Select"
        options={staffData}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { RefProvider }
