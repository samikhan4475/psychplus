'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const MiddleNameField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="pb-[3px]">Middle Name</FormFieldLabel>
      <TextInput field="middlename" className="h-6 w-full" />
      <FormFieldError name="middlename" />
    </FormFieldContainer>
  )
}

export { MiddleNameField }
