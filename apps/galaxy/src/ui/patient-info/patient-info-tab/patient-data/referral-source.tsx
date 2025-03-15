'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const ReferralSource = () => {
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1" required>
        Referral Source
      </FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.ReferralSource}
        size="1"
        name="referralSource"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="referralSource" />
    </FormFieldContainer>
  )
}

export { ReferralSource }
