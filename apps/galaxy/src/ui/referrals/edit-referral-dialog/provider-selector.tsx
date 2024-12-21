'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  ProviderSearchDropdown,
} from '@/components'
import { StaffResource } from '@/types'
import { getStaffAction } from '../patient-referrals-widget/actions'
import { isPrescriber } from '../patient-referrals-widget/utils'
import { SchemaType } from './edit-referral-form'

const ProviderSelector = () => {
  const [staff, setStaff] = useState<StaffResource | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const form = useFormContext<SchemaType>()
  useEffect(() => {
    getStaffAction().then((response) => {
      if (response.state === 'success') {
        setStaff(response.data)
      }
      setLoading(false)
    })
  }, [])
  return (
    <FormFieldContainer className="col-span-full">
      <FormFieldLabel>Referring Provider</FormFieldLabel>
      <ProviderSearchDropdown
        initialValue={form.getValues('referredByName')}
        disabled={loading || !staff || isPrescriber(staff)}
        onChange={(value) => {
          form.setValue('referredByName', {
            avatar: value?.avatar,
            firstName: value?.firstName,
            lastName: value?.lastName,
            honors: value?.honors,
          })
        }}
      />
      <FormFieldError name="referredByName" />
    </FormFieldContainer>
  )
}

export { ProviderSelector }
