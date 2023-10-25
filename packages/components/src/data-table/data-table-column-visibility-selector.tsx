import { ChevronDownIcon } from '@radix-ui/react-icons'
import { type Table as ReactTable } from '@tanstack/react-table'
import { Button } from '@psychplus/ui/button'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'

const DataTableColumnVisibilitySelector = <TData,>({
  table,
}: {
  table: ReactTable<TData>
}) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <Button variant="outline">
        Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
      {table
        .getAllColumns()
        .filter((column) => column.getCanHide())
        .map((column) => {
          return (
            <DropdownMenu.CheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenu.CheckboxItem>
          )
        })}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
)

export { DataTableColumnVisibilitySelector }
