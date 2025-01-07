'use client'

import { CodesetSelect } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const LegalStatusDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Legal)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Legal</FieldLabel>
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
