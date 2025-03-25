'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { DISABLE_CODESET_ATTRIBUTE } from '../patient-referrals-widget/constants'

const ContactStatusSelector = () => {
  const options = useCodesetOptions(
    CODESETS.ContactMadeStatus,
    DISABLE_CODESET_ATTRIBUTE,
  )

  return (
    <FormFieldContainer>
      <FormFieldLabel>Contact Status</FormFieldLabel>
      <SelectInput
        placeholder="Not Contacted"
        options={options}
        field="contactStatus"
        size="1"
        disabled
        buttonClassName="w-full border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] disabled:bg-gray-3 disabled:text-gray-11"
      />
      <FormFieldError name="contactStatus" />
    </FormFieldContainer>
  )
}

export { ContactStatusSelector }
