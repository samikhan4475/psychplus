'use client'

import { useMemo } from 'react'
import { FormFieldLabel, SelectInput } from '@/components'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { ServiceUnit } from '@/types'
import { useFormContext } from 'react-hook-form'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const UnitSelect = ({ units }: { units: ServiceUnit[] }) => {
  const { filters } = useFiltersContext()
  const { watch } = useFormContext<ProviderCodingSchema>()
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

export { UnitSelect }
