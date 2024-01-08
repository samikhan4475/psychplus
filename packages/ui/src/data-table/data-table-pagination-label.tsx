import { Flex, Text } from '@radix-ui/themes'
import { type Table } from '@tanstack/react-table'

const DataTablePaginationLabel = <TData,>({
  table,
}: {
  table: Table<TData>
}) => {
  const pageCount = table.getPageCount()
  if (pageCount === 0) {
    return null
  }

  return (
    <Flex align="center" gap="2">
      <Text color="gray" size="1">{`Page ${
        table.getState().pagination.pageIndex + 1
      } of ${pageCount}`}</Text>
    </Flex>
  )
}

export { DataTablePaginationLabel }
