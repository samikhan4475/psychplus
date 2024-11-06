'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const StateSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-1">
      <FormFieldLabel className="!text-1">State</FormFieldLabel>
      <CodesetSelect
        name="contactInfo.addresses.0.state"
        codeset={CODESETS.UsStates}
        size="1"
        className="max-h-6 flex-1"
        placeholder="State"
      />
      <FormFieldError name="contactInfo.addresses.0.state" />
    </FormFieldContainer>
  )
}

export { StateSelect }
