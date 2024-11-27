import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ProviderPreferenceSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Provider Preference</FormFieldLabel>
      <CodesetSelect size="1" codeset={CODESETS.Gender} name="gender" />
    </FormFieldContainer>
  )
}

export { ProviderPreferenceSelect }
