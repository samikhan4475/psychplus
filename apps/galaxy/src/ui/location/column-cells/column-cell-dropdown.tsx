import { ClockIcon } from '@/components/icons'
import { Flex, Select } from '@radix-ui/themes'
import React from 'react'

interface ColumnCellDropDownProps {
  status: string;
}

const ColumnCellDropDown = ({status}:ColumnCellDropDownProps) => {
  return (
    <Flex gap="1" align="center">
      <ClockIcon />
      <Select.Root defaultValue={status} size="1">
        <Select.Trigger className="w-[99px] h-[16px] border-solid border border-pp-grey rounded-1 bg-white text-pp-gray-3 shadow-[0px_1px_2px_0px_#1018280D]" variant="soft" />
        <Select.Content className="font-regular text-pp-black-3 ">
          <Select.Item value="Active">Active</Select.Item>
          <Select.Item value="Inactive">Inactive</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { ColumnCellDropDown }