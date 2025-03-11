'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { PatientInfoSchemaType } from '../patient-info-schema'

const ReferralOrganizationInput = () => {
  const form = useFormContext<PatientInfoSchemaType>()
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Referral Organization</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="Referral Organization"
        {...form.register('referralName')}
      />
    </FormFieldContainer>
  )
}

export { ReferralOrganizationInput }
