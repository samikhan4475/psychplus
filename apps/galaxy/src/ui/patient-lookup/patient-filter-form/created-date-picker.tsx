'use client'

import { Flex } from '@radix-ui/themes'
import { Minus } from 'lucide-react'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { FromDatePicker } from './from-date-picker'
import { ToDatePicker } from './to-date-picker'

const CreatedDatePicker = () => {
  return (
    <FormFieldContainer className="flex-row items-start gap-1">
      <FormFieldLabel className="pt-1 !text-1">User Created</FormFieldLabel>
      <Flex gap="2" className="flex-1" align="start">
        <FromDatePicker />
        <Minus />
        <ToDatePicker />
      </Flex>
    </FormFieldContainer>
  )
}

export { CreatedDatePicker }
