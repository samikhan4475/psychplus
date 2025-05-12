'use client'

import { PhoneNumberInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const PhoneField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Phone</FormFieldLabel>
      <PhoneNumberInput field="phone" className="w-full" />
    </FormFieldContainer>
  )
}

export { PhoneField }
