'use client'

import { useCallback } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getUnitsGroupsAction } from '@/ui/visit/actions/get-units-groups'
import { SchemaType } from '../../schema'

const RoomSelect = ({
  isPsychiatristVisitTypeSequence,
}: {
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  const form = useFormContext<SchemaType>()
  const serviceId = useWatch({
    control: form.control,
    name: 'service',
  })
  const fetchOptions = useCallback(() => {
    if (!serviceId)
      return Promise.resolve({ state: 'success' as const, data: [] })
    return getUnitsGroupsAction({ serviceId, isRoom: true })
  }, [serviceId])
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Room</FormFieldLabel>
      <AsyncSelect
        field="room"
        disabled={isPsychiatristVisitTypeSequence}
        fetchOptions={fetchOptions}
        buttonClassName="flex-1 h-6"
      />
    </FormFieldContainer>
  )
}

export { RoomSelect }
