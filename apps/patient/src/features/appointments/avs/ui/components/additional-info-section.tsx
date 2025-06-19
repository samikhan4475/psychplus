import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { TitleSection } from '../../common'
import { ADDTIONAL_INFO } from './data'

const AdditionalInfoSection = () => {
  return (
    <Box>
      <TitleSection title="Additional Information" />
      <Flex
        className="border-pp-gray-2 bg-pp-gray-5 rounded-2 border border-solid p-2 text-1 !outline-none"
        direction={'column'}
        gap={'3'}
      >
        {ADDTIONAL_INFO.map((info) => (
          <Flex direction={'column'} key={info.title}>
            <Text className="font-medium">{info.title}:</Text>
            <Text>{info.description}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export { AdditionalInfoSection }
