'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { Pharmacy } from './types'

const PharmacyDetailsServiceLevelsSection = ({
  pharmacy,
}: {
  pharmacy: Pharmacy
}) => {
  return (
    <Box className="p-2">
      <Box className="border-pp-gray-2 rounded-3 border">
        <Box className="shadow-sm bg-pp-table-subRows p-1">
          <Text className="text-pp-black-3 mb-2 text-[12px] font-bold">
            Service Levels
          </Text>
        </Box>
        <Flex className="p-3 pb-0" wrap="wrap">
          {pharmacy.serviceLevel.map((service, index) => (
            <Box
              key={service}
              className={`mb-2 w-full ${
                index !== pharmacy.serviceLevel.length - 1
                  ? 'border-pp-gray-2 border-b'
                  : ''
              }`}
            >
              <Text className="text-pp-black-3 text-[14px]">{service}</Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export { PharmacyDetailsServiceLevelsSection }
