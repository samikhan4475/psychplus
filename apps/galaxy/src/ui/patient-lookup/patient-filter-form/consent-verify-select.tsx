'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const ConsentVerifySelect = () => {
  const options = useCodesetOptions(CODESETS.VerificationStatus)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Consent Verify</FormFieldLabel>
      <DropdownSelect field="consentVerificationStatus" options={options} />
    </FormFieldContainer>
  )
}

export { ConsentVerifySelect }
