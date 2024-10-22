'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ConsentVerifySelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Consent Verify</FormFieldLabel>
      <CodesetSelect
        size="1"
        name="consentVerificationStatus"
        codeset={CODESETS.VerificationStatus}
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { ConsentVerifySelect }
