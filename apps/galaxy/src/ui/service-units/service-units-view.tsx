'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { AddNewUnitDialog } from './add-new-unit-dialog'
import { ServiceUnitsTable } from './service-units-table'
import { ServiceUnitsTablePagination } from './service-units-table-pagination'

const ServiceUnitsView = () => {
  return (
    <Box className="w-full py-1">
      <Flex
        className="bg-white mb-1 h-[32px] w-full gap-1 px-2"
        align="center"
        justify="between"
      >
        <Text className="text-black text-[16px]" weight="medium">
          Units
        </Text>
        <AddNewUnitDialog />
      </Flex>
      <Flex direction="column" className="bg-white flex-1 !overflow-hidden">
        <ServiceUnitsTable />
        <ServiceUnitsTablePagination />
      </Flex>
    </Box>
  )
}

export { ServiceUnitsView }
