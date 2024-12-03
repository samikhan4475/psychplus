'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { STATUS_CODESET } from './constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <SelectInput
        field="prescriptionStatus"
        buttonClassName="border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[120px]"
        options={STATUS_CODESET}
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
