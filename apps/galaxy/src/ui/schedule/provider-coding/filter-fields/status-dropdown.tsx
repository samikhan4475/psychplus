'use client'

import { useMemo } from 'react'
import { SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { sortVisitStatusCodes } from '../../utils'

const StatusDropdown = () => {
  const { filters } = useFiltersContext()
  const codes = useCodesetCodes(CODESETS.AppointmentStatus)
  const options = useMemo(() => {
    return sortVisitStatusCodes(codes, 'NonTimed')
  }, [codes])
  if (!filters.includes(SchedulerFilters.VisitStatus)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Status</FieldLabel>
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

export { StatusDropdown }
