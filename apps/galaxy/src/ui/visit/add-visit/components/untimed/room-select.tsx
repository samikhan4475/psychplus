'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SchemaType } from '../../schema'

const RoomDropdown = () => {
  const form = useFormContext<SchemaType>()
  const legal = form.watch('legal')

  const roomOptions = [{ label: 'Room 1', value: '1' }]

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Room</FormFieldLabel>
      <SelectInput
        field="state"
        options={roomOptions}
        buttonClassName="flex-1"
        disabled={!legal}
      />
      <FormFieldError name="room" />
    </FormFieldContainer>
  )
}

export { RoomDropdown }
