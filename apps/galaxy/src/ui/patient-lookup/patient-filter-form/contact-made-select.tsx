'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ContactMadeSelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Contact Made</FormFieldLabel>
      <CodesetSelect
        size="1"
        name="contactMadeStatuses"
        codeset={CODESETS.ContactMadeStatus}
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { ContactMadeSelect }
