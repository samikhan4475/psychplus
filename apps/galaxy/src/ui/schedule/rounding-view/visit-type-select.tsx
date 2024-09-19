'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'
import { useRoundingFiltersContext } from './context'

const VisitTypeSelect = () => {
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Visit Type')) return null

  return (
    <FormFieldContainer className='flex-1'>
      <FormFieldLabel>Visit Type</FormFieldLabel>
      <CodesetSelect
        name="visitType"
        codeset={CODESETS.AppointmentStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { VisitTypeSelect }
