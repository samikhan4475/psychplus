'use client'

import { useRef } from 'react'
import { Box, Flex, Heading } from '@radix-ui/themes'
import { ToastProvider } from '@psychplus/ui/toast-provider'
import { MANAGEMENT_USERS_WIDGET } from '@psychplus/widgets'
import { usePublishLoaded, usePublishSize } from '@psychplus/widgets/hooks'
import { ListViewTable, TableFilters } from './components/list-view'

const ManagementUsersWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)
  usePublishLoaded(MANAGEMENT_USERS_WIDGET)
  usePublishSize(MANAGEMENT_USERS_WIDGET, ref)

  return (
    <ToastProvider>
      <Box className="min-h-[650px]" ref={ref}>
        <Flex
          align="center"
          className="py-0.5 pl-2 pr-5 [box-shadow:0_4px_4px_0_#00000014]"
          justify="start"
        >
          <Heading className="text-xl font-semibold">Users</Heading>
        </Flex>
        <TableFilters />
        <ListViewTable />
      </Box>
    </ToastProvider>
  )
}

export { ManagementUsersWidgetClient }
