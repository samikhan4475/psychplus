'use client'

import { Flex } from '@radix-ui/themes'
import { FilterForm } from './filter-form'
import { ServiceHeader } from './service-header'
import { ServiceTable } from './service-table'
import { ServiceTablePagination } from './service-table-pagination'

const ServiceView = () => {
  return (
    <Flex
      direction="column"
      gap="1"
      p="1px"
      className="h-[calc(100dvh-188px)] !overflow-hidden"
    >
      <ServiceHeader />
      <FilterForm />
      <Flex
        direction="column"
        className="bg-white flex-1 !overflow-hidden rounded-1 pt-2 shadow-2"
      >
        <ServiceTable />
        <ServiceTablePagination />
      </Flex>
    </Flex>
  )
}

export { ServiceView }
