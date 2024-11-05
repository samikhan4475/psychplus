'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const SubmitterIdField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Submitter ID</FormFieldLabel>
      <TextInput field="submitterId" className="w-full" />
      <FormFieldError name="submitterId" />
    </FormFieldContainer>
  )
}

export { SubmitterIdField }
