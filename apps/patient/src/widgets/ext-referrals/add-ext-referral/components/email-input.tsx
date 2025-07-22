'use client'

import { TextFieldInput } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormField } from '@/components-v2'
import { SchemaType } from './schema'

const EmailInput = () => {
  const { register } = useFormContext<SchemaType>()

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
