import { IconButton } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'

const SearchButton = (props: React.ComponentProps<typeof IconButton>) => {
  const { onClick, type = onClick ? 'button' : 'submit', ...rest } = props

  return (
    <IconButton size="1" highContrast type={type} onClick={onClick} {...rest}>
      <SearchIcon width={14} height={14} strokeWidth={2} />
    </IconButton>
  )
}

export { SearchButton }
