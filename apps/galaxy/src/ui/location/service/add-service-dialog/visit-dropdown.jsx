import CirclePlusIcon from '@/components/icons/circle-plus-icon'
import { Flex, Popover, Text } from '@radix-ui/themes'
import React from 'react'

const VisitDropdown = () => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Text className="text-[16px] leading-4 cursor-pointer">+</Text>
      </Popover.Trigger>
      <Popover.Content
        side="left"
        sideOffset={-20}
        width="360px"
        className="rounded-1 p-2 flex flex-col mt-6"
      >
        <Flex align="center" justify="between" gap="1" className="rounded-1 px-3 bg-white hover:bg-pp-bg-accent">
          <Text className="text-[12px] font-[500] leading-4">New Pt, Outpatient Office Visit</Text>
          <CirclePlusIcon />
        </Flex>
        <Flex align="center" justify="between" gap="1" className="rounded-1 px-3 bg-white hover:bg-pp-bg-accent">
          <Text className="text-[12px] font-[500] leading-4">New Pt, Outpatient Office Visit</Text>
          <CirclePlusIcon />
        </Flex>
        <Flex align="center" justify="between" gap="1" className="rounded-1 px-3 bg-white hover:bg-pp-bg-accent">
          <Text className="text-[12px] font-[500] leading-4">New Pt, Outpatient Office Visit</Text>
          <CirclePlusIcon />
        </Flex>
        <Flex align="center" justify="between" gap="1" className="rounded-1 px-3 bg-white hover:bg-pp-bg-accent">
          <Text className="text-[12px] font-[500] leading-4">New Pt, Outpatient Office Visit</Text>
          <CirclePlusIcon />
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export { VisitDropdown }