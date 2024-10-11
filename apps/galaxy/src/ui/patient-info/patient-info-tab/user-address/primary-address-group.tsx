'use client'

import { Flex, Text } from '@radix-ui/themes'
import { AddressFieldsGroup } from '@/components/'

const PrimaryAddressGroup = () => {
  return (
    <Flex direction="column" className="bg-white flex-1">
      <Text weight="medium" className="text-[14px]">
        Primary<Text className="ml-[2px] text-1 text-red-9">*</Text>
      </Text>
      <AddressFieldsGroup
        columnsPerRow="1"
        prefix="contactDetails.homeAddress"
        addressFieldName="street1"
      />
    </Flex>
  )
}

export { PrimaryAddressGroup }
