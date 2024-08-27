'use client'

import React from 'react'
import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import type { Service } from '@psychplus/management-services'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'

interface DataTableRowActionsProps {
  data: Service
}

const RowActionDropdown = (props: DataTableRowActionsProps) => {
  const { data } = props
  const menuItems = ['Edit', 'Delete']
  const handleMenuItemSelect = (item: string) => {
    switch (item) {
      case 'Edit':
        console.log(data)
        break
      case 'Delete':
        console.log('delete')
        break
      default:
        break
    }
  }
  const getIconForMenuItem = (item: string) => {
    switch (item) {
      case 'Edit':
        return <Pencil1Icon />
      case 'Delete':
        return <TrashIcon />
      default:
        return null
    }
  }
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger>
        <IconButton
          size="1"
          variant="surface"
          mr="1"
          color="blue"
          className="max-h-[12px]"
        >
          <DotsHorizontalIcon height={16} width={16} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {menuItems.map((item, index, array) => (
          <React.Fragment key={item}>
            <DropdownMenu.Item
              className="hover:bg-[#151B4A]"
              onSelect={() => handleMenuItemSelect(item)}
            >
              <Flex className="hover:text-[white]" align="center" gap="1">
                {getIconForMenuItem(item)}
                <Text size="3">{item}</Text>
              </Flex>
            </DropdownMenu.Item>
            {index < array.length - 1 && (
              <DropdownMenu.Separator className="m-0 p-0" />
            )}
          </React.Fragment>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { RowActionDropdown }
