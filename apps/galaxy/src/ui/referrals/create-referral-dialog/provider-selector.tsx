'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  ProviderSearchDropdown,
} from '@/components'
import { StaffResource } from '@/types'
import { isPrescriber } from '../patient-referrals-widget/utils'
import { SchemaType } from './create-referral-form'

interface ProviderSelectorProps {
  staff?: StaffResource
}

const ProviderSelector = ({ staff }: ProviderSelectorProps) => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="col-span-full">
      <FormFieldLabel className="!text-1">Referring Provider</FormFieldLabel>
      <ProviderSearchDropdown
        disabled={isPrescriber(staff)}
        initialValue={form.getValues('referredByName')}
        onChange={(value) => {
          form.setValue('referredByName', {
            avatar: value?.avatar,
            firstName: value?.firstName,
            lastName: value?.lastName,
            honors: value?.honors,
          })
          form.setValue('referredByProviderStaffId', Number(value?.id))
        }}
      />
      <FormFieldError name="referredByName" />
    </FormFieldContainer>
  )
}

export { ProviderSelector }
