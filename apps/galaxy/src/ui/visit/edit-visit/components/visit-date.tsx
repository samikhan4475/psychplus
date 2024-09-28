'use client'

import { Flex } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'

const VisitDate = () => {
  return (
    <Flex direction={'column'} className="flex-1 gap-[2px]">
      <FormFieldLabel required>Visit Date</FormFieldLabel>
      <DatePickerInput field="visitDate" dateInputClass="h-[21px]" />
    </Flex>
  )
}

export { VisitDate }
