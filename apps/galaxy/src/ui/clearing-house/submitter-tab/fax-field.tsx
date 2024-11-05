'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const FaxField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Fax</FormFieldLabel>
      <TextInput field="fax" className="w-full" />
    </FormFieldContainer>
  )
}

export { FaxField }
