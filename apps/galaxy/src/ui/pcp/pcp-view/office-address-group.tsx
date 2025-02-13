'use client'

import { Flex, Text } from '@radix-ui/themes'
import { AddressFieldsGroup } from '@/components/'

const OfficeAddressGroup = () => {
  return (
    <Flex direction="column" className="bg-white flex-1">
      <Text weight="medium" className="text-[14px]">
        Office Address
      </Text>
      <AddressFieldsGroup
        required={false}
        columnsPerRow="2"
        direction="row"
        prefix="officeAddress"
        addressFieldName="street1"
      />
    </Flex>
  )
}

export { OfficeAddressGroup }
