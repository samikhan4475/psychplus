import { ChangeEvent } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Flex } from '@radix-ui/themes'
import { TextField } from '@psychplus/ui/text-field'

const SearchForm = ({ onSearch }: { onSearch: (data: string) => void }) => (
  <Flex>
    <Box mb="4" mt="4" px="2">
      <TextField.Root>
        <TextField.Input
          placeholder={'Search'}
          onChange={(e) => onSearch(e.target.value)}
        />
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  </Flex>
)

export { SearchForm }
