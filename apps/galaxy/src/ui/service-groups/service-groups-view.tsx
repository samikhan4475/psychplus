'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { AddNewGroupDialog } from './add-new-group-dialog'
import { ServiceGroupsListTable } from './service-groups-list-table'
import { ServiceGroupListTablePagination } from './service-groups-table-pagination'

const ServiceGroupsView = () => {
  return (
    <Box className="w-full py-1">
      <Flex
        className="bg-white mb-1 h-[32px] w-full gap-1 px-2"
        align="center"
        justify="between"
      >
        <Text className="text-black text-[16px]" weight="medium">
          Groups
        </Text>
        <AddNewGroupDialog />
      </Flex>
      <Flex direction="column" className="bg-white flex-1 !overflow-hidden">
        <ServiceGroupsListTable />
        <ServiceGroupListTablePagination />
      </Flex>
    </Box>
  )
}

export { ServiceGroupsView }
