import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { SchemaType } from './schema'
import { StaffType } from '../staff-management/types'

const LanguageSelect = () => {
  const form = useFormContext<SchemaType>()
  const options = useCodesetOptions(CODESETS.Language)
  const staffTypeLabel = form.watch('staffTypeLabel')
  return (
    <FormFieldContainer>
      <FormFieldLabel required={staffTypeLabel === StaffType.Provider}>Language</FormFieldLabel>
      <MultiSelectField
        onChange={(vals) =>
          form.setValue('spokenLanguages', vals, {
            shouldDirty: true,
          })
        }
        defaultValues={form.watch('spokenLanguages')}
        options={options}
      />
    </FormFieldContainer>
  )
}

export { LanguageSelect }
