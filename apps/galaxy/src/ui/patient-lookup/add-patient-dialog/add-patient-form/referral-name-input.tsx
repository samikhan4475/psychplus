'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { ReferralSource } from '../../types'
import { AddPatientSchemaType } from './schema'

const ReferralNameInput = () => {
  const form = useFormContext<AddPatientSchemaType>()

  if (form.watch('referralSource') !== ReferralSource.Hospital) return null

  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1">Referral Organization</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Name of referral source"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('referralName')}
      />
    </FormFieldContainer>
  )
}

export { ReferralNameInput }
