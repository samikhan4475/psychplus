'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { useRevCycleDataProvider } from '../../revCycleContext'

const ClaimBillingLocationSelect = () => {
  const { locationsData } = useRevCycleDataProvider()
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Billing Location</FormFieldLabel>
      <SelectInput
        field="billingLocationId"
        placeholder="Select"
        options={locationsData}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
      <FormFieldError name={`billingLocationId`} />
    </FormFieldContainer>
  )
}

export { ClaimBillingLocationSelect }
