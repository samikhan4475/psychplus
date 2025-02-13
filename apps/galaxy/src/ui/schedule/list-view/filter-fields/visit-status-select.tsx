'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { sortVisitStatusCodes } from '../../utils'

const VisitStatusSelect = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  const codes = useCodesetCodes(CODESETS.AppointmentStatus)
  const options = useMemo(() => sortVisitStatusCodes(codes), [codes])
  if (!filters.includes(SchedulerFilters.VisitStatus)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Visit Status</FieldLabel>
      <MultiSelectField
        defaultValues={form.watch('appointmentStatuses')}
        options={options}
        className="flex-1"
        onChange={(values) => {
          form.setValue('appointmentStatuses', values, { shouldDirty: true })
        }}
        menuClassName="w-[155px]"
      />
    </FormFieldContainer>
  )
}

export { VisitStatusSelect }
