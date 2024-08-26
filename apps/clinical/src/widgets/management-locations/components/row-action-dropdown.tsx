'use client'

import React from 'react'
import {
  DotsHorizontalIcon,
  Pencil1Icon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { Box, Flex, IconButton, Text } from '@radix-ui/themes'
import { type Location } from '@psychplus/management-locations/types'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_MANAGEMENT_LOCATIONS_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

interface DataTableRowActionsProps {
  data: Location
}
const RowActionDropdown = ({ data }: DataTableRowActionsProps) => {
  const { publish } = usePubsub()

  const menuItems = ['Add Service', 'Edit', 'Delete']
  const handleMenuItemSelect = (item: string) => {
    switch (item) {
      case 'Edit':
        publish(`${ADD_MANAGEMENT_LOCATIONS_WIDGET}:${EventType.Opened}`, data)
        break
      case 'Delete':
        console.log('Location Delete')
        break
      case 'Add Service':
        console.log('Add Service')
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
      case 'Add Service':
        return <PlusIcon />
      default:
        return null
    }
  }
  return (
    <Box>
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
    </Box>
  )
}

export { RowActionDropdown }
