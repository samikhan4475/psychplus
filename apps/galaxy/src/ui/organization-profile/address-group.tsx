import React from 'react'
import { AddressFieldsGroup } from '@/components'
import { Box, Text } from '@radix-ui/themes'

const AddressGroup = () => {
  return (
    <Box className='gap-2' px="2" py="1">
      <Text size="2" className='font-[590px] my-1' weight="medium">Primary Address</Text>
      <AddressFieldsGroup />
    </Box>
  )
}

export { AddressGroup }
