'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { PreferredPartnerTable } from './preferred-partner-table'

const PreferredPartnerCard = () => {
  return (
    <Flex direction="column">
      <Box className="bg-pp-table-subRows rounded-t-1" px="2">
        <Text size="2" weight="bold">
          Prefered Partner
        </Text>
      </Box>
      <Flex direction="column" p="2" gap="2">
        <PreferredPartnerTable />
      </Flex>
    </Flex>
  )
}

export { PreferredPartnerCard }
