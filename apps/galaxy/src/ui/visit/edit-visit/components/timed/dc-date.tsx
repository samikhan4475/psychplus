'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'
import { SchemaType } from '../../schema'

const DCDate = () => {
  const form = useFormContext<SchemaType>()
  const visitType = useWatch({
    name: 'visitType',
    control: form.control,
  })
  return (
    <Flex direction={'column'} className="flex-1 gap-[2px]">
      <FormFieldLabel required>DC Date</FormFieldLabel>
      <DatePickerInput
        isDisabled={!visitType}
        dateInputClass="h-6 w-full"
        field="dcDate"
      />
    </Flex>
  )
}

export { DCDate }
