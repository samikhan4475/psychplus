'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { ServiceUnit } from '@/types'
import { useFiltersContext } from '../context'
import { BookedAppointmentsSchemaType } from '../schema'
import { SchedulerFilters } from '../types'
import { FieldLabel } from './field-label'
import { FormFieldContainer } from './form-field-container'

const UnitDropdown = ({
  units,
  loading,
}: {
  units: ServiceUnit[]
  loading: boolean
}) => {
  const { filters } = useFiltersContext()
  const { watch, setValue } = useFormContext<BookedAppointmentsSchemaType>()
  const services = watch('serviceIds')
  const options = useMemo(
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
      <MultiSelectField
        defaultValues={watch('unitIds')}
        options={options}
        className="flex-1"
        onChange={(values) => {
          setValue('unitIds', values, { shouldDirty: true })
        }}
        menuClassName="w-[155px]"
        loading={loading}
        disabled={services.length === 0}
      />
    </FormFieldContainer>
  )
}

export { UnitDropdown }
