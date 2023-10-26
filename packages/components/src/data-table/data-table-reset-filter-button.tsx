import { Cross2Icon } from '@radix-ui/react-icons'
import { type Table } from '@tanstack/react-table'
import { Button } from '@psychplus/ui/button'

const DataTableResetFilterButton = <TData,>({
  table,
}: {
  table: Table<TData>
}) => {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length

  if (!isFiltered) {
    return null
  }

  return (
    <Button variant="ghost" size="2" onClick={() => table.resetColumnFilters()}>
      Reset
      <Cross2Icon className="h-4 w-4" />
    </Button>
  )
}

export { DataTableResetFilterButton }
