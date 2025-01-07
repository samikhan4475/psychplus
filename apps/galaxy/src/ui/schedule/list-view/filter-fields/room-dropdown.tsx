'use client'

import { SelectInput } from '@/components'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { useFormContext } from 'react-hook-form'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'
import { BookedAppointmentsSchemaType } from '../../schema'

const options = [
  {
    label: 'Room 1',
    value: 'Room 1',
  },
  {
    label: 'Room 2',
    value: 'Room 2',
  },
  {
    label: 'Room 3',
    value: 'Room 3',
  },
]

const RoomDropdown = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const services = form.watch('serviceIds')
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Room)) return null

  return (
    <FormFieldContainer className="h-full">
      <FieldLabel>Room</FieldLabel>
      <SelectInput
        field="room"
        placeholder="Select"
        options={options}
        disabled={services.length === 0}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { RoomDropdown }
