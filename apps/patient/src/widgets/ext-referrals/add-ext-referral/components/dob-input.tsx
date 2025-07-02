'use client'

import { format } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import { FormTextInput } from '@psychplus/form'
import { FormField } from '@/components-v2'
import { SchemaType } from './schema'

const DobInput = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormField
      containerClassName="flex-1"
      name="patientDateOfBirth"
      label="Date Of Birth"
    >
      <FormTextInput
        type="date"
        label=""
        max={format(new Date(), 'yyyy-MM-dd')}
        {...form.register('patientDateOfBirth')}
        className="text-pp-gray-1 h-[38px] p-2 text-[14px] font-regular uppercase"
      />
    </FormField>
  )
}

export { DobInput }
