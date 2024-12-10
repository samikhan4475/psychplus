import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { SchemaType } from './staff-filter-form'

const ProviderPreferenceSelect = () => {
  const form = useFormContext<SchemaType>()
  const options = useCodesetOptions(CODESETS.ProviderAttributions)
  const defaultValues = form.watch('providerAttributionCodes')
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Provider Preference</FormFieldLabel>
      <MultiSelectField
        defaultValues={defaultValues}
        className="w-full"
        onChange={(vals) =>
          form.setValue('providerAttributionCodes', vals, {
            shouldDirty: true,
          })
        }
        options={options}
      />
    </FormFieldContainer>
  )
}

export { ProviderPreferenceSelect }
