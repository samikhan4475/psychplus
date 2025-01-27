import { Box, ScrollArea } from '@radix-ui/themes'
import { ServerSearchSelectID } from './types'

interface SearchResultsProps<T extends ServerSearchSelectID> {
  results?: T[]
  renderItem: (item: T) => React.ReactNode
  onItemSelect: (item: T) => void
}

const SearchResults = <T extends ServerSearchSelectID>({
  results = [],
  renderItem,
  onItemSelect,
}: SearchResultsProps<T>) => (
  <ScrollArea scrollbars="vertical" className="max-h-[180px]">
    {results.map((item, idx) => (
      <Box
        key={item.id ?? idx}
        onClick={() => onItemSelect(item)}
        className="cursor-pointer"
      >
        {renderItem(item)}
      </Box>
    ))}
  </ScrollArea>
)

export { SearchResults }
