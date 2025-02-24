'use client'

import { DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { FieldLabel } from '../../shared'
import { FormFieldContainer } from '../../shared/form-field-container'

const LanguageSelect = () => {
  const options = useCodesetOptions(CODESETS.Language)
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Language</FieldLabel>
      <DropdownSelect field="language" options={options} shouldDirty />
    </FormFieldContainer>
  )
}

export { LanguageSelect }
