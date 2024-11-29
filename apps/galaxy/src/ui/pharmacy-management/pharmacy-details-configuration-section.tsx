'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { formatDate } from '@/utils'
import TextInputField from './text-input-field'
import { Pharmacy } from './types'

const PharmacyDetailsConfigurationSection = ({
  pharmacy,
}: {
  pharmacy: Pharmacy
}) => {
  return (
    <>
      <Box className="shadow-sm bg-pp-table-subRows p-2">
        <Text className="text-pp-black-3 mb-2 text-[14px] font-bold">
          Configuration
        </Text>
      </Box>
      <Flex gap="2" className="p-3" wrap="wrap">
        <TextInputField label="Enabled From" value={pharmacy.enabledFrom} />
        <TextInputField
          label="Enabled To"
          value={formatDate(pharmacy.enabledDate)}
          width="w-[180px]"
        />
        <TextInputField label="Fax Backup" value="" width="w-[180px]" />
        <TextInputField
          label="Directory Specialists"
          value=""
          width="w-[180px]"
        />
        <TextInputField label="Test" value="" />
      </Flex>
    </>
  )
}

export { PharmacyDetailsConfigurationSection }
