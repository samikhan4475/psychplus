'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { useStore } from '../../store'
import { Mail } from './mail'
import { Primary } from './primary'

const AddressCard = () => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))
  const mailingAddress = selectedRow?.contactDetails?.addresses?.find(
    (address) => address.type === 'Mailing',
  )
  const primaryAddress = selectedRow?.contactDetails?.addresses?.find(
    (address) => address.type === 'Home',
  )
  const isSameAsPrimary =
    selectedRow?.contactDetails?.isMailingAddressSameAsPrimary

  return (
    <Flex direction="column">
      <Box className="bg-pp-table-subRows rounded-t-1" px="2">
        <Text size="2" weight="bold">
          Address
        </Text>
      </Box>
      <Flex maxWidth="620px" justify="between" gap="2" p="2">
        <Primary address={primaryAddress} />
        <Mail address={mailingAddress} isSameAsPrimary={isSameAsPrimary} />
      </Flex>
    </Flex>
  )
}

export { AddressCard }
