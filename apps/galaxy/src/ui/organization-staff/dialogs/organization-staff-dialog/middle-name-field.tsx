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
      <TextInput field="middleName" className="h-6 w-full" />
      <FormFieldError name="middleName" />
    </FormFieldContainer>
  )
}

export { MiddleNameField }
