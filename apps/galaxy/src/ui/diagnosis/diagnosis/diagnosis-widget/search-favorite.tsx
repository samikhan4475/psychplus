'use client'

import { Flex, Select, Text } from '@radix-ui/themes'
import { PlusCircleIcon } from 'lucide-react'
import { SearchButton } from '@/ui/schedule/shared'
import { OPTIONS } from '../constants'

const SearchFavorite = () => {
  return (
    <Flex gap="2" justify="between" align="center" className="w-full">
      <Select.Root value="">
        <Select.Trigger
          placeholder="Search Practice"
          className={`border-pp-gray-2 h-[26px] w-[89%] border border-solid text-[12px] !outline-none [box-shadow:none]`}
        />
        <Select.Content
          position="popper"
          align="center"
          variant="soft"
          className="w-full"
        >
          {OPTIONS.map((option) => {
            return (
              <Flex
                key={option.value}
                className="hover:bg-pp-bg-accent rounded-2"
                justify="between"
                align="center"
              >
                <Text className="pl-1 text-[11px]">{option.label}</Text>
                <Select.Item
                  value={option.value}
                  className="hover:bg-pp-bg-accent bg-transparent"
                >
                  <PlusCircleIcon
                    stroke="#194595"
                    strokeWidth="2"
                    height="15"
                    width="15"
                  />
                </Select.Item>
              </Flex>
            )
          })}
        </Select.Content>
      </Select.Root>

      <SearchButton />
    </Flex>
  )
}

export { SearchFavorite }
