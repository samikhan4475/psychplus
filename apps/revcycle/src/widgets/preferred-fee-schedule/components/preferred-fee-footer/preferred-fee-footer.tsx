import { Flex } from '@radix-ui/themes'
import { type Table } from '@tanstack/react-table'
import {
  DataTablePageNavigation,
  DataTablePageSizeSelector,
} from '@psychplus/ui/data-table'

interface RowRecord {
  mdDoAmount: string
  npPaAmount: string
  psychologyAmount: string
  mastersAmount: string
  cptCode: string
  id?: string
}
const DataTableFooter = ({ table }: { table: Table<RowRecord> }) => (
  <Flex p="1" align="center" justify="end">
    <Flex gap="3">
      <DataTablePageSizeSelector table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

export { DataTableFooter }
