'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const CreditCardVerifySelect = () => {
  const options = useCodesetOptions(CODESETS.VerificationStatus)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Credit Card Verify</FormFieldLabel>
      <DropdownSelect field="creditCardVerificationStatus" options={options} />
    </FormFieldContainer>
  )
}

export { CreditCardVerifySelect }
