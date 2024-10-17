'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const DepositDateField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Deposit Date</FormFieldLabel>
      <DatePickerInput field="depositDate" />
    </FormFieldContainer>
  )
}

export { DepositDateField }
