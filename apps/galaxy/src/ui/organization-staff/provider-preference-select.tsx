'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ProviderPreferenceSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Provider Preference</FormFieldLabel>
      <CodesetSelect
        name="providerAttributionCodes.[0]"
        codeset={CODESETS.ProviderAttributions}
        size="1"
        className="w-[calc(100%-120px)]"
      />
    </FormFieldContainer>
  )
}

export { ProviderPreferenceSelect }
