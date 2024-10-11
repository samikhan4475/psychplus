'use client'

import { Flex } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'

const LastCoverageDate = () => {
  return (
    <Flex className="flex-1 gap-[3px]" direction={'column'}>
      <FormFieldLabel>LCD</FormFieldLabel>
      <DatePickerInput
        dateInputClass="h-[21px]"
        field="lastCoverageDate"
        isRequired={false}
      />
    </Flex>
  )
}

export { LastCoverageDate }
