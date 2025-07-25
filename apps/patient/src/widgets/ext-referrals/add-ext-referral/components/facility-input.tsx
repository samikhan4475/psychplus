'use client'

import { TextFieldInput } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormField } from '@/components-v2'
import { SchemaType } from './schema'

const FacilityInput = () => {
  const { register } = useFormContext<SchemaType>()

  return (
    <FormField
      containerClassName="flex-1"
      name="referrerFacility"
      label="Facility Name"
    >
      <TextFieldInput
        {...register('referrerFacility')}
        placeholder="Facility Name"
        className="h-[38px]"
      />
    </FormField>
  )
}

export { FacilityInput }
