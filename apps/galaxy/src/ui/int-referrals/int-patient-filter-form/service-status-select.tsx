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

const ServiceStatusSelect = () => {
  const options = useCodesetOptions(CODESETS.ServicesStatus, '', [CODE_NOT_SET])
  const form = useFormContext<IntReferralsPatientLookUpSchemaType>()

  return (
    <FormFieldContainer className="flex-1 flex-row gap-1">
      <FormFieldLabel className="!text-1">Service Status</FormFieldLabel>
      <MultiSelectField
        options={options}
        defaultValues={form.getValues('serviceStatuses')}
        onChange={(values) => form.setValue('serviceStatuses', values)}
        className="w-full"
      />
    </FormFieldContainer>
  )
}

export { ServiceStatusSelect }
