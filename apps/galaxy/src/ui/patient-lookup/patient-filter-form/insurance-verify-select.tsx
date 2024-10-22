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

const InsuranceVerifySelect = () => {
  const form = useFormContext<PatientLookUpSchemaType>()
  const options = useCodesetOptions(CODESETS.VerificationStatus)

  const insuranceVerificationStatuses = form.watch(
    'insuranceVerificationStatuses',
  )

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Insurance Verify</FormFieldLabel>
      <MultiSelectField
        options={options}
        defaultValues={insuranceVerificationStatuses}
        onChange={(values) =>
          form.setValue('insuranceVerificationStatuses', values)
        }
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { InsuranceVerifySelect }
