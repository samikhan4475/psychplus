'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'
import { SchemaType } from '../../schema'

const DischargeDate = () => {
  const form = useFormContext<SchemaType>()

  const admittingProvider = useWatch({
    control: form.control,
    name: 'admittingProvider',
  })

  return (
    <Flex direction={'column'} className="flex-1 gap-[2px]">
      <FormFieldLabel required>Discharge Date</FormFieldLabel>
      <DatePickerInput
        field="dischargeDate"
        isDisabled={!admittingProvider}
        dateInputClass="h-6 w-full"
      />
    </Flex>
  )
}

export { DischargeDate }
