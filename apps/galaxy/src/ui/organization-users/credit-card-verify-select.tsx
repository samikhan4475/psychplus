'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { SchemaType } from './organization-users-list-filter-form'

const CreditCardVerifySelect = () => {
  const form = useFormContext<SchemaType>()
  const options = useCodesetOptions(CODESETS.VerificationStatus)
  return (
    <FormFieldContainer className="flex-row gap-2">
      <FormFieldLabel className="!text-1">Credit Card Verify</FormFieldLabel>
      <MultiSelectField
        defaultValues={form.watch('creditCardVerificationStatuses')}
        onChange={(values) =>
          form.setValue('creditCardVerificationStatuses', values)
        }
        className="h-6 min-w-[115px] flex-1"
        options={options}
      />
    </FormFieldContainer>
  )
}
export { CreditCardVerifySelect }
