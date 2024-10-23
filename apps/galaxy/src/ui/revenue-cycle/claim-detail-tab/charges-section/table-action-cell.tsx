'use client'

import React from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { DropdownMenu, Flex, IconButton, Text } from '@radix-ui/themes'

interface RowActionDropdownProps {
  rowIndex: number
}
const ClaimRowActionDropdown: React.FC<RowActionDropdownProps> = ({
  rowIndex,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size="1" variant="ghost" mr="1">
          <DotsHorizontalIcon height={16} width={16} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item className="hover:bg-pp-black-1 w-full py-4">
          <Flex className=" hover:text-[white]">
            <Text size="1">Edit</Text>
          </Flex>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="m-0 p-0" />
        <DropdownMenu.Item className="hover:bg-pp-black-1 w-full py-4">
          <Flex className=" hover:text-[white]">
            <Text size="1">Delete</Text>
          </Flex>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { ClaimRowActionDropdown }
