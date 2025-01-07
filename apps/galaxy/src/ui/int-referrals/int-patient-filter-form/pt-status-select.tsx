'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { IntReferralsPatientLookUpSchemaType } from './schema'

const PtStatusSelect = () => {
  const form = useFormContext<IntReferralsPatientLookUpSchemaType>()
  const options = useCodesetOptions(CODESETS.CustomerStatus)

  const patientStatuses = form.watch('patientStatuses')

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">User Status</FormFieldLabel>
      <MultiSelectField
        options={options}
        defaultValues={patientStatuses}
        onChange={(values) => form.setValue('patientStatuses', values)}
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { PtStatusSelect }
