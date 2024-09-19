'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'
import { useRoundingFiltersContext } from './context'

const VisitStatus = () => {
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Visit Status')) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Visit Status</FormFieldLabel>
      <CodesetSelect
        name="visitMedium"
        codeset={CODESETS.VisitStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { VisitStatus }
