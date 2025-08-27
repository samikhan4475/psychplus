'use client'

import React from 'react'
import { PillSelect } from '@/components-v2/pill-select'
import type { FilterOptionsDropDownProps } from '../../types'

export const FilterOptionsSelect = ({
  filterType,
  options,
  onFilterChange,
  placeholder,
  selectedOption,
  disabled = false,
  defaultValue = '',
  ...props
}: FilterOptionsDropDownProps) => {
  return (
    <PillSelect
      options={options}
      selectedOption={selectedOption}
      onChange={(value) => onFilterChange({ [filterType]: value })}
      placeholder={placeholder}
      disabled={disabled}
      defaultValue={defaultValue}
      {...props}
    />
  )
}
