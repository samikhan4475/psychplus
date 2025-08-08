'use client'

import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const AuthorizationDateField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-[2px]">
      <FormFieldLabel>Authorization Date</FormFieldLabel>
      <DatePickerInput field="authorizationDate" dateInputClass="h-6 w-full" />
    </FormFieldContainer>
  )
}

export { AuthorizationDateField }
