'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ProviderPreferenceSelect = () => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel>Provider Preference</FormFieldLabel>
      <CodesetSelect name="status" codeset={CODESETS.ClaimFiltrationDateType} />
    </FormFieldContainer>
  )
}

export { ProviderPreferenceSelect }
