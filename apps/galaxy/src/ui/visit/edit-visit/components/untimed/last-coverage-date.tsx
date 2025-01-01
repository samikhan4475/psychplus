'use client'

import { Flex } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'

const LastCoverageDate = ({
  isPsychiatristVisitTypeSequence,
}: {
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  return (
    <Flex className="flex-1 gap-[3px]" direction={'column'}>
      <FormFieldLabel>LCD</FormFieldLabel>
      <DatePickerInput
        dateInputClass="h-6 w-full"
        isDisabled={isPsychiatristVisitTypeSequence}
        field="lastCoverageDate"
        isRequired={false}
      />
    </Flex>
  )
}

export { LastCoverageDate }
