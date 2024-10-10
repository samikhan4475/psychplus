'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel, SelectInput } from '@/components'
import { ServiceGroup } from '@/types'
import { SchedulerFilters } from '../types'
import { FormFieldContainer } from './form-field-container'
import { BookedAppointmentsSchemaType } from '../schema'
import { useFiltersContext } from '../context'

const GroupDropdown = ({ groups }: { groups: ServiceGroup[] }) => {
  const { filters } = useFiltersContext()
  const { watch } = useFormContext<BookedAppointmentsSchemaType>()
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

export { GroupDropdown }
