'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { STATUS_CODESET } from '../constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <SelectInput
        field="status"
        options={STATUS_CODESET}
        size="1"
        buttonClassName="w-full h-full"
        className="h-full w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
