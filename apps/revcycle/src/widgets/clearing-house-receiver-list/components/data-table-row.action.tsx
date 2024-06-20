'use client'

import React, { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { ClearingHouseReceiver } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'

interface DataTableRowActionsProps {
  data: ClearingHouseReceiver
}

const RowActionDropdown = ({ data }: DataTableRowActionsProps) => {
  const menuItems = ['Edit', 'Delete']
  const [isOpen, setIsOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const openDialog = () => {
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  const openDialogDelete = () => {
    setDeleteOpen(true)
  }

  const closeDialogDelete = () => {
    setDeleteOpen(false)
  }

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton size="1" variant="ghost" mr="1">
            <DotsHorizontalIcon height={16} width={16} />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {menuItems.map((item, index) => (
            <React.Fragment key={item}>
              <DropdownMenu.Item
                className="w-full py-4 hover:bg-[#151B4A]"
                onSelect={() =>
                  item === 'Edit' ? openDialog() : openDialogDelete()
                }
              >
                <Flex className=" hover:text-[white]">
                  <Text size="3">{item}</Text>
                </Flex>
              </DropdownMenu.Item>
              {index < menuItems.length - 1 && (
                <DropdownMenu.Separator className="m-0 p-0" />
              )}
            </React.Fragment>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <RowActionEdit row={data} isOpen={isOpen} closeDialog={closeDialog} />
      <RowActionDelete
        row={data}
        isOpen={deleteOpen}
        closeDialog={closeDialogDelete}
      />
    </>
  )
}

export { RowActionDropdown }
