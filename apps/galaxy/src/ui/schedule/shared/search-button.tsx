import { IconButton } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'

interface SearchButtonProps extends React.ComponentProps<typeof IconButton> {}

const SearchButton = ({ disabled, onClick }: SearchButtonProps) => {
  return (
    <IconButton
      size="1"
      highContrast
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <SearchIcon width={14} height={14} strokeWidth={2} />
    </IconButton>
  )
}

export { SearchButton }
