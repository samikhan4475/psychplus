'use client'

import { Flex, Text } from '@radix-ui/themes'
import { AddressFieldsGroup } from '@/components'

const PrimaryAddress = () => {
  return (
    <Flex direction="column" className="col-span-full">
      <Text size="2" weight="medium" className="text-pp-black-3">
        Primary Address
      </Text>
      <AddressFieldsGroup columnsPerRow="2" prefix="address" />
    </Flex>
  )
}

export { PrimaryAddress }
