'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const ReferralStatusSelector = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Referral Status</FormFieldLabel>
      <CodesetSelect
        name="resourceStatus"
        size="1"
        codeset={CODESETS.ResourceStatus}
      />
      <FormFieldError name="resourceStatus" />
    </FormFieldContainer>
  )
}

export { ReferralStatusSelector }
