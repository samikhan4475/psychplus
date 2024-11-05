'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const ContactPersonField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Con. Person</FormFieldLabel>
      <TextInput field="contactPerson" className="w-full" />
    </FormFieldContainer>
  )
}

export { ContactPersonField }
