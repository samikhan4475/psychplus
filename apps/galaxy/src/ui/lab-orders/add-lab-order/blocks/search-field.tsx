import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Flex, TextField } from '@radix-ui/themes'

const SearchField = ({
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <Flex
      align="center"
      className="bg-white relative h-[48px] w-[100%] rounded-2"
    >
      <MagnifyingGlassIcon
        className="text-pp-gray-3 absolute left-2 "
        width="18px"
        height="18px"
      />
      <TextField.Root
        size="1"
        placeholder="Search"
        className="w-full pl-6"
        onChange={handleChange}
      />
    </Flex>
  )
}

export { SearchField }
