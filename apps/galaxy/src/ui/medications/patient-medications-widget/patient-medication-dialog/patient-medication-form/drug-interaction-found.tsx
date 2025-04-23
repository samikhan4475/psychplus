'use client'

import { Flex } from '@radix-ui/themes'
import { OverRideCheckbox } from './override-checkbox'
import { ReasonSelect } from './reason-select'

const DrugInteractionFound = () => {
  return (
    <Flex gap="1" align="center" justify="between">
      <Flex gap="3" align="center">
        <OverRideCheckbox />
        <ReasonSelect />
      </Flex>
    </Flex>
  )
}

export { DrugInteractionFound }
