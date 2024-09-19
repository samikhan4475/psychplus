'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SchemaType } from '../../schema'

const GroupDropdown = () => {
  const form = useFormContext<SchemaType>()
  const legal = form.watch('legal')

  const groupOptions = [{ label: 'Group 1', value: '1' }]

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Group</FormFieldLabel>
      <SelectInput
        field="group"
        options={groupOptions}
        buttonClassName="flex-1"
        disabled={!legal}
      />
      <FormFieldError name="group" />
    </FormFieldContainer>
  )
}

export { GroupDropdown }
