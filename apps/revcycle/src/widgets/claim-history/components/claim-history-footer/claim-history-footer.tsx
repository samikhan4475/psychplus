import { Flex } from '@radix-ui/themes'
import { type Table } from '@tanstack/react-table'
import {
  DataTablePageNavigation,
  DataTablePageSizeSelector,
} from '@psychplus/ui/data-table'

interface ClaimHistory {
  changeDate: string
  changedBy: string
  sectionName: string
  fieldName: string
  oldValue: string
  newValue: string
}

const DataTableFooter = ({ table }: { table: Table<ClaimHistory> }) => (
  <Flex p="1" align="center" justify="end">
    <Flex gap="3">
      <DataTablePageSizeSelector table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

export { DataTableFooter }
