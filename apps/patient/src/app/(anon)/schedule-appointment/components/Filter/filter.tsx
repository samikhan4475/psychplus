import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { DownArrowIcon, psychPlusBlueColor } from '@/components'
import { useStore } from '../../store'
import {
  DropdownMenuComponentProps,
  FilterButtonProps,
  FilterProps,
} from '../../types'

const Filter = ({ filters, onFilterChange }: FilterProps) => {
  const languageCodeSet = useStore((state) => state.languageCodeSet)

  return (
    <Flex py="6" px="7" className="w-full flex-wrap" gap="5">
      <Flex gap="7" className="flex-1">
        <Flex gap="4" align="center">
          <Text size="5">Appointment</Text>
          {['Psychiatrist', 'Therapist'].map((type) => (
            <FilterButton
              key={type}
              filterType="providerType"
              filterValue={type}
              filterSelectedValue={filters.providerType}
              onFilterChange={onFilterChange}
            />
          ))}
        </Flex>

        <Flex gap="4" align="center">
          <Text size="5">Type</Text>
          {['Virtual', 'In-Person'].map((type) => (
            <FilterButton
              key={type}
              filterType="appointmentType"
              filterValue={type}
              filterSelectedValue={filters.appointmentType}
              onFilterChange={onFilterChange}
            />
          ))}
        </Flex>
      </Flex>

      <Flex gap="4">
        <DropdownMenuComponent
          title="Sort By"
          filterType="sortBy"
          items={['Ratings', 'Nearest', 'First Available']}
          onFilterChange={onFilterChange}
        />

        <DropdownMenuComponent
          title="Language"
          filterType="language"
          items={languageCodeSet?.codes.map((item) => item.display)}
          onFilterChange={onFilterChange}
        />

        <input
          type="text"
          value={filters.zipCode}
          className="w-80 rounded-4 border border-gray-7 px-3 focus:border-blue-12 focus:outline-none"
          style={{ color: psychPlusBlueColor }}
          onChange={(e) => onFilterChange('zipCode', e.target.value)}
        />
      </Flex>
    </Flex>
  )
}

const FilterButton = ({
  filterType,
  filterValue,
  filterSelectedValue,
  onFilterChange,
}: FilterButtonProps) => {
  const active = filterSelectedValue === filterValue
  return (
    <Button
      className={cn('h-12 rounded-4 px-4 md:px-6', {
        'bg-[#151B4A] text-[#FFFFFF]': active,
        'bg-[#E8E8E8] text-[#151B4A]': !active,
      })}
      onClick={() => onFilterChange(filterType, filterValue)}
    >
      <Text size="3">{filterValue}</Text>
    </Button>
  )
}

const DropdownMenuComponent = ({
  title,
  filterType,
  items,
  onFilterChange,
}: DropdownMenuComponentProps) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <Flex
        gap="3"
        align="center"
        px="3"
        className="h-12 whitespace-nowrap rounded-4 border border-gray-7"
      >
        <Text size="3" style={{ color: psychPlusBlueColor }}>
          {title}
        </Text>
        <DownArrowIcon />
      </Flex>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end" style={{ color: psychPlusBlueColor }}>
      {items?.map((item) => (
        <DropdownMenu.Item
          key={item}
          onClick={() => onFilterChange(filterType, item)}
        >
          {item}
        </DropdownMenu.Item>
      ))}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
)

export { Filter }
