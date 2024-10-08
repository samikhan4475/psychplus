import { IconButton } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'


const SearchButton = ({disabled}: React.ComponentProps<typeof IconButton>) => {

  return (
    <IconButton size="1" highContrast type="submit" disabled={disabled}>
      <SearchIcon width={14} height={14} strokeWidth={2} />
    </IconButton>
  )
}

export { SearchButton }
