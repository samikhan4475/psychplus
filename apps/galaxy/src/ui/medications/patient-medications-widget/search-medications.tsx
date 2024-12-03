import { Box, Flex, TextField } from '@radix-ui/themes'
import { SearchButton } from '@/ui/schedule/shared'

const SearchMedications = () => {
  return (
    <Flex align="center" gap="2">
      <Box className="relative">
        <Flex
          className="
            'w-full ml-4 flex-wrap overflow-y-auto rounded-2 border border-gray-7"
          align="center"
          gap="1"
          pl="1"
        >
          <TextField.Root
            size="1"
            className="min-w-14 !outline-white w-[300px] flex-1 border-0 [box-shadow:none]"
            placeholder="Search Medications"
            onChange={(e) => {
              //Todo: Will add search in phase 2
            }}
          />
        </Flex>
      </Box>
      <SearchButton />
    </Flex>
  )
}

export { SearchMedications }
