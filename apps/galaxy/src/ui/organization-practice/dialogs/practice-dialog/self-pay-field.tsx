import React from 'react'
import { Flex } from '@radix-ui/themes'
import { FormFieldLabel } from '@/components'
import { SelfPayRadioGroup } from './self-pay-radio-group'

const SelfPayField = () => (
  <Flex direction="column" flexGrow="1" pt="2">
    <Flex className="items-center justify-between">
      <FormFieldLabel className="pb-2 text-[14px]">Self Pay</FormFieldLabel>
    </Flex>
    <SelfPayRadioGroup />
  </Flex>
)

export { SelfPayField }
