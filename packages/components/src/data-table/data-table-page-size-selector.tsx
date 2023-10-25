import { Flex, Text } from '@radix-ui/themes'
import { type Table as ReactTable } from '@tanstack/react-table'
import { Select } from '@psychplus/ui/select'

const PAGE_SIZES = [10, 25, 50, 100, 200]

const DataTablePageSizeSelector = <TData,>({
  table,
}: {
  table: ReactTable<TData>
}) => (
  <Flex gap="2" align="center">
    <Text size="2">Page size</Text>
    <Select.Root
      size="1"
      value={`${table.getState().pagination.pageSize}`}
      onValueChange={(value) => {
        table.setPageSize(Number(value))
      }}
    >
      <Select.Trigger
        value={table.getState().pagination.pageSize.toString()}
        className="w-[55px]"
      />
      <Select.Content side="top">
        {PAGE_SIZES.map((pageSize) => (
          <Select.Item key={pageSize} value={`${pageSize}`}>
            {pageSize}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  </Flex>
)

export { DataTablePageSizeSelector }
