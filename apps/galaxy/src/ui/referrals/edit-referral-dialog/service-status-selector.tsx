'uuse client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import {
  DEFAULT_REFERRAL_SERVICE_STATUS,
  EMERGENCY_REFERRAL_SERVICE_STATUS,
} from '../create-referral-dialog/constants'
import { useServiceStatusOptions } from '../create-referral-dialog/hooks'
import { SchemaType } from './edit-referral-form'

const ServiceStatusSelect = () => {
  const form = useFormContext<SchemaType>()
  const status = form.watch('servicesStatus')
  const { statusOptions, allowEmergencyStatus, emergencyStatusOnly } =
    useServiceStatusOptions()

  useEffect(() => {
    if (status === EMERGENCY_REFERRAL_SERVICE_STATUS && !allowEmergencyStatus) {
      form.setValue('servicesStatus', DEFAULT_REFERRAL_SERVICE_STATUS)
    }
    if (emergencyStatusOnly && status !== EMERGENCY_REFERRAL_SERVICE_STATUS) {
      form.setValue('servicesStatus', EMERGENCY_REFERRAL_SERVICE_STATUS)
    }
  }, [form, status, emergencyStatusOnly, allowEmergencyStatus])
  return (
    <FormFieldContainer>
      <FormFieldLabel>Service Status</FormFieldLabel>
      <SelectInput
        options={statusOptions}
        field="servicesStatus"
        size="1"
        buttonClassName="w-full border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="servicesStatus" />
    </FormFieldContainer>
  )
}

export { ServiceStatusSelect }
