'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const FaxField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Fax</FormFieldLabel>
      <TextInput field="fax" className="w-full" />
      <FormFieldError name="fax" />
    </FormFieldContainer>
  )
}

export { FaxField }
