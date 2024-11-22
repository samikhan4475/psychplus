import React from 'react'
import { Flex } from '@radix-ui/themes'
import { AddressFieldsGroup } from '@/components'
import { TabContentHeading } from './tab-content-heading'

const HomeAddressGroup = () => {
  return (
    <Flex direction="column">
      <TabContentHeading title="Home" />
      <AddressFieldsGroup
        className="mt-3"
        prefix="contactInfo.addresses.0"
        addressFieldName="street1"
      />
    </Flex>
  )
}

export { HomeAddressGroup }
