import React, { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'
import { Checkbox } from '@psychplus/ui/checkbox'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'

interface Data {
  value: string
  label: string
}

const getDisplayLabel = (
  selectedValues: string[],
  data: Data[],
  placeholder: string,
) => {
  if (selectedValues.length === 0) {
    return placeholder
  }

  if (selectedValues.length === 1) {
    return data.find((item) => item.value === selectedValues[0])?.label ?? ''
  }

  return `${selectedValues.length} selected`
}

interface Props {
  data: Data[]
  placeholder?: string
  onChange?: (selectedValues: string[]) => void
}

const MultiSelectDropdown: React.FC<Props> = ({
  data,
  placeholder = 'Select...',
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const handleChange = (value: string) => {
    const isSelected = selectedValues.includes(value)
    setSelectedValues((prevValues) =>
      isSelected
        ? prevValues.filter((v) => v !== value)
        : [...prevValues, value],
    )
  }

  useEffect(() => {
    if (onChange) {
      onChange(selectedValues)
    }
  }, [onChange, selectedValues])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="outline"
          className="flex w-[200px] items-center justify-between space-x-2"
        >
          <span>{getDisplayLabel(selectedValues, data, placeholder)}</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="max-h-[200px] w-[200px]">
        {data.map((item) => (
          <DropdownMenu.Item
            key={item.value}
            onSelect={(e) => e.preventDefault()}
          >
            <Checkbox
              checked={selectedValues.includes(item.value)}
              onCheckedChange={() => handleChange(item.value)}
              key={item.value}
            />{' '}
            {item.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { MultiSelectDropdown }
