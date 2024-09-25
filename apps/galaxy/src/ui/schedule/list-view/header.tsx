import { Flex } from '@radix-ui/themes'
import { TableFiltersGroup } from './table-filters-group'

const Header = () => {
  return (
    <Flex justify="end" className="px-5 py-1 flex-1" align="center">
      <TableFiltersGroup />
    </Flex>
  )
}

export { Header }
