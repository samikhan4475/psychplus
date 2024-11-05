import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { ServerSearchSelectID } from '../../types'

interface SearchResultsProps<T extends ServerSearchSelectID> {
  results: T[] | undefined
  renderItem: (item: T) => React.ReactNode
  onItemSelect: (item: T) => void
}

const SearchResults = <T extends ServerSearchSelectID>({
  results,
  renderItem,
  onItemSelect,
}: SearchResultsProps<T>) => {
  return results?.length ? (
    <Flex direction="column" py="1" gap="1">
      <ScrollArea scrollbars="vertical" className="max-h-[150px]">
        {results.map((item, idx) => (
          <Box
            key={item.id ? item.id : idx}
            onClick={() => onItemSelect(item)}
            className="cursor-pointer"
          >
            {renderItem(item)}
          </Box>
        ))}
      </ScrollArea>
    </Flex>
  ) : null
}

export { SearchResults }
