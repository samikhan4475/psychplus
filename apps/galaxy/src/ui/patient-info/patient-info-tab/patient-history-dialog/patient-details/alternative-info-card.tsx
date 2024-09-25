'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { DetailBox } from '../shared'

const AlternativeInfoCard = () => {
  return (
    <Flex direction="column">
      <Box className="bg-pp-table-subRows rounded-t-1" px="2">
        <Text size="2" weight="bold">
          Alternate/Previous info
        </Text>
      </Box>
      <Flex gapX="4" gapY="3" wrap="wrap" p="2">
        <DetailBox title="First Name" content="John" />
        <DetailBox title="Middle Name" content="John" />
        <DetailBox title="Last Name" content="John" />
        <DetailBox title="Prefix" content="Mr." />
        <DetailBox title="Suffix" content="---" />
        <DetailBox title="Prof. Suffix" content="MBA" />
        <DetailBox
          title="Address Line 1"
          content="13th Street. 47 W 13th St, New York, NY 10011, USA"
        />
        <DetailBox
          title="Address Line 2"
          content="13th Street. 47 W 13th St, New York, NY 10011, USA"
        />
      </Flex>
    </Flex>
  )
}

export { AlternativeInfoCard }
