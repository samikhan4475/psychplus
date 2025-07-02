'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { ServiceGroup } from '@/types'
import { useFiltersContext } from '../context'
import { BookedAppointmentsSchemaType } from '../schema'
import { SchedulerFilters } from '../types'
import { FieldLabel } from './field-label'
import { FormFieldContainer } from './form-field-container'

const GroupDropdown = ({
  groups,
  loading,
}: {
  groups: ServiceGroup[]
  loading: boolean
}) => {
  const { filters } = useFiltersContext()
  const { watch, setValue } = useFormContext<BookedAppointmentsSchemaType>()
  const services = watch('servicesOffered')
  const options = useMemo(
    () =>
      groups.map((group) => ({
        label: group.group,
        value: group.id,
      })),
    [groups],
  )
  if (!filters.includes(SchedulerFilters.Group)) return null

  return (
    <FormFieldContainer className="h-full">
      <FieldLabel>Group</FieldLabel>
      <MultiSelectField
        defaultValues={watch('groupIds')}
        options={options}
        className="flex-1"
        onChange={(values) => {
          setValue('groupIds', values, { shouldDirty: true })
        }}
        menuClassName="w-[155px]"
        loading={loading}
        disabled={services.length === 0}
      />
    </FormFieldContainer>
  )
}

export { GroupDropdown }
