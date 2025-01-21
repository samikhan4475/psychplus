'use client'

import { useCallback } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getUnitsGroupsAction } from '@/ui/visit/client-actions'
import { SchemaType } from '../../schema'

const GroupSelect = ({
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
    return getUnitsGroupsAction({ serviceId, isGroup: true })
  }, [serviceId])
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Group</FormFieldLabel>
      <AsyncSelect
        field="group"
        disabled={isPsychiatristVisitTypeSequence}
        fetchOptions={fetchOptions}
        buttonClassName="h-6 w-full"
      />
    </FormFieldContainer>
  )
}

export { GroupSelect }
