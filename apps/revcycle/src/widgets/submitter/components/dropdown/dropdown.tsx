import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
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
          <IconButton size="1" variant="ghost" mr="1">
            <DotsHorizontalIcon height={16} width={16} />
          </IconButton>
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
