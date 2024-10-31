'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const SubmissionUrlField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Submission URL</FormFieldLabel>
      <TextInput field="submissionUrl" className="w-full" />
      <FormFieldError name="submissionUrl" />
    </FormFieldContainer>
  )
}

export { SubmissionUrlField }
