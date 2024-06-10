import { Button } from '@psychplus/ui/button'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'

interface MultiSelectOption {
  value: string
  label: string
}

interface Props {
  options: MultiSelectOption[]
  placeholder?: string
  onChange: (selectedValues: string) => void
}

const MultiSelectDropdown: React.FC<Props> = ({
  options,
  onChange,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          color="gray" variant="outline"
          className="flex items-center justify-around"
        >
          ...
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {options.map((item) => (
          <DropdownMenu.Item
            key={item.value}
            onSelect={(event: Event) => {
              if (event.currentTarget) {
                onChange((event.currentTarget as HTMLSelectElement).innerText)
              }
            }}
          >
            {item.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { MultiSelectDropdown, type MultiSelectOption }
