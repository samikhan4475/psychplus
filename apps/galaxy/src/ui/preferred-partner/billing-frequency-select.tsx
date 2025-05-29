'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const BillingFrequencySelect = () => {
  const options = useCodesetOptions(CODESETS.ChargePerType)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Billing Frequency</FormFieldLabel>
      <DropdownSelect
        field="billingFrequencyList[0]"
        options={options}
        buttonClassName="flex-1"
      />
    </FormFieldContainer>
  )
}

export { BillingFrequencySelect }
