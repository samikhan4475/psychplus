'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const InsuranceVerificationDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.InsVerification)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Ins Verification</FormFieldLabel>
      <CodesetSelect
        name="patientInsuranceVerificationStatus"
        codeset={CODESETS.VerificationStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { InsuranceVerificationDropdown }
