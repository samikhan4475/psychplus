'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useRevCycleDataProvider } from '../../revCycleContext'

const OrderingProvider = () => {
  const { staffData } = useRevCycleDataProvider()
  return (
    <FormFieldContainer>
      <FormFieldLabel>Ordering Provider</FormFieldLabel>
      <SelectInput
        field="orderingProviderId"
        placeholder="Select"
        options={staffData}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { OrderingProvider }
