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

const PatientVerifySelect = () => {
  const form = useFormContext<PatientLookUpSchemaType>()
  const options = useCodesetOptions(CODESETS.VerificationStatus)

  const verificationStatuses = form.watch('verificationStatuses')

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Patient Verify</FormFieldLabel>
      <MultiSelectField
        options={options}
        defaultValues={verificationStatuses}
        onChange={(values) => form.setValue('verificationStatuses', values)}
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { PatientVerifySelect }
