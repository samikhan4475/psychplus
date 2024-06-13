'use client'

import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextFieldInput } from '@radix-ui/themes'

type FilterFieldProps = {
  label: string
  placeholder: string
  value?: string
  onChange: (value: string) => void
}

const FilterField: React.FC<FilterFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => (
  <Flex
    align="center"
    p="1"
    className="flex-1"
    style={{ borderRadius: '0.25rem' }}
  >
    <Flex className="w-1/2">
      <Text size="3" mr="1" weight="light">
        {label}
      </Text>
    </Flex>
    <Box className="w-full">
      <TextFieldInput
        className="h-30 w-full font-light"
        size="2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  </Flex>
)

const ImmunizationSearch: React.FC = () => {
  const [filterValue, setFilterValue] = useState('')

  const handleFilterChange = (value: string) => {
    setFilterValue(value)
  }

  return (
    <Flex
      align="center"
      className="rounded-4 border-2 border-[#eaeaea] bg-[#FCFDFF] p-3"
    >
      <FilterField
        label="Immunization"
        placeholder="Search by Immunization"
        value={filterValue}
        onChange={handleFilterChange}
      />
      <Box>
        <Button className="h-25 mr-n5 bg-[#151B4A]">
          <MagnifyingGlassIcon />
        </Button>
        <Button
          variant="outline"
          highContrast
          className="h-25 ml-2 bg-[#EAEEF9]"
        >
          Clear
        </Button>
      </Box>
    </Flex>
  )
}

export { ImmunizationSearch }
