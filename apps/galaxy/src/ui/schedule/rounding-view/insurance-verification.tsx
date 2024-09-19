'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'
import { useRoundingFiltersContext } from './context'

const InsuranceVerificationSelect = () => {
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Ins Verification')) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Ins Verification</FormFieldLabel>
      <CodesetSelect
        name="VerificationStatus"
        codeset={CODESETS.VerificationStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { InsuranceVerificationSelect }
