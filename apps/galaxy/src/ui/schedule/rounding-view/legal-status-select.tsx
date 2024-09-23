'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '@/components'
import { useRoundingFiltersContext } from './context'

const LegalStatusSelect = () => {
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Legal')) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Legal</FormFieldLabel>
      <CodesetSelect
        name="VerificationStatus"
        codeset={CODESETS.LegalStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { LegalStatusSelect }
