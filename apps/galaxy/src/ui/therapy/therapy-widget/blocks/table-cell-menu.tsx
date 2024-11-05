'use client'

import React from 'react'
import { DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { CirclePlus, PlusIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { TherapySchemaType } from '../therapy-schema'

interface ThearpyDataOption {
  value: string
  display: string
}
interface HeadingCellMenuProps {
  data: ThearpyDataOption[]
  title: string
}
const HeadingCellMenu = ({ data, title }: HeadingCellMenuProps) => {
  const { getValues, setValue } = useFormContext<TherapySchemaType>()

  const addTherapyDetailItem = (item: ThearpyDataOption) => {
    const fieldName =
      title === 'Therapy Modality'
        ? 'therapyDetailsModality'
        : 'therapyDetailsInterventions';
    const currentValues = getValues(fieldName) || [];
    const isDuplicate = currentValues.some(
      (existingItem: ThearpyDataOption) => existingItem.value === item.value
    );
    if (!isDuplicate) {
      currentValues.push(item);
      setValue(fieldName, currentValues);
    }
  };
 

  return (
    <DropdownMenu.Root >
      <DropdownMenu.Trigger >
        <PlusIcon className="absolute right-0" size={16} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-[359px]">
        {data.map((item) => (
          <DropdownMenu.Item
            className="hover:bg-pp-bg-accent group w-full px-3 py-2"
            key={item.value}
            onClick={() => addTherapyDetailItem(item)}
          >
            <Flex justify="between" gap="2" align="center" width="100%">
              <Text size="2" className="text-black">
                {item.display}
              </Text>
              <CirclePlus
                className="group-hover:text-pp-focus-border"
                size={20}
              />
            </Flex>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { HeadingCellMenu }
