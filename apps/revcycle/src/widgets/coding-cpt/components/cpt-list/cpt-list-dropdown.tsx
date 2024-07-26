import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { Box, Flex, IconButton } from '@radix-ui/themes'
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

const MultiSelectDropdown: React.FC<Props> = ({ options, onChange }) => {
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
            {item.label === 'Edit' ? (
              <Flex align="center" justify={'between'}>
                <Pencil1Icon className="h-5 w-5 mr-[2px]" />
                <span className="text-sm">{item.label}</span>
              </Flex>
            ) : (
              <>
                <TrashIcon className="h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </>
            )}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { MultiSelectDropdown, type MultiSelectOption }
