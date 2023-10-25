import { Text } from '@radix-ui/themes'
import { type Table as ReactTable } from '@tanstack/react-table'

const DataTableSelectedRowLabel = <TData,>({
  table,
}: {
  table: ReactTable<TData>
}) => (
  <Text size="2" color="gray">
    {table.getFilteredSelectedRowModel().rows.length} of{' '}
    {table.getFilteredRowModel().rows.length} row(s) selected.
  </Text>
)

export { DataTableSelectedRowLabel }
