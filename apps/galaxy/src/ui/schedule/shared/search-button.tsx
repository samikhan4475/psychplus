import { IconButton } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'

const SearchButton = (props: React.ComponentProps<typeof IconButton>) => {
  const { onClick, type = onClick ? 'button' : 'submit', size = "1", ...rest } = props

  return (
    <IconButton size={size} highContrast type={type} onClick={onClick} {...rest}>
      <SearchIcon width={14} height={14} strokeWidth={2} />
    </IconButton>
  )
}

export { SearchButton }
