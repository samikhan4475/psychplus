import React from 'react'
import { Box } from '@radix-ui/themes'
import { AddressFieldsGroup } from '@/components'
import { TabContentHeading } from './tab-content-heading'

const HomeAddressGroup = () => {
  return (
    <Box>
      <TabContentHeading title="Home Address" />
      <AddressFieldsGroup prefix="homeAddress" addressFieldName="street1" className='mt-2.5' />
    </Box>
  )
}

export { HomeAddressGroup }
