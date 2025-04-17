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
      <FormFieldLabel className="pb-[3px]">Fax</FormFieldLabel>
      <TextInput field="practiceFax" className="h-6 w-full" />
      <FormFieldError name="practiceFax" />
    </FormFieldContainer>
  )
}

export { FaxField }
