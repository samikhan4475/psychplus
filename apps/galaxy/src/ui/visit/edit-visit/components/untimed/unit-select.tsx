'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const UnitSelect = () => {
  const unitOptions = [{ value: '1', label: 'Room 1' }]
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Unit</FormFieldLabel>
      <SelectInput
        options={unitOptions}
        field="unit"
        buttonClassName="flex-1"
      />
      <FormFieldError name="unit" />
    </FormFieldContainer>
  )
}

export { UnitSelect }
