'use client'

import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './organization-users-list-filter-form'

const PatientVerifySelect = () => {
  const form = useFormContext<SchemaType>()
  const options = useCodesetOptions(CODESETS.VerificationStatus)

  const verificationStatuses = form.watch('verificationStatuses')
  return (
    <FormFieldContainer className="flex-row gap-2">
      <FormFieldLabel className="!text-1">Patient Verify</FormFieldLabel>
      <MultiSelectField
        options={options}
        defaultValues={verificationStatuses}
        onChange={(values) => form.setValue('verificationStatuses', values)}
        className="flex-1 min-w-[115px]"
      />
    </FormFieldContainer>
  )
}
export { PatientVerifySelect }
