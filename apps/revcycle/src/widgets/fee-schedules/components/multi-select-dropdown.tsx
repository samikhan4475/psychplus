import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'
import { Checkbox } from '@psychplus/ui/checkbox'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'

interface MultiSelectOption {
  value: string
  label: string
}

const getDisplayLabel = (
  selectedValues: string[],
  options: MultiSelectOption[],
  placeholder: string,
) => {
  if (selectedValues.length === 0) {
    return placeholder
  }

  if (selectedValues.length === 1) {
    return (
      options.find((option) => option.value === selectedValues[0])?.label ?? ''
    )
  }

  return `${selectedValues.length} selected`
}

interface Props {
  options: MultiSelectOption[]
  placeholder?: string
  onChange?: (selectedValues: string[]) => void
  width?: string
}

const MultiSelectDropdown: React.FC<Props> = ({
  options,
  placeholder = 'Select...',
  onChange,
  width,
}) => {
  const ddMenuContentClasses = `max-h-[300px] 'w-[${width ? width : '200px'}]}`
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
          <span>{getDisplayLabel(selectedValues, options, placeholder)}</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={ddMenuContentClasses}>
        {options.map((item) => (
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

export { MultiSelectDropdown, type MultiSelectOption }
