'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { Mail } from './mail'
import { Primary } from './primary'

const AddressCard = () => {
  return (
    <Flex direction="column">
      <Box className="bg-pp-table-subRows rounded-t-1" px="2">
        <Text size="2" weight="bold">
          Address
        </Text>
      </Box>
      <Flex maxWidth="620px" justify="between" gap="2" p="2">
        <Primary />
        <Mail />
      </Flex>
    </Flex>
  )
}

export { AddressCard }
