'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'

const CompleteNextStep = () => {
  return (
    <Flex
      direction="column"
      className="bg-pp-bg-table-cell overflow-hidden rounded-3 px-2 py-3"
    >
      <Text size="2" weight="medium">
        Next Steps
      </Text>
      <ul className="!list-disc p-2 pl-6 text-1">
        <li>Pharmacy will receive this prescription within minutes</li>
        <li>You can check the status in the Prescription Tracking section</li>
        <li>Patient can pick up the medication when ready</li>
      </ul>
    </Flex>
  )
}

export { CompleteNextStep }
