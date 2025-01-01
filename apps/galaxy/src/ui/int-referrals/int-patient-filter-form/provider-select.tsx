'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SelectOptionType } from '@/types'
import { IntReferralsPatientLookUpSchemaType } from './schema'

interface ProviderSelectProps {
  options: SelectOptionType[]
}
const ProviderSelect = ({ options }: ProviderSelectProps) => {
  const form = useFormContext<IntReferralsPatientLookUpSchemaType>()
  return (
    <FormFieldContainer className="flex-1 flex-row gap-1">
      <FormFieldLabel className="!text-1">Provider</FormFieldLabel>
      <MultiSelectField
        options={options}
        defaultValues={form.getValues('providerNames')}
        onChange={(values) => form.setValue('providerNames', values)}
        className="w-full"
      />
    </FormFieldContainer>
  )
}

export { ProviderSelect }
