import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import AddButton from '../../../../shared-blocks/add-button'

const HeadingBlock = () => {
  return (
    <Flex className="w-full" justify={'between'} align={'center'}>
      <Text className="text-[24px] font-medium">Medications</Text>
      <AddButton label="Add Medications" onClick={() => alert('Add Medications')} />
    </Flex>
  )
}

export { HeadingBlock }
