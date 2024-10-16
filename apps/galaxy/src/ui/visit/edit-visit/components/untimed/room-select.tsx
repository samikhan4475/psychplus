'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getUnitsGroupsAction } from '@/ui/visit/actions/get-units-groups'
import { SchemaType } from '../../schema'

const RoomSelect = () => {
  const form = useFormContext<SchemaType>()
  const serviceId = useWatch({
    control: form.control,
    name: 'service',
  })
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Room</FormFieldLabel>
      <AsyncSelect
        field="room"
        fetchOptions={() => getUnitsGroupsAction({ serviceId, isRoom: true })}
        buttonClassName="flex-1 h-6"
      />
    </FormFieldContainer>
  )
}

export { RoomSelect }
