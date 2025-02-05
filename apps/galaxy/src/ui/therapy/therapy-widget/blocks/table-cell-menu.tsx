'use client'

import React from 'react'
import { DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { CirclePlus, PlusIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { TherapySchemaType } from '../individual/therapy-schema'

interface TherapyDataOption {
  value: string
  display: string
}

interface HeadingCellMenuProps {
  data: TherapyDataOption[]
  title: string
}

const HeadingCellMenu = ({ data, title }: HeadingCellMenuProps) => {
  const { watch, getValues, setValue } = useFormContext<TherapySchemaType>()
  const therapyDetailsModality: TherapyDataOption[] =
    watch('therapyDetailsModality') ?? []
  const therapyDetailsInterventions: TherapyDataOption[] =
    watch('therapyDetailsInterventions') ?? []

  const fieldName =
    title === 'Therapy Modality'
      ? 'therapyDetailsModality'
      : 'therapyDetailsInterventions'

  const addTherapyDetailItem = (item: TherapyDataOption) => {
    const currentValues = getValues(fieldName) ?? []
    if (
      !currentValues.some((existingItem) => existingItem.value === item.value)
    ) {
      setValue(fieldName, [...currentValues, item])
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <PlusIcon className="absolute right-1 cursor-pointer" size={16} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-[359px]">
        {data.map((item) => {
          const isSelected = (
            fieldName === 'therapyDetailsModality'
              ? therapyDetailsModality
              : therapyDetailsInterventions
          ).some((selectedItem) => selectedItem.value === item.value)

          return (
            <DropdownMenu.Item
              key={item.value}
              onClick={() => !isSelected && addTherapyDetailItem(item)}
              disabled={isSelected}
              className={`w-full px-3 py-2 ${
                isSelected
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'hover:bg-pp-bg-accent group'
              }`}
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
                    className="group-hover:text-pp-focus-border cursor-pointer"
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
