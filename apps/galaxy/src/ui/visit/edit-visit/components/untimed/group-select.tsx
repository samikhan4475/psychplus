'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getUnitsGroupsAction } from '@/ui/visit/actions/get-units-groups'
import { SchemaType } from '../../schema'

const GroupSelect = () => {
  const form = useFormContext<SchemaType>()
  const serviceId = useWatch({
    control: form.control,
    name: 'service',
  })
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Group</FormFieldLabel>
      <AsyncSelect
        field="group"
        fetchOptions={() => getUnitsGroupsAction({ serviceId, isGroup: true })}
        buttonClassName="h-6 w-full"
      />
    </FormFieldContainer>
  )
}

export { GroupSelect }
