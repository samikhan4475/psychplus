'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <SelectInput
        field="status"
        options={[{ value: 'Active', label: 'Active' }]}
        size="1"
        buttonClassName="w-full h-full"
        className="h-full w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
