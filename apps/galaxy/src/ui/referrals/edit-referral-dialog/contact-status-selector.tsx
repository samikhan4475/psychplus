'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const ContactStatusSelector = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Contact Status</FormFieldLabel>
      <CodesetSelect
        placeholder="Not Contacted"
        name="contactStatus"
        size="1"
        codeset={CODESETS.ContactMadeStatus}
      />
      <FormFieldError name="service" />
    </FormFieldContainer>
  )
}

export { ContactStatusSelector }
