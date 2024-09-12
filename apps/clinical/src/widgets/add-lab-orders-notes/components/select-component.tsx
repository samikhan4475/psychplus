import React from 'react'
import { Select } from '@psychplus/ui/select'
import { SelectComponentProps } from '../types'

const SelectComponent = ({
  keyName = 'displayName',
  valueName = 'code',
  disabled = false,
  value,
  options,
  onChange,
  placeholder,
  className,
}: SelectComponentProps) => {
  return (
    <Select.Root
      size="2"
      disabled={disabled}
      value={value}
      onValueChange={onChange}
    >
      <Select.Trigger placeholder={placeholder} className={className} />
      <Select.Content>
        {options.map((option: any) => (
          <Select.Item key={option[valueName]} value={option[valueName]}>
            {option[keyName]}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default SelectComponent
