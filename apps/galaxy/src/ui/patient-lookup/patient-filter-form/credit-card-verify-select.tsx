'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const CreditCardVerifySelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Credit Card Verify</FormFieldLabel>
      <CodesetSelect
        size="1"
        codeset={CODESETS.VerificationStatus}
        name="creditCardVerificationStatus"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { CreditCardVerifySelect }
