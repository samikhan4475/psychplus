'use client'

import React, { useEffect, useRef, useState } from 'react'
import { CODESETS, DISTANCE_IN_MILES_OPTIONS } from '@psychplus-v2/constants'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { Select } from '@psychplus/ui/select'
import { psychPlusBlueColor } from '@/components'
import { mapCodesetToOptions, useCodesetCodes } from '@/providers'
import { useStore } from '../../store'
import type {
  FilterOptionButtonProps,
  FilterOptionsDropDownProps,
  Filters,
} from '../../types'

interface FilterPanelProps {
  stateOptions?: string[]
  isSchedulingOptimizationEnabled?: boolean
}

const FilterPanel = ({
  stateOptions = [],
  isSchedulingOptimizationEnabled,
}: FilterPanelProps) => {
  const languageCodeSet = useCodesetCodes(CODESETS.Language)

  const LANGUAGE_OPTIONS = mapCodesetToOptions(languageCodeSet)
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
    <Flex
      pt="1"
      pb="6"
      className="bg-white sticky top-0 z-10 w-full flex-1 flex-wrap px-4 max-lg:items-start sm:px-7"
      gap="4"
    >
      <Flex className="flex-col gap-3 lg:flex-row">
        <Flex align="center" gap="2">
          <Text className="text-[12px] font-medium text-[#000000] md:text-[14px]">
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

        <Flex gap="2" align="center">
          <Text className="text-[12px] font-medium text-[#000000] md:text-[14px]">
            Type
          </Text>
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

      <Flex className="flex-1 flex-row gap-3 max-sm:flex-wrap sm:flex-wrap sm:gap-2.5 md:flex-wrap">
        {isSchedulingOptimizationEnabled &&
          filters.appointmentType === 'In-Person' && (
            <Flex gap="2" align="center" className="flex-1 text-[#1c2024]">
              <Text className="text-[12px] font-medium lg:text-[14px] ">
                Radius
              </Text>
              <FilterOptionsDropDown
                prefix="Radius"
                filterType="maxDistanceInMiles"
                options={[...DISTANCE_IN_MILES_OPTIONS]}
                onFilterChange={handleFiltersChange}
                placeholder="Radius"
                selectedOption={filters.maxDistanceInMiles}
              />
            </Flex>
          )}
        <Flex gap="2" align="center" className="flex-1 text-[#1c2024]">
          <Text className="text-[12px] font-medium md:text-[14px] ">
            Sort by
          </Text>
          <FilterOptionsDropDown
            prefix="A-Z"
            filterType="sortBy"
            options={
              filters.appointmentType === 'In-Person'
                ? ['Nearest', 'Rating']
                : ['Rating']
            }
            onFilterChange={handleFiltersChange}
            placeholder="A-Z"
            selectedOption={filters.sortBy}
          />
        </Flex>
        <Flex gap="4" align="center" className="text-[#1c2024]">
          <Text className="text-[12px] font-medium md:text-[14px]">
            Language
          </Text>
          <FilterOptionsDropDown
            prefix="Language"
            filterType="language"
            options={LANGUAGE_OPTIONS.map((opt) => opt.value) ?? []}
            onFilterChange={handleFiltersChange}
            placeholder="Language"
            selectedOption={filters.language}
          />
        </Flex>
        <Flex gap="2" align="center" className="flex-1 text-[#1c2024]">
          <Text className="whitespace-nowrap text-[12px] font-medium md:text-[14px]">
            ZIP Code
          </Text>
          <input
            type="number"
            placeholder="ZIP Code"
            value={filtersState?.zipCode}
            className="w-full max-w-full flex-1 rounded-[4px] border border-[#b9bbc6] px-[5px] py-1 font-regular text-[#1c2024] focus:border-blue-12 focus:outline-none max-lg:w-[200px] max-md:w-[200px] max-sm:h-7 max-xs:h-6 sm:h-8 md:h-8 md:px-[10px] md:py-2 lg:h-10"
            style={{ color: psychPlusBlueColor }}
            onChange={(e) => handleZipCodeChange(e.target.value)}
          />
        </Flex>
        <Flex gap="2" align="center" className="flex-1">
          <Text className="text-[12px] font-medium text-[#1c2024] md:text-[14px]">
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
        'cursor-pointer rounded-[6px] bg-[#FFFFFF] px-[5px] font-medium text-[#1c2024] max-sm:h-7 sm:h-8 md:h-8 md:px-[10px] lg:h-10',
        {
          'border-[#151B4A] bg-[#151B4A] text-[#FFFFFF]': active,
          '': !active,
        },
      )}
      onClick={() => onFilterChange({ [filterType]: filterOption })}
    >
      <Text className="text-2 md:text-3">{filterOption}</Text>
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
        className="w-full flex-1 whitespace-nowrap rounded-[4px] border border-[#b9bbc6] px-[5px] py-2 font-regular text-[#1c2024] placeholder-[#1C2024] max-sm:h-7 max-xs:h-6 sm:h-8 md:h-8 md:px-[10px] lg:h-10"
      >
        {selectedOption || placeholder}

        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 transform" />
      </Select.Trigger>
      <Select.Content align="end" position="popper" highContrast>
        {options?.map((option) => (
          <Select.Item key={option} value={option}>
            <Text className="text-2 md:text-4">{`${option}`}</Text>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export { FilterPanel }
