'use client'

import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { type PatientConsent } from '@/types'

const PolicyDescriptionCell = ({
  row: {
    original: { type },
  },
}: PropsWithRow<PatientConsent>) => {
  const codes = useCodesetCodes(CODESETS.PatientConsentPolicyType)

  const policy = codes.find((code) => code.value === type)
  const policyDescription = policy
    ? policy?.attributes?.find((attr) => attr.name === 'PolicyName')?.value
    : null

  return <TextCell>{policyDescription ?? ''}</TextCell>
}

export { PolicyDescriptionCell }
