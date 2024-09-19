'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SchemaType } from '../../schema'

const UnitDropdown = () => {
  const form = useFormContext<SchemaType>()
  const legal = form.watch('legal')

  const unitOptions = [{ label: 'Room 1', value: '1' }]

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Unit</FormFieldLabel>
      <SelectInput
        field="unit"
        options={unitOptions}
        buttonClassName="flex-1"
        disabled={!legal}
      />
      <FormFieldError name="unit" />
    </FormFieldContainer>
  )
}

export { UnitDropdown }
