import { Fragment } from 'react'
import { DropdownMenu, Flex, IconButton } from '@radix-ui/themes'
import { type Row } from '@tanstack/react-table'
import { EllipsisIcon } from 'lucide-react'

interface PropsWithRow<TData> {
  row: Row<TData>
}

interface RowAction<TData> {
  id: string
  render: (props: { row: Row<TData> }) => React.ReactNode
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  actions: RowAction<TData>[]
}

const RowActionsCell = <TData,>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) => {
  return (
    <Flex width="100%" justify="center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Flex height="100%" width="100%" align="center" justify="center">
            <IconButton size="1" variant="soft" className="h-3.5 px-4">
              <EllipsisIcon
                width="18"
                height="12"
                className="min-w-4 min-h-4"
              />
            </IconButton>
          </Flex>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" size="1" highContrast>
          {actions.map((action, idx) => (
            <Fragment key={`${action.id}-${idx}`}>
              {action.render({ row })}
            </Fragment>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}

export { RowActionsCell, type RowAction, type PropsWithRow }
