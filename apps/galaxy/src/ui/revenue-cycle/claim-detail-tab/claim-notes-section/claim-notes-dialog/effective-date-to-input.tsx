'use client'

import { Flex } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'

const EffectiveDateToInput = () => {
  return (
    <Flex className="flex-1" direction={'column'}>
      <FormFieldLabel>Effective Date To</FormFieldLabel>
      <DatePickerInput dateInputClass="h-6 w-full" field="effectiveDateTo" />
    </Flex>
  )
}

export { EffectiveDateToInput }
