'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel, SelectInput } from '@/components'
import { ServiceRoom } from '@/types'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const RoomSelect = ({
  rooms,
  loading,
}: {
  rooms: ServiceRoom[]
  loading: boolean
}) => {
  const { filters } = useFiltersContext()
  const { watch } = useFormContext<ProviderCodingSchema>()
  const services = watch('serviceIds')
  const roomOptions = useMemo(
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
      <FormFieldLabel>Room</FormFieldLabel>
      <SelectInput
        field="roomId"
        placeholder="Select"
        options={roomOptions}
        disabled={services.length === 0}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { RoomSelect }
