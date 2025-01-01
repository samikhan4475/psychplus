'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'

const LegalStatusDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Legal)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Legal</FormFieldLabel>
      <CodesetSelect
        name="legalStatus"
        codeset={CODESETS.LegalStatus}
        exclude={[CODE_NOT_SET]}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { LegalStatusDropdown }
