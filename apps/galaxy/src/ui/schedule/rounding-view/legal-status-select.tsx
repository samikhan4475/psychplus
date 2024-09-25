'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'
import { useFiltersContext } from '../context'
import { SchedulerFilters } from '../constants'

const LegalStatusSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Legal)) return null

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
