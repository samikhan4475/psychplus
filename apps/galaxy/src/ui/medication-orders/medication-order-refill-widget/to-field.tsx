'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ToField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>To</FormFieldLabel>
        <DatePickerInput field="to" className="w-[101px]" />
    </FormFieldContainer>
  )
}

export { ToField }
