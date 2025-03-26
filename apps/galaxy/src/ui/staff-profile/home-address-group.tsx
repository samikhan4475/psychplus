import React from 'react'
import { Box } from '@radix-ui/themes'
import { AddressFieldsGroup } from '@/components'
import { TabContentHeading } from './tab-content-heading'

const HomeAddressGroup = () => {
  return (
    <Box>
      <TabContentHeading title="Home Address" />
      <AddressFieldsGroup className='mt-3' prefix="addresses.0" addressFieldName="street1" columnsPerRow='1' />
    </Box>
  )
}

export { HomeAddressGroup }
