'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { Select } from '@psychplus/ui/select'
import { isVirtualAppointmentType, psychPlusBlueColor } from '@/components'
import { useStore } from '../../store'
import type {
  FilterOptionButtonProps,
  FilterOptionsDropDownProps,
  Filters,
} from '../../types'

const FilterPanel = () => {
  const { codeSetIndex } = useStore()
  const languageCodeSet = codeSetIndex.Language
  const { handleFiltersChange, filters } = useStore()

  const [filtersState, setFiltersState] = useState<Filters>()

  useEffect(() => {
    setFiltersState(filters)
  }, [filters])

  return (
    <Flex pt="1" pb="6" className="w-full flex-wrap px-4 sm:px-7" gap="5">
      <Flex className="flex-1 flex-col gap-6 sm:flex-row sm:gap-7">
        <Flex align="center" className="gap-2 sm:gap-4">
          <Text className="sm:text-5">Appointment</Text>
          {['Psychiatrist', 'Therapist'].map((option) => (
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
          <Text size="5">Type</Text>
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
        <FilterOptionsDropDown
          prefix="Sort by"
          filterType="sortBy"
          options={['Nearest', 'First Available']}
          onFilterChange={handleFiltersChange}
          placeholder="Sort by"
        />
        <FilterOptionsDropDown
          prefix="Language"
          filterType="language"
          options={languageCodeSet?.map((item) => item.display)}
          onFilterChange={handleFiltersChange}
          placeholder="Language"
        />
        {!isVirtualAppointmentType(filtersState?.appointmentType) && (
          <input
            type="text"
            placeholder="ZIP Code"
            value={filtersState?.zipCode}
            className="sm:max-w-auto max-w-[25%] flex-1 rounded-4 border border-gray-7 px-3 focus:border-blue-12 focus:outline-none"
            style={{ color: psychPlusBlueColor }}
            onChange={(e) => handleFiltersChange({ zipCode: e.target.value })}
          />
        )}
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
      className={cn('h-12 rounded-4 px-4 md:px-6', {
        'bg-[#151B4A] text-[#FFFFFF]': active,
        'bg-[#E8E8E8] text-[#151B4A]': !active,
      })}
      onClick={() => onFilterChange({ [filterType]: filterOption })}
    >
      <Text size="3">{filterOption}</Text>
    </Button>
  )
}

const FilterOptionsDropDown = ({
  prefix,
  filterType,
  options,
  onFilterChange,
  placeholder,
}: FilterOptionsDropDownProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <Select.Root
      size="3"
      onValueChange={(value) => {
        onFilterChange({ [filterType]: value })

        if (triggerRef.current) {
          triggerRef.current.innerText = `${prefix}: ${value}`
        }
      }}
    >
      <Select.Trigger
        ref={triggerRef}
        placeholder={placeholder}
        className="h-12 whitespace-nowrap rounded-4 border border-gray-7"
      ></Select.Trigger>
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
