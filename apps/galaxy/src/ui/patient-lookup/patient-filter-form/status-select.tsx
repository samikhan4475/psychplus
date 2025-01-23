'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientLookUpSchemaType } from './schema'

const PatientStatusSelect = () => {
  const options = useCodesetOptions(CODESETS.CustomerStatus)
  const form = useFormContext<PatientLookUpSchemaType>()

  const patientStatuses = form.watch('patientStatuses')

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">User Status</FormFieldLabel>
      <MultiSelectField
        defaultValues={patientStatuses ?? []}
        options={options}
        onChange={(values) => form.setValue('patientStatuses', values)}
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { PatientStatusSelect }
