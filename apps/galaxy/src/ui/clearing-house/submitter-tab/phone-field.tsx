'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const PhoneField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Phone</FormFieldLabel>
      <TextInput field="phone" className="w-full" />
    </FormFieldContainer>
  )
}

export { PhoneField }
