'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared/form-field-container'
import { SchedulerFilters } from '../../types'

const LegalStatusSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Legal)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Legal</FormFieldLabel>
      <CodesetSelect
        name="legalStatus"
        codeset={CODESETS.LegalStatus}
        exclude={[CODE_NOT_SET]}
        className="flex-1"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { LegalStatusSelect }
