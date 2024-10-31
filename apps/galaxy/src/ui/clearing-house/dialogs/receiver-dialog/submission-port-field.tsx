'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const SubmissionPortField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Submission Port</FormFieldLabel>
      <TextInput field="submissionPort" className="w-full" />
      <FormFieldError name="submissionPort" />
    </FormFieldContainer>
  )
}

export { SubmissionPortField }
