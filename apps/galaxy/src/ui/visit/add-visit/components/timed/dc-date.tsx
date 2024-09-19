'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'
import { SchemaType } from '../../schema'

const DCDate = () => {
  const form = useFormContext<SchemaType>()
  const visitType = form.watch('visitType')

  return (
    <Flex direction={'column'} className="flex-1 gap-[2px]">
      <FormFieldLabel required>DC Date</FormFieldLabel>
      <DatePickerInput
        field="dcDate"
        isDisabled={!visitType}
        dateInputClass="h-[21px]"
      />
    </Flex>
  )
}

export { DCDate }
