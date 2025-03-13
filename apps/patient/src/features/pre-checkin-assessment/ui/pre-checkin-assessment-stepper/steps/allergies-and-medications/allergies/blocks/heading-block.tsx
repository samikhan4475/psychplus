import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import AddButton from '../../../../shared-blocks/add-button'

const HeadingBlock = () => {
  return (
    <Flex className="w-full" justify={'between'} align={'center'}>
      <Text className="text-[24px] font-medium">Allergies</Text>
      {/* <AddButton label="Add Allergies" onClick={() => alert('Add Allergies')} /> */}
    </Flex>
  )
}

export { HeadingBlock }
