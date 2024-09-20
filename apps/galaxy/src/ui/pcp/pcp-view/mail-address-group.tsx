'use client'

import { Flex, Text } from '@radix-ui/themes'
import { AddressFieldsGroup } from '@/components/'
import { MailAddressRadio } from './mail-address-radio'

const MailAddressGroup = () => {
  return (
    <Flex direction="column" className="bg-white flex-1">
      <Flex align="center" justify="between">
        <Text weight="medium" className="text-[14px]">
          Mailing Address
        </Text>
      </Flex>
      <AddressFieldsGroup columnsPerRow="2" direction="row" />
    </Flex>
  )
}

export { MailAddressGroup }
