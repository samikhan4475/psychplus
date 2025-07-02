'use client'

import { useFormContext } from 'react-hook-form'
import { FormTextInput } from '@psychplus/form'
import { FormField } from '@/components-v2'
import { SchemaType } from './schema'

const DischargeDate = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormField
      containerClassName="flex-1"
      name="dischargeTime"
      label="Discharge Date"
    >
      <FormTextInput
        type="date"
        label=""
        data-testid="discharge-date-of-birth-input"
        {...form.register('dischargeTime')}
        className="text-pp-gray-1 h-[38px] p-2 text-[14px] font-regular uppercase"
      />
    </FormField>
  )
}

export { DischargeDate }
