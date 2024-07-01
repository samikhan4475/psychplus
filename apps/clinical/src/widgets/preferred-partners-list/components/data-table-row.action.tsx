'use client'

import React, { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { type Row } from '@tanstack/react-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { RowActionEdit } from './row-action-edit'

interface RowAction<TData> {
  id: string
  render: (props: { row: Row<TData> }) => React.ReactNode
}
interface DataTableRowActionsProps {
  data: any
}

const RowActionDropdown = ({ data }: DataTableRowActionsProps) => {
  const menuItems = ['Edit', 'Email']
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = (title: string) => {
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
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
                onSelect={() => {
                  openDialog('Edit Preferred Partner')
                }}
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
    </>
  )
}

export { RowActionDropdown }
