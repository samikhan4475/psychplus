'use client'

import { Flex, Text } from '@radix-ui/themes'
import { DuePPInput, DuePtInput, PaidInput } from '../shared'

const CoInsBlock = () => {
  return (
    <Flex direction="column" className="rounded-2">
      <Text className="border-b-2 border-r-2 border-indigo-4 bg-indigo-3 px-1 py-0.5 text-1 font-medium">
        Co-Ins
      </Text>
      <Flex gap="2" className="border-r-2 border-indigo-3 p-1">
        <DuePtInput field="coInsdue" />
        <DuePPInput field="coInspp" />
        <PaidInput field="coInsPaid" />
      </Flex>
    </Flex>
  )
}

export { CoInsBlock }
