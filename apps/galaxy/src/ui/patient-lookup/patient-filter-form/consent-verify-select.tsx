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

const ConsentVerifySelect = () => {
  const form = useFormContext<PatientLookUpSchemaType>()
  const options = useCodesetOptions(CODESETS.VerificationStatus)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Consent Verify</FormFieldLabel>
      <MultiSelectField
        defaultValues={form.watch('consentVerificationStatuses')}
        onChange={(values) =>
          form.setValue('consentVerificationStatuses', values)
        }
        className="flex-1"
        options={options}
      />
    </FormFieldContainer>
  )
}

export { ConsentVerifySelect }
