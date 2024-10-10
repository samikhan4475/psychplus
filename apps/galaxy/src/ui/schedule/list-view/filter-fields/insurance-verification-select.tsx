'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const InsuranceVerificationSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.InsVerification)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Ins Verification</FormFieldLabel>
      <CodesetSelect
        name="patientInsuranceVerificationStatus"
        className="flex-1"
        codeset={CODESETS.VerificationStatus}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { InsuranceVerificationSelect }
