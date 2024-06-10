import { useState } from 'react';
import { Text } from '@radix-ui/themes';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Button } from '@psychplus/ui/button';
import { DropdownMenu } from '@psychplus/ui/dropdown-menu';

export interface MultiSelectOption {
  value: string
  label: string
}

export interface Props {
  options: MultiSelectOption[]
  placeholder?: string
  onChange?: (selectedValues: string[] | string) => void
  width?: string
  defaultValue?: boolean
  emitChange?: (selectedValues: string[] | string | undefined) => void
}

const MultiSelectDropdown: React.FC<Props> = ({
  options,
  placeholder = 'Select...',
  defaultValue,
  emitChange
}) => {
  const [selectedValues, setSelectedValues] = useState(() => defaultValue ? 'Yes' : 'No');

  const getDisplayLabel = (
    selectedValues: string,
    placeholder: string,
  ) => {
    if (!selectedValues) {
      return placeholder;
    }

    return selectedValues;
  }

  const handleChange = (value: string) => {
    setSelectedValues(value);
    emitChange?.(value);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="outline"
          className="flex items-center justify-between space-x-2"
        >
          <Text>{getDisplayLabel(selectedValues, placeholder)}</Text>
          <ChevronDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {options.map((item) => (
          <DropdownMenu.Item
            key={item.value}
            onSelect={(e: Event) => { handleChange((e.target as HTMLSelectElement).value || (e.target as HTMLSelectElement).innerText) }}
          >
            <Text>{item.label}</Text>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { MultiSelectDropdown }