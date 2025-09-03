'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { AddNewRoomDialog } from './add-new-room-dialog'
import { ServiceRoomListTable } from './service-room-list-table'
import { ServiceRoomListTablePagination } from './service-room-table-pagination'

const ServiceRoomsView = () => {
  return (
    <Box className="w-full py-1">
      <Flex
        className="bg-white mb-1 h-[32px] w-full gap-1 px-2"
        align="center"
        justify="between"
      >
        <Text className="text-black text-[16px]" weight="medium">
          Rooms
        </Text>
        <AddNewRoomDialog />
      </Flex>
      <Flex direction="column" className="bg-white flex-1 !overflow-hidden">
        <ServiceRoomListTable />
        <ServiceRoomListTablePagination />
      </Flex>
    </Box>
  )
}

export { ServiceRoomsView }
