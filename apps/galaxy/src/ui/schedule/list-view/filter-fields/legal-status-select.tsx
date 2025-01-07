'use client'

import { CodesetSelect } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared/form-field-container'
import { SchedulerFilters } from '../../types'
import { FieldLabel } from '../../shared'

const LegalStatusSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Legal)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Legal</FieldLabel>
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
