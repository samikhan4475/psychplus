import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Flex, TextField } from '@radix-ui/themes'

interface SearchInputProps {
  setInput: (value: string) => void
  placeholder?: string
  required?: boolean
}

const SearchInput = ({ setInput, placeholder, required }: SearchInputProps) => {
  return (
    <Flex direction={'row'} className="py-1">
      <TextField.Root
        size="1"
        variant="soft"
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        autoFocus
        className="bg-white flex-1 border-0 outline-none [&>*]:bg-transparent [&>*]:outline-none"
        required={required}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  )
}

export default SearchInput
