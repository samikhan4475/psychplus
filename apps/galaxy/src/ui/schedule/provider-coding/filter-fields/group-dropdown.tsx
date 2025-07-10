'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { SelectInput } from '@/components'
import { ServiceGroup } from '@/types'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const GroupSelect = ({
  groups,
  loading,
}: {
  groups: ServiceGroup[]
  loading: boolean
}) => {
  const { filters } = useFiltersContext()
  const { watch } = useFormContext<ProviderCodingSchema>()
  const services = watch('servicesOffered')
  const groupOptions = useMemo(
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
      <SelectInput
        field="groupIds"
        placeholder="Select"
        options={groupOptions}
        disabled={services?.length === 0}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { GroupSelect }
