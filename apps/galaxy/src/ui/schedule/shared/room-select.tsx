'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { ServiceRoom } from '@/types'
import { useFiltersContext } from '../context'
import { BookedAppointmentsSchemaType } from '../schema'
import { SchedulerFilters } from '../types'
import { FieldLabel } from './field-label'
import { FormFieldContainer } from './form-field-container'

const RoomSelect = ({
  rooms,
  loading,
}: {
  rooms: ServiceRoom[]
  loading: boolean
}) => {
  const { filters } = useFiltersContext()
  const { watch, setValue } = useFormContext<BookedAppointmentsSchemaType>()
  const services = watch('servicesOffered')
  const options = useMemo(
    () =>
      rooms.map((room) => ({
        label: room.room,
        value: room.id,
      })),
    [rooms],
  )
  if (!filters.includes(SchedulerFilters.Room)) return null

  return (
    <FormFieldContainer className="h-full">
      <FieldLabel>Room</FieldLabel>
      <MultiSelectField
        defaultValues={watch('roomIds')}
        options={options}
        className="flex-1"
        onChange={(values) => {
          setValue('roomIds', values, { shouldDirty: true })
        }}
        menuClassName="w-[155px]"
        loading={loading}
        disabled={services?.length === 0}
      />
    </FormFieldContainer>
  )
}

export { RoomSelect }
