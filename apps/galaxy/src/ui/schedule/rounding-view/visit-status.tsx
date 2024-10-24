'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useFiltersContext } from '../context'
import { FormFieldContainer } from '../shared'
import { SchedulerFilters } from '../types'

const VisitStatus = () => {
  const { filters } = useFiltersContext()
  const codes = useCodesetCodes(CODESETS.AppointmentStatus)
  const exclude = codes
    .filter((code) =>
      code.attributes?.find((attribute) => attribute.value === 'Timed'),
    )
    .map((code) => code.value)
  if (!filters.includes(SchedulerFilters.VisitStatus)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Visit Status</FormFieldLabel>
      <CodesetSelect
        name="visitStatus"
        codeset={CODESETS.AppointmentStatus}
        exclude={exclude}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { VisitStatus }
