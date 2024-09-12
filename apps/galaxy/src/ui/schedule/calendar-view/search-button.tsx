import { IconButton } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'

const SearchButton = () => {
  return (
    <IconButton size="1" highContrast type="submit">
      <SearchIcon width={14} height={14} strokeWidth={2} />
    </IconButton>
  )
}

export { SearchButton }
