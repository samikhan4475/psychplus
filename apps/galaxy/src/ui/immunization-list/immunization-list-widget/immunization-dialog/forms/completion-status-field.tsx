'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { completionStatusCode } from '../../types'

const CompletionStatusField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Completion Status</FormFieldLabel>
      <SelectInput
        field="completionStatusCode"
        options={completionStatusCode}
        buttonClassName="h-6 w-[255px]"
        size="1"
      />
      <FormFieldError name="completionStatusCode" />
    </FormFieldContainer>
  )
}

export { CompletionStatusField }
