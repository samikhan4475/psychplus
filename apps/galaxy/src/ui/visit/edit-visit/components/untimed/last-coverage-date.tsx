'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'
import { SchemaType } from '../../schema'

const LastCoverageDate = () => {
  const form = useFormContext<SchemaType>()
  const authDate = form.watch('authDate')
  useEffect(() => {
    if (authDate) {
      form.setValue('lastCoverageDate', authDate.add({ days: 1 }))
    }
  }, [authDate])
  return (
    <Flex className="flex-1 gap-[3px]" direction={'column'}>
      <FormFieldLabel>LCD</FormFieldLabel>
      <DatePickerInput
        dateInputClass="h-6 w-full"
        isDisabled
        field="lastCoverageDate"
        isRequired={false}
      />
    </Flex>
  )
}

export { LastCoverageDate }
