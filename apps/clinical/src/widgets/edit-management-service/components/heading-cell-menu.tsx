'use client'

import React from 'react'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { CirclePlus, PlusIcon } from 'lucide-react'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'

const data = [...Array(7)].map(() => 'New Pt, Outpatient Office Visit')

const HeadingCellMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          asChild
          variant="ghost"
          size={'1'}
          type="button"
          color="gray"
        >
          <PlusIcon color="#1C2024" size={16} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-[359px]">
        {data.map((item, index) => (
          <DropdownMenu.Item
            className="group w-full px-3 py-2 hover:bg-[#F0F4FF]"
            key={item}
          >
            <Flex justify={'between'} gap={'2'} align={'center'} width={'100%'}>
              <Text size="2" className="text-[#333]">
                {item}
              </Text>
              <CirclePlus className="group-hover:text-[#B9BBC6]" size={20} />
            </Flex>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { HeadingCellMenu }
