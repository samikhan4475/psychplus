'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../shared'
import { useFiltersContext } from '../context'
import { ServiceUnit } from '@/types'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { BookedAppointmentsSchemaType } from '../schema'
import { SchedulerFilters } from '../types'

const UnitDropdown = ({ units }: {units: ServiceUnit[]}) => {
  const { filters } = useFiltersContext()
  const { watch } = useFormContext<BookedAppointmentsSchemaType>()
  const services = watch('serviceIds')
  const unitOptions = useMemo(() => units.map(unit => ({
    label: unit.unit,
    value: unit.id,
  })), [units])
  if (!filters.includes(SchedulerFilters.Unit)) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Unit</FormFieldLabel>
      <SelectInput
        field="unitId"
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
