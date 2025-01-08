'use client'

import { Flex } from '@radix-ui/themes'
import { Minus } from 'lucide-react'
import { I18nProvider } from 'react-aria-components'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { FromDatePicker } from './from-date-picker'
import { ToDatePicker } from './to-date-picker'

const CreatedDatePicker = () => {
  return (
    <FormFieldContainer className="flex-row items-start gap-1">
      <FormFieldLabel className="pt-1 !text-1">User Created</FormFieldLabel>
      <I18nProvider locale="en-US">
        <Flex gap="2" className="flex-1" align="center">
          <FromDatePicker />
          <Minus />
          <ToDatePicker />
        </Flex>
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { CreatedDatePicker }
