'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getUnitsGroupsAction } from '@/ui/visit/actions/get-units-groups'
import { SchemaType } from '../../schema'

const UnitDropdown = () => {
  const form = useFormContext<SchemaType>()
  const [serviceId, legal] = useWatch({
    control: form.control,
    name: ['service', 'legal'],
  })
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Unit</FormFieldLabel>
      <AsyncSelect
        fetchOptions={() => getUnitsGroupsAction({ serviceId, isUnit: true })}
        buttonClassName="h-6 w-full"
        field="unit"
        disabled={!legal}
      />
    </FormFieldContainer>
  )
}

export { UnitDropdown }
