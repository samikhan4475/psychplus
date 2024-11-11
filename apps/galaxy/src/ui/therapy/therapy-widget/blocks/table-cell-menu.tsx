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
  const { watch, getValues, setValue } = useFormContext<TherapySchemaType>()
  const therapyDetailsModality = watch('therapyDetailsModality') || []
  const therapyDetailsInterventions = watch('therapyDetailsInterventions') || []

  const addTherapyDetailItem = (item: ThearpyDataOption) => {
    const fieldName =
      title === 'Therapy Modality'
        ? 'therapyDetailsModality'
        : 'therapyDetailsInterventions'
    const currentValues = getValues(fieldName) || []
    const isDuplicate = currentValues.some(
      (existingItem: ThearpyDataOption) => existingItem.value === item.value,
    )
    if (!isDuplicate) {
      currentValues.push(item)
      setValue(fieldName, currentValues)
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <PlusIcon className="absolute right-1" size={16} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-[359px]">
        {data.map((item) => {
          const isSelected =
            title === 'Therapy Modality'
              ? therapyDetailsModality.some(
                  (selectedItem: ThearpyDataOption) =>
                    selectedItem.value === item.value,
                )
              : therapyDetailsInterventions.some(
                  (selectedItem: ThearpyDataOption) =>
                    selectedItem.value === item.value,
                )

          return (
            <DropdownMenu.Item
              className={`w-full px-3 py-2 ${
                isSelected
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'hover:bg-pp-bg-accent group'
              }`}
              key={item.value}
              onClick={() => !isSelected && addTherapyDetailItem(item)}
              disabled={isSelected}
            >
              <Flex justify="between" gap="2" align="center" width="100%">
                <Text
                  size="2"
                  className={isSelected ? 'text-gray-500' : 'text-black'}
                >
                  {item.display}
                </Text>
                {!isSelected && (
                  <CirclePlus
                    className="group-hover:text-pp-focus-border"
                    size={20}
                  />
                )}
              </Flex>
            </DropdownMenu.Item>
          )
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { HeadingCellMenu }
