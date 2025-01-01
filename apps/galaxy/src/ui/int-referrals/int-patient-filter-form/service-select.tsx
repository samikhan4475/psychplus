'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { IntReferralsPatientLookUpSchemaType } from './schema'

const ServiceSelect = () => {
  const form = useFormContext<IntReferralsPatientLookUpSchemaType>()
  const options = useCodesetOptions(CODESETS.ServicesOffered, '', [
    CODE_NOT_SET,
  ])
  return (
    <FormFieldContainer className="flex-1 flex-row gap-1">
      <FormFieldLabel className="!text-1">Service</FormFieldLabel>
      <MultiSelectField
        options={options}
        defaultValues={form.getValues('servicesOfferedList')}
        onChange={(values) => form.setValue('servicesOfferedList', values)}
        className="w-full"
      />
    </FormFieldContainer>
  )
}

export { ServiceSelect }
