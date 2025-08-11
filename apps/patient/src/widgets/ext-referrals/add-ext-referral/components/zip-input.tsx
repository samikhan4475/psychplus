'use client'

import { AppointmentType } from '@psychplus-v2/constants'
import { useFormContext } from 'react-hook-form'
import { FormField, ZipcodeInput } from '@/components-v2'
import { SchemaType } from './schema'

const ZipInput = () => {
  const { register, watch } = useFormContext<SchemaType>()

  const requestedMedium = watch('requestedMedium')
  const postalCode = watch('patientContactDetails.addresses.0.postalCode')

  if (requestedMedium !== AppointmentType.InPerson) return null

  return (
    <FormField
      containerClassName="flex-1"
      name="patientContactDetails.addresses.0.postalCode"
      label="Zip"
    >
      <ZipcodeInput
        className="h-[38px] text-2 font-[400]"
        {...register('patientContactDetails.addresses.0.postalCode')}
        placeholder="Zip Code"
        value={postalCode}
        minLength={5}
      />
    </FormField>
  )
}

export { ZipInput }
