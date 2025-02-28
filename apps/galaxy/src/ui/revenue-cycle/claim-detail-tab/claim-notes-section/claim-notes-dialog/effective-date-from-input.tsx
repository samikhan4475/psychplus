'use client'

import { Flex } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'

const EffectiveDateFromInput = () => {
  return (
    <Flex className="flex-1" direction={'column'}>
      <FormFieldLabel>Effective Date From</FormFieldLabel>
      <DatePickerInput dateInputClass="h-6 w-full" field="effectiveDateFrom" />
    </Flex>
  )
}

export { EffectiveDateFromInput }
