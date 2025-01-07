'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { SelectInput } from '@/components'
import { ServiceUnit } from '@/types'
import { useFiltersContext } from '../context'
import { BookedAppointmentsSchemaType } from '../schema'
import { SchedulerFilters } from '../types'
import { FormFieldContainer } from './form-field-container'
import { FieldLabel } from './field-label'

const UnitDropdown = ({
  units,
  loading,
}: {
  units: ServiceUnit[]
  loading: boolean
}) => {
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
      <FieldLabel>Unit</FieldLabel>
      <SelectInput
        field="unitId"
        placeholder="Select"
        options={unitOptions}
        disabled={services.length === 0}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { UnitDropdown }
