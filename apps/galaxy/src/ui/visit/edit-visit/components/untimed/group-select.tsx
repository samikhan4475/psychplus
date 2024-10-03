'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const GroupSelect = () => {
  const groupOptions = [{ value: '1', label: 'Group 1' }]
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Group</FormFieldLabel>
      <SelectInput
        options={groupOptions}
        field="group"
        buttonClassName="flex-1"
      />
      <FormFieldError name="group" />
    </FormFieldContainer>
  )
}

export { GroupSelect }
