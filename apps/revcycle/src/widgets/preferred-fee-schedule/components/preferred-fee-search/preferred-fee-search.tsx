import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Flex } from '@radix-ui/themes'
import { TextField } from '@psychplus/ui/text-field'

const PreferredFeeSearchForm = ({
  onPreferredFeeSearch,
}: {
  onPreferredFeeSearch?: (cptCode: string) => void
}) => (
  <Flex>
    <Box mb="4" mt="4" px="2">
      <TextField.Root>
        <TextField.Root
          placeholder={'Search'}
          onChange={(e) => onPreferredFeeSearch?.(e.target.value)}
        />
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  </Flex>
)

export { PreferredFeeSearchForm }
