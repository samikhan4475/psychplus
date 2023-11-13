'use client'

import * as React from 'react'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { type Row, type Table } from '@tanstack/react-table'
import { Button } from '../button'
import { DropdownMenu } from '../dropdown-menu'

interface PropsWithRows<TData> {
  rows: Row<TData>[]
}

interface BulkAction<TData> {
  id: string
  render: (props: { rows: Row<TData>[] }) => React.ReactNode
}

interface DataTableBulkActionsProps<TData> {
  table: Table<TData>
  actions: BulkAction<TData>[]
}

const DataTableBulkActions = <TData,>({
  table,
  actions,
}: DataTableBulkActionsProps<TData>) => {
  const isSelected = table.getFilteredSelectedRowModel().rows.length > 0

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger disabled={!isSelected}>
        <Button size="2" variant="outline" disabled={!isSelected}>
          Actions
          <CaretDownIcon height={16} width={16} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {actions.map((action, idx) => (
          <React.Fragment key={`${action.id}-${idx}`}>
            {action.render({ rows: table.getSelectedRowModel().rows })}
          </React.Fragment>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { DataTableBulkActions, type BulkAction, type PropsWithRows }
