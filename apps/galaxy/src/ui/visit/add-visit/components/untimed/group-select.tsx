'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getUnitsGroupsAction } from '@/ui/visit/actions/get-units-groups'
import { SchemaType } from '../../schema'

const GroupDropdown = () => {
  const form = useFormContext<SchemaType>()
  const [serviceId, legal] = useWatch({
    control: form.control,
    name: ['service', 'legal'],
  })
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Group</FormFieldLabel>
      <AsyncSelect
        fetchOptions={() => getUnitsGroupsAction({ serviceId, isGroup: true })}
        buttonClassName="h-6 w-full"
        field="group"
        disabled={!legal}
      />
    </FormFieldContainer>
  )
}

export { GroupDropdown }
