'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'
import { useFiltersContext } from '../context'
import { SchedulerFilters } from '../constants'

const InsuranceVerificationSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.InsVerification)) return null

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
