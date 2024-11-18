import React from 'react'
import { AddressFieldsGroup } from '@/components'
import { TabContentHeading } from './tab-content-heading'

const HomeAddressGroup = () => {
  return (
    <>
      <TabContentHeading title="Home Address" />
      <AddressFieldsGroup
        prefix="contactInfo.addresses.0"
        addressFieldName="street1"
      />
    </>
  )
}

export { HomeAddressGroup }
