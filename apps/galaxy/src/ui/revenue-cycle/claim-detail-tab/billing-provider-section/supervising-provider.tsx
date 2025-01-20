'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useRevCycleDataProvider } from '../../revCycleContext'

const SupervisingProvider = () => {
  const { staffData } = useRevCycleDataProvider()
  return (
    <FormFieldContainer className="flex-column">
      <FormFieldLabel>Supervising Provider</FormFieldLabel>
      <SelectInput
        field="supervisingProviderId"
        placeholder="Select"
        options={staffData}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { SupervisingProvider }
