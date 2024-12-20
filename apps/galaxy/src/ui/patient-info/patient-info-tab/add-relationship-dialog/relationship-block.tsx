'use client'

import { Flex } from '@radix-ui/themes'
import { EmergencyContactSwitch } from './emergency-contact-switch'
import { GuardianSwitch } from './guardian-switch'
import { RelationshipBlockHeader } from './relationship-block-header'
import { RRISwitch } from './rri-switch'

const RelationshipBlock = () => {
  return (
    <Flex
      direction="column"
      className="border-pp-gray-2 col-span-full overflow-hidden rounded-1 border"
    >
      <RelationshipBlockHeader />
      <Flex width="100%">
        <EmergencyContactSwitch />
        <RRISwitch />
        <GuardianSwitch />
      </Flex>
    </Flex>
  )
}

export { RelationshipBlock }
