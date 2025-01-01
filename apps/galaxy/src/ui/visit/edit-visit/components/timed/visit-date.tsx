'use client'

import { Flex } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'

const VisitDate = () => {
  return (
    <Flex className="flex-1 gap-[2px]" direction={'column'}>
      <FormFieldLabel required>Visit Date</FormFieldLabel>
      <DatePickerInput dateInputClass="h-6 w-full" field="visitDate" />
    </Flex>
  )
}

export { VisitDate }
