'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldLabel
} from '@/components'
import { CODESETS } from '@/constants'

const ContactInitiated = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Contact Initiated</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.ContactMadeStatus}
        name="contactMadeStatus"
        className="flex-1 min-w-[72px]"
        size="1"
        placeholder='Select'
      />
    </FormFieldContainer>
  )
}

export { ContactInitiated }
