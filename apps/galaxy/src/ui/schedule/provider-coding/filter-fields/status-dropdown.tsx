'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { sortVisitStatusCodes } from '../../utils'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const StatusDropdown = () => {
  const form = useFormContext<ProviderCodingSchema>()
  const { filters } = useFiltersContext()
  const codes = useCodesetCodes(CODESETS.AppointmentStatus)
  const options = useMemo(() => {
    return sortVisitStatusCodes(codes, 'NonTimed')
  }, [codes])
  if (!filters.includes(SchedulerFilters.VisitStatus)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Status</FieldLabel>
      <MultiSelectField
        defaultValues={form.watch('appointmentStatuses')}
        options={options}
        className="flex-1"
        onChange={(values) =>
          form.setValue('appointmentStatuses', values, { shouldDirty: true })
        }
        menuClassName="w-[155px]"
      />
    </FormFieldContainer>
  )
}

export { StatusDropdown }
