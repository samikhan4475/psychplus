'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const options = [{ value: 'sftp', label: 'SFTP' }]

const SubmissionMethodSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Submission Method</FormFieldLabel>
      <SelectInput
        options={options}
        field="submissionMethod"
        buttonClassName="w-full h-6"
      />
      <FormFieldError name="submissionMethod" />
    </FormFieldContainer>
  )
}

export { SubmissionMethodSelect }
