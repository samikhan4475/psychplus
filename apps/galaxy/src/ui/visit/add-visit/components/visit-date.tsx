'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'
import { SchemaType } from '../schema'

const VisitDate = ({ dependentOn }: { dependentOn: keyof SchemaType }) => {
  const form = useFormContext<SchemaType>()

  const fieldValue = useWatch({
    control: form.control,
    name: dependentOn,
  })
  const isDisabled = !fieldValue

  return (
    <Flex direction={'column'} className="flex-1 gap-[2px]">
      <FormFieldLabel required>Visit Date</FormFieldLabel>
      <DatePickerInput
        field="visitDate"
        isDisabled={isDisabled}
        dateInputClass="h-6 w-full"
      />
    </Flex>
  )
}

export { VisitDate }
