'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { Select } from '@psychplus/ui/select'
import { psychPlusBlueColor } from '@/components'
import { useStore } from '../../store'
import type {
  FilterOptionButtonProps,
  FilterOptionsDropDownProps,
  Filters,
} from '../../types'

interface FilterPanelProps {
  stateOptions?: string[]
}

const FilterPanel = ({ stateOptions = [] }: FilterPanelProps) => {
  const { codeSetIndex } = useStore()
  const languageCodeSet = codeSetIndex.Language
  const { handleFiltersChange, filters } = useStore()

  const [filtersState, setFiltersState] = useState<Filters>()

  useEffect(() => {
    setFiltersState(filters)
  }, [filters])

  const handleZipCodeChange = (value: string) => {
    const zipCode = value.slice(0, 5)
    handleFiltersChange({ zipCode })
  }

  return (
    <Flex pt="1" pb="6" className="w-full flex-wrap px-4 sm:px-7" gap="4">
      <Flex className="flex-1 flex-col gap-6 sm:flex-row sm:gap-7">
        <Flex align="center" gap="4">
          <Text className="text-[16px] font-medium text-[#000000]">
            Appointment
          </Text>
          {['Psychiatry', 'Therapy'].map((option) => (
            <FilterOptionButton
              key={option}
              filterType="providerType"
              filterOption={option}
              filterSelectedOption={filtersState?.providerType}
              onFilterChange={handleFiltersChange}
            />
          ))}
        </Flex>

        <Flex gap="4" align="center">
          <Text className="text-[16px] font-medium text-[#000000]">Type</Text>
          {['Virtual', 'In-Person'].map((option) => (
            <FilterOptionButton
              key={option}
              filterType="appointmentType"
              filterOption={option}
              filterSelectedOption={filtersState?.appointmentType}
              onFilterChange={handleFiltersChange}
            />
          ))}
        </Flex>
      </Flex>

      <Flex className="gap-1 sm:gap-4">
        <Flex gap="4" align="center" className="text-[#1c2024]">
          <Text className="text-[16px] font-medium ">Sort by</Text>
          <FilterOptionsDropDown
            prefix="A-Z"
            filterType="sortBy"
            options={['Nearest', 'First Available']}
            onFilterChange={handleFiltersChange}
            placeholder="A-Z"
            selectedOption={filters.sortBy}
          />
        </Flex>
        <Flex gap="4" align="center" className="text-[#1c2024]">
          <Text className="text-[16px] font-medium">Language</Text>
          <FilterOptionsDropDown
            prefix="Language"
            filterType="language"
            options={languageCodeSet?.map((item) => item.display)}
            onFilterChange={handleFiltersChange}
            placeholder="Language"
            selectedOption={filters.language}
          />
        </Flex>
        <>
          <Flex gap="4" align="center" className="text-[#1c2024]">
            <Text className="text-[16px] font-medium">ZIP Code</Text>
            <input
              type="number"
              placeholder="ZIP Code"
              value={filtersState?.zipCode}
              className=" w-[102px] flex-1 rounded-[4px] border border-[#b9bbc6] px-[10px] py-2 font-regular text-[#1c2024] focus:border-blue-12 focus:outline-none "
              style={{ color: psychPlusBlueColor }}
              onChange={(e) => handleZipCodeChange(e.target.value)}
            />
          </Flex>
          <Flex gap="4" align="center">
            <Text className="text-[16px] font-medium text-[#1c2024]">
              State
            </Text>
            <FilterOptionsDropDown
              prefix="State"
              filterType="state"
              disabled={stateOptions.length < 2}
              options={stateOptions}
              onFilterChange={handleFiltersChange}
              placeholder="State"
              selectedOption={filtersState?.state}
            />
          </Flex>
        </>
      </Flex>
    </Flex>
  )
}

const FilterOptionButton = ({
  filterType,
  filterOption,
  filterSelectedOption,
  onFilterChange,
}: FilterOptionButtonProps) => {
  const active = filterSelectedOption === filterOption
  return (
    <Button
      variant="outline"
      color="gray"
      className={cn(
        'h-10 cursor-pointer rounded-[6px] bg-[#FFFFFF] px-[10px] text-[16px] font-medium text-[#1c2024]',
        {
          'border-[#151B4A] bg-[#151B4A] text-[#FFFFFF]': active,
          '': !active,
        },
      )}
      onClick={() => onFilterChange({ [filterType]: filterOption })}
    >
      <Text size="3">{filterOption}</Text>
    </Button>
  )
}

const FilterOptionsDropDown = ({
  filterType,
  options,
  onFilterChange,
  placeholder,
  selectedOption,
  disabled = false,
}: FilterOptionsDropDownProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <Select.Root
      size="3"
      value={selectedOption}
      disabled={disabled}
      onValueChange={(value) => {
        onFilterChange({ [filterType]: value })
      }}
    >
      <Select.Trigger
        ref={triggerRef}
        placeholder={placeholder}
        className="h-10 min-w-[115px] whitespace-nowrap rounded-[4px] border border-[#b9bbc6] px-[10px] py-2 text-[16px] font-regular text-[#1c2024] placeholder-[#1C2024]"
      >
        {selectedOption || placeholder}

        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 transform" />
      </Select.Trigger>
      <Select.Content align="end" position="popper" highContrast>
        {options?.map((option) => (
          <Select.Item key={option} value={option}>
            <Text size="4">{`${option}`}</Text>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export { FilterPanel }
