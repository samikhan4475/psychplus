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

const CreditCardVerifySelect = () => {
  const form = useFormContext<PatientLookUpSchemaType>()
  const options = useCodesetOptions(CODESETS.VerificationStatus)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">CC</FormFieldLabel>
      <MultiSelectField
        defaultValues={form.watch('creditCardVerificationStatuses')}
        onChange={(values) =>
          form.setValue('creditCardVerificationStatuses', values)
        }
        className="flex-1"
        options={options}
      />
    </FormFieldContainer>
  )
}

export { CreditCardVerifySelect }
