import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Flex, TextField } from '@radix-ui/themes'

interface SearchInputProps {
  setInput: (value: string) => void
  placeholder?: string
  required?: boolean
}

const SearchInput = ({
  setInput,
  placeholder = 'Search...',
  required = false,
}: SearchInputProps) => (
  <Flex direction="row" p="2">
    <TextField.Root
      size="1"
      variant="soft"
      className="bg-white flex-1 border-0"
    >
      <TextField.Slot aria-label="Search">
        <MagnifyingGlassIcon width="16" height="16" />
      </TextField.Slot>
      <TextField.Input
        placeholder={placeholder}
        required={required}
        onChange={(e) => setInput(e.target.value)}
        className="bg-transparent"
      />
    </TextField.Root>
  </Flex>
)

export { SearchInput }
