'use client'

import { useEffect, useState } from 'react'
import { Flex, Select } from '@radix-ui/themes'
import { useStore } from './store'
import { FilterOptions } from './types'

const ShowCheckbox = () => {
  const { setFilteredInsurances } = useStore((state) => ({
    setFilteredInsurances: state.setFilteredInsurances,
  }))

  const [filterValue, setFilterValue] = useState<FilterOptions>(
    FilterOptions.ALL,
  )

  useEffect(() => {
    setFilteredInsurances(filterValue)
  }, [filterValue, setFilteredInsurances])

  const handleFilterChange = (value: FilterOptions) => {
    console.log('Selected filter:', value)
    setFilterValue(value)
  }

  return (
    <Flex direction="row" gap="2" align="center">
      <Select.Root
        size="1"
        defaultValue={FilterOptions.ALL}
        onValueChange={handleFilterChange}
      >
        <Select.Trigger className="min-w-28" />
        <Select.Content highContrast position="popper">
          <Select.Group>
            {filterOptionsArray.map(({ label, value }) => (
              <Select.Item key={value} value={value}>
                {label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

const filterOptionsArray = [
  { label: 'All', value: FilterOptions.ALL },
  { label: 'Active', value: FilterOptions.ACTIVE },
  { label: 'Inactive', value: FilterOptions.INACTIVE },
]

export { ShowCheckbox }
