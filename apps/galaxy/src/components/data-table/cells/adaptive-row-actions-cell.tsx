'use client'

import { Fragment, useState } from 'react'
import { DropdownMenu, Flex, IconButton } from '@radix-ui/themes'
import { type Row } from '@tanstack/react-table'
import { EllipsisIcon } from 'lucide-react'
import { RowAction } from './row-actions-cell'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  actions: RowAction<TData>[]
}

const AdaptiveRowActionsCell = <TData,>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) => {
  const [isRowDisabled, setIsRowDisabled] = useState(false)

  const toggleRowClick = () => {
    setIsRowDisabled((prev) => !prev) // Disable row after action is clicked
  }
  const [firstAction, secondAction, ...otherActions] = actions

  return (
    <Flex width="100%" align="center" gap="2">
      {firstAction?.render({ row, toggleRowClick, disabled: isRowDisabled })}
      {secondAction?.render({ row, toggleRowClick, disabled: isRowDisabled })}

      {otherActions.length > 0 && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton size="1" color="gray" variant="ghost">
              <EllipsisIcon size={14} className="text-pp-black-3" />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="start" size="1">
            {otherActions.map(({ id, render }) => (
              <Fragment key={id}>
                {render?.({
                  row,
                  id,
                  showTitle: true,
                  toggleRowClick,
                  disabled: isRowDisabled,
                })}
              </Fragment>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Flex>
  )
}

export { AdaptiveRowActionsCell }
