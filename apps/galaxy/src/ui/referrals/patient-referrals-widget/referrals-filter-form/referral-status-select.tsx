'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientReferralsSchemaType } from './schema'

const ReferralStatusSelect = () => {
  const options = useCodesetOptions(CODESETS.ResourceStatus)
  const form = useFormContext<PatientReferralsSchemaType>()

  return (
    <FormFieldContainer className="flex-1 flex-row gap-1">
      <FormFieldLabel className="!text-1">Referral Status</FormFieldLabel>
      <MultiSelectField
        options={options}
        defaultValues={form.getValues('resourceStatusList')}
        onChange={(values) => form.setValue('resourceStatusList', values)}
        className="w-full"
      />
    </FormFieldContainer>
  )
}

export { ReferralStatusSelect }
