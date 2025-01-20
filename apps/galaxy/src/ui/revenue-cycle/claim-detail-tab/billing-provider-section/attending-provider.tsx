'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useRevCycleDataProvider } from '../../revCycleContext'

const AttendingProvider = () => {
  const { staffData } = useRevCycleDataProvider()

  return (
    <FormFieldContainer>
      <FormFieldLabel>Attending Provider</FormFieldLabel>
      <SelectInput
        field="attendingProviderId"
        placeholder="Select"
        options={staffData}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { AttendingProvider }
