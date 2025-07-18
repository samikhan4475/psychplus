'use client'

import { useEffect } from 'react'
import { TextFieldInput } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormField } from '@/components-v2'
import { SchemaType } from './schema'

const EmailInput = () => {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<SchemaType>()

  const phone = watch('patientContactDetails.phoneNumbers.0.number')
  const phoneError = errors?.patientContactDetails?.phoneNumbers?.[0]?.number

  useEffect(() => {
    if (phone?.trim() && !phoneError) {
      trigger('patientContactDetails.email')
    }
  }, [phone, phoneError, trigger])
  return (
    <FormField
      containerClassName="flex-1"
      name="patientContactDetails.email"
      label="Email Address"
    >
      <TextFieldInput
        {...register('patientContactDetails.email')}
        placeholder="Email Address"
        className="h-[38px]"
      />
    </FormField>
  )
}

export { EmailInput }
