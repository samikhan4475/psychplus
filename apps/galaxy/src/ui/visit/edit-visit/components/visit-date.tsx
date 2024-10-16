'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'
import { SchemaType } from '../schema'

const VisitDate = ({ dependentOn }: { dependentOn: keyof SchemaType }) => {
  const form = useFormContext<SchemaType>()
  const [isServiceTimeDependent, value] = useWatch({
    control: form.control,
    name: ['isServiceTimeDependent', dependentOn],
  })
  const isDisabled = !isServiceTimeDependent ? !value : true
  return (
    <Flex className="flex-1 gap-[2px]" direction={'column'}>
      <FormFieldLabel required>Visit Date</FormFieldLabel>
      <DatePickerInput
        dateInputClass="h-6 w-full"
        field="visitDate"
        isDisabled={isDisabled}
      />
    </Flex>
  )
}

export { VisitDate }
