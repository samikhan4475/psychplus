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

const InsuranceVerifySelect = () => {
  const form = useFormContext<SchemaType>()
  const options = useCodesetOptions(CODESETS.VerificationStatus)

  const insuranceVerificationStatuses = form.watch(
    'insuranceVerificationStatuses',
  )
  return (
    <FormFieldContainer className="flex-row gap-2">
      <FormFieldLabel className="!text-1">Insurance Verify</FormFieldLabel>
      <MultiSelectField
        options={options}
        defaultValues={insuranceVerificationStatuses}
        onChange={(values) =>
          form.setValue('insuranceVerificationStatuses', values)
        }
        className="flex-1 min-w-[115px] h-6"
      />
    </FormFieldContainer>
  )
}
export { InsuranceVerifySelect }
