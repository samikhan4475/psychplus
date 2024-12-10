import React from 'react'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const LanguageSelect = () => {
  const options = useCodesetOptions(CODESETS.Language)
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Language</FormFieldLabel>
      <DropdownSelect field="spokenLanguage" options={options} />
    </FormFieldContainer>
  )
}

export { LanguageSelect }
