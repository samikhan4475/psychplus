'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getUnitsGroupsAction } from '@/ui/visit/actions/get-units-groups'
import { SchemaType } from '../../schema'

const RoomDropdown = () => {
  const form = useFormContext<SchemaType>()
  const [serviceId, legal] = useWatch({
    control: form.control,
    name: ['service', 'legal'],
  })
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Room</FormFieldLabel>
      <AsyncSelect
        buttonClassName="flex-1 h-6"
        fetchOptions={() => getUnitsGroupsAction({ serviceId, isRoom: true })}
        field="room"
        disabled={!legal}
      />
    </FormFieldContainer>
  )
}

export { RoomDropdown }
