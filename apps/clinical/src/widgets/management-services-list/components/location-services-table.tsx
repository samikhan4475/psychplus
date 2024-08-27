'use client'

import { Box, Flex } from '@radix-ui/themes'
import {
  DataTable,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { useStore } from '../store'
import { columns } from './columns'
import { FilterForm } from './filter-form'

const DataTableFooter = (table: any) => (
  <Flex py="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

const LocationServicesTable = () => {
  const { services } = useStore((state) => ({
    services: state.services,
  }))
  return (
    <Flex direction="column" gap={'3'}>
      <FilterForm />
      <Box className="px-3 py-2">
        <DataTable
          data={services}
          columns={columns}
          initialPageSize={25}
          tableClass="bg-[white] rounded-2"
          tHeadClass="bg-[#D9E2FC] min-h-7"
          thClass="border border-solid border-[#CAD8FD] text-center"
          isRowPan={true}
          columnCellClass="border border-[#CAD8FD] [box-shadow:none] font-medium"
          renderFooter={DataTableFooter}
        />
      </Box>
    </Flex>
  )
}

export { LocationServicesTable }
