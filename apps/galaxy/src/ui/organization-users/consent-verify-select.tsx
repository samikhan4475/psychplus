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

const ConsentVerifySelect = () => {
  const form = useFormContext<SchemaType>()
  const options = useCodesetOptions(CODESETS.VerificationStatus)
  return (
    <FormFieldContainer className="flex-row gap-2">
      <FormFieldLabel className="!text-1">Consent Verify</FormFieldLabel>
      <MultiSelectField
        defaultValues={form.watch('consentVerificationStatuses')}
        onChange={(values) =>
          form.setValue('consentVerificationStatuses', values)
        }
        className="flex-1 min-w-[115px]"
        options={options}
      />
    </FormFieldContainer>
  )
}
export { ConsentVerifySelect }
