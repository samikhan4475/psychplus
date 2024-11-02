'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientReferralsSchemaType } from './schema'

const ServiceStatusSelect = () => {
  const options = useCodesetOptions(CODESETS.ResourceStatus)
  const form = useFormContext<PatientReferralsSchemaType>()

  return (
    <FormFieldContainer className="flex-1 flex-row gap-1">
      <FormFieldLabel>Service Status</FormFieldLabel>
      <MultiSelectField
        options={options}
        defaultValues={form.getValues('resourceStatusList')}
        onChange={(values) => form.setValue('resourceStatusList', values)}
        className="w-full"
      />
    </FormFieldContainer>
  )
}

export { ServiceStatusSelect }
