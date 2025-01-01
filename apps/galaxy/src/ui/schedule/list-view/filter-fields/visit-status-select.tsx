'use client'

import { useMemo } from 'react'
import { FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { sortVisitStatusCodes } from '../../utils'

const VisitStatusSelect = () => {
  const { filters } = useFiltersContext()
  const codes = useCodesetCodes(CODESETS.AppointmentStatus)
  const options = useMemo(() => sortVisitStatusCodes(codes), [codes])
  if (!filters.includes(SchedulerFilters.VisitStatus)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Visit Status</FormFieldLabel>
      <SelectInput
        field="appointmentStatus"
        options={options}
        placeholder="Select"
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { VisitStatusSelect }
