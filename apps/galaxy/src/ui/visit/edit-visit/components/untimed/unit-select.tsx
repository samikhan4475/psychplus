'use client'

import { useCallback } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getUnitsGroupsAction } from '@/ui/visit/actions/get-units-groups'
import { SchemaType } from '../../schema'

const UnitSelect = ({
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
    return getUnitsGroupsAction({ serviceId, isUnit: true })
  }, [serviceId])
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Unit</FormFieldLabel>
      <AsyncSelect
        field="unit"
        disabled={isPsychiatristVisitTypeSequence}
        fetchOptions={fetchOptions}
        buttonClassName="h-6 w-full"
      />
    </FormFieldContainer>
  )
}

export { UnitSelect }
