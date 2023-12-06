import { Box, Flex } from '@radix-ui/themes'
import { FilterForm } from '.'

const FiltersContainer = () => (
  <Box>
    <Flex direction="row" gap="2">
      <FilterForm />
    </Flex>
  </Box>
)

export { FiltersContainer }
