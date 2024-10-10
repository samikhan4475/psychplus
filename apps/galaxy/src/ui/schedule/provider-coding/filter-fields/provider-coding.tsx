'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { ProviderCodingFilters } from '../provider-coding-filters'
import { ProvierCodingTableView } from '../provider-coding-table-view'

const ProviderCoding = () => {
  return (
    <Flex direction="column" className="h-full overflow-auto">
      <ScrollArea className="flex-1">
        <Flex direction="column" className="flex-1">
          <ProviderCodingFilters />
          <ProvierCodingTableView />
        </Flex>
      </ScrollArea>
    </Flex>
  )
}

export { ProviderCoding }
