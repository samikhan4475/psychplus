'use client'

import React from 'react'
import { DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { CirclePlus, PlusIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { AddOnWidgetSchemaType } from '@/ui/add-on/add-on-widget/add-on-widget-schema'

interface DataOption {
  value: string
  display: string
}
interface HeadingCellMenuProps {
  data: DataOption[]
  title: string
}
const HeadingCellMenu = ({ data, title }: HeadingCellMenuProps) => {
  const { getValues, setValue } = useFormContext<AddOnWidgetSchemaType>()

  const addPsychoanalysisItem = (item: DataOption) => {
    const fieldName =
      title === 'Description of Transference'
        ? 'transferenceDescription'
        : 'psychoanalyticTechnique'
    const currentValues = getValues(fieldName) || []
    const isDuplicate = currentValues.some(
      (existingItem) => existingItem?.value === item.value,
    )
    if (!isDuplicate) {
      currentValues.push(item)
      setValue(fieldName, currentValues)
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <PlusIcon cursor="pointer" className="absolute right-0" size={16} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-[359px]">
        {data.map((item) => (
          <DropdownMenu.Item
            className="hover:bg-pp-bg-accent group w-full px-3 py-2"
            key={item.value}
          >
            <Flex
              justify="between"
              gap="2"
              align="center"
              width="100%"
              onClick={() => addPsychoanalysisItem(item)}
            >
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
