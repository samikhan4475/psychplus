import { Flex } from '@radix-ui/themes'
import { type Table } from '@tanstack/react-table'
import { Button } from '../button'

const DataTablePageNavigation = <TData,>({
  table,
}: {
  table: Table<TData>
}) => (
  <Flex gap="2">
    <Button
      variant="outline"
      size="1"
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
    >
      Previous
    </Button>
    <Button
      variant="outline"
      size="1"
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
    >
      Next
    </Button>
  </Flex>
)

export { DataTablePageNavigation }
