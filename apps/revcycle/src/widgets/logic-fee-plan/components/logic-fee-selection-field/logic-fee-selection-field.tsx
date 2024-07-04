import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Text } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'

export interface MultiSelectOption {
  value: string
  label: string
}

const MultiSelectDropdown = ({
  dropdownOptions,
  onSelectionChange,
  selectedValue = 'Select...',
}: {
  dropdownOptions: MultiSelectOption[]
  onSelectionChange?: (selectedValues: string) => void
  selectedValue: string
}) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <Button
        variant="outline"
        className="flex items-center justify-between space-x-2"
      >
        <Text>{selectedValue}</Text>
        <ChevronDownIcon />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      {dropdownOptions.map((item) => (
        <DropdownMenu.Item
          key={item.value}
          onSelect={(e) => {
            onSelectionChange?.((e.currentTarget as HTMLSelectElement).value)
          }}
        >
          <Text>{item.label}</Text>
        </DropdownMenu.Item>
      ))}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
)

export { MultiSelectDropdown }
