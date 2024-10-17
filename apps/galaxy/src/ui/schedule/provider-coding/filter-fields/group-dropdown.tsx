'use client'

import { useMemo } from 'react'
import { FormFieldLabel, SelectInput } from '@/components'
import { useFormContext } from 'react-hook-form'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { ServiceGroup } from '@/types'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const GroupSelect = ({ groups }: { groups: ServiceGroup[] }) => {
  const { filters } = useFiltersContext()
  const { watch } = useFormContext<ProviderCodingSchema>()
  const services = watch('serviceIds')
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
      <FormFieldLabel>Group</FormFieldLabel>
      <SelectInput
        field="groupId"
        placeholder="Select"
        options={groupOptions}
        disabled={services.length === 0}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { GroupSelect }
