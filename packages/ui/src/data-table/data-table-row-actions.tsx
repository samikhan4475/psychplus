'use client'

import * as React from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { DropdownMenu } from '../dropdown-menu'
import { IconButton } from '../icon-button'

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

const DataTableRowActions = <TData,>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <IconButton size="1" variant="ghost" mr="1">
        <DotsHorizontalIcon height={16} width={16} />
      </IconButton>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
      {actions.map((action, idx) => (
        <React.Fragment key={`${action.id}-${idx}`}>
          {action.render({ row })}
        </React.Fragment>
      ))}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
)

export { DataTableRowActions, type RowAction, type PropsWithRow }
