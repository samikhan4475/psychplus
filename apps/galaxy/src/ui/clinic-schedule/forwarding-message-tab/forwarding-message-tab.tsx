'use client'

import { Flex } from '@radix-ui/themes'
import { FilterForm } from './filter-form'
import { ForwardingMessageHeader } from './forwarding-message-header'
import { ForwardingMessageTable } from './forwarding-message-table'
import { ForwardingTablePagination } from './forwarding-table-pagination'

interface ForwardingMessageTabProps {
  userId: number
}
const ForwardingMessageTab = ({ userId }: ForwardingMessageTabProps) => {
  return (
    <Flex flexGrow="1" direction="column" gap="1">
      <ForwardingMessageHeader userId={userId} />
      <FilterForm userId={userId} />
      <Flex
        direction="column"
        gap="1"
        height="100%"
        className="bg-white h-[calc(100dvh-260px)]"
      >
        <ForwardingMessageTable userId={userId} />
        <ForwardingTablePagination />
      </Flex>
    </Flex>
  )
}

export { ForwardingMessageTab }
