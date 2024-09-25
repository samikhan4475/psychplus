'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { DetailBox } from '../shared'

const AdditionalInfoCard = () => {
  return (
    <Flex direction="column">
      <Box className="bg-pp-table-subRows rounded-t-1" px="2">
        <Text size="2" weight="bold">
          Additional Contact Info
        </Text>
      </Box>
      <Flex gapX="4" gapY="3" wrap="wrap" p="2">
        <DetailBox title="Home Phone" content="12345678" />
        <DetailBox title="Ext" content="321" />
        <DetailBox
          title="Comment"
          content="Please only morning Saturday from 08:00am to 08:00pm"
        />
        <DetailBox title="Home Phone" content="12345678" />
        <DetailBox title="Ext" content="321" />
        <DetailBox
          title="Comment"
          content="Please only morning Saturday from 08:00am to 08:00pm"
        />
      </Flex>
    </Flex>
  )
}

export { AdditionalInfoCard }
