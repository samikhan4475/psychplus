import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { SchemaType } from './schema'

const LanguageSelect = () => {
  const form = useFormContext<SchemaType>()
  const options = useCodesetOptions(CODESETS.Language)
  return (
    <FormFieldContainer>
      <FormFieldLabel>Language</FormFieldLabel>
      <MultiSelectField
        onChange={(vals) =>
          form.setValue('language', vals, {
            shouldDirty: true,
          })
        }
        options={options}
      />
    </FormFieldContainer>
  )
}

export { LanguageSelect }
