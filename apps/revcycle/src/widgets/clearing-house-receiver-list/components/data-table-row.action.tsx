'use client'

import React from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { DropdownMenu, Flex, IconButton, Text } from '@radix-ui/themes'

const RowActionDropdown = () => {
  const menuItems = ['Edit', 'Delete']

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size="1" variant="ghost" mr="1">
          <DotsHorizontalIcon height={16} width={16} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {menuItems.map((item, index) => (
          <React.Fragment key={item}>
            <DropdownMenu.Item className="w-full py-4 hover:bg-[#151B4A]">
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
  )
}

export { RowActionDropdown }
