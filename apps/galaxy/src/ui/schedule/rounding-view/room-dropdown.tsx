'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '@/components'
import { useRoundingFiltersContext } from './context'

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
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Room')) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Room</FormFieldLabel>
      <SelectInput
        field="room"
        placeholder="Select"
        options={options}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { RoomDropdown }
