'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { SchemaType } from './schema'

const ProviderPreferenceSelect = () => {
  const form = useFormContext<SchemaType>()
  const options = useCodesetOptions(CODESETS.ProviderAttributions)
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel>Provider Preference</FormFieldLabel>
      <MultiSelectField
        onChange={(vals) =>
          form.setValue('providerAttributions', vals, {
            shouldDirty: true,
          })
        }
        defaultValues={form.watch('providerAttributions')}
        options={options}
      />
    </FormFieldContainer>
  )
}

export { ProviderPreferenceSelect }
