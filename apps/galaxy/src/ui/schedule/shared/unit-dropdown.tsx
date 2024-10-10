'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel, SelectInput } from '@/components'
import { ServiceUnit } from '@/types'
import { SchedulerFilters } from '../types'
import { FormFieldContainer } from './form-field-container'
import { BookedAppointmentsSchemaType } from '../schema'
import { useFiltersContext } from '../context'

const UnitDropdown = ({ units }: { units: ServiceUnit[] }) => {
  const { filters } = useFiltersContext()
  const { watch } = useFormContext<BookedAppointmentsSchemaType>()
  const services = watch('serviceIds')
  const unitOptions = useMemo(
    () =>
      units.map((unit) => ({
        label: unit.unit,
        value: unit.id,
      })),
    [units],
  )
  if (!filters.includes(SchedulerFilters.Unit)) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Unit</FormFieldLabel>
      <SelectInput
        field="unit"
        placeholder="Select"
        options={unitOptions}
        disabled={services.length === 0}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { UnitDropdown }
