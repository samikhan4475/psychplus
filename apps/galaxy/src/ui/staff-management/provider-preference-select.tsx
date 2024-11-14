import React from 'react'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const ProviderPreferenceSelect = () => {
  const options = useCodesetOptions(CODESETS.Gender)
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Provider Preference</FormFieldLabel>
      <DropdownSelect field="providerPreference" options={options} />
    </FormFieldContainer>
  )
}

export { ProviderPreferenceSelect }
