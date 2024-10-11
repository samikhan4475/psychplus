'use client'

import { Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'
import { MailAddressGroup } from './mail-address-group'
import { PrimaryAddressGroup } from './primary-address-group'

const AddressCard = () => {
  return (
    <Flex direction="column" className="bg-white rounded-1">
      <CardHeading title="Address" />
      <Flex px="2" py="2" gap="2">
        <PrimaryAddressGroup />
        <MailAddressGroup />
      </Flex>
    </Flex>
  )
}

export { AddressCard }
