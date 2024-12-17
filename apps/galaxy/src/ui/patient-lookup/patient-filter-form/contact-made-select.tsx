'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const ContactMadeSelect = () => {
  const options = useCodesetOptions(CODESETS.ContactMadeStatus)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Contact Initiated</FormFieldLabel>
      <DropdownSelect field="contactMadeStatuses" options={options} />
    </FormFieldContainer>
  )
}

export { ContactMadeSelect }
