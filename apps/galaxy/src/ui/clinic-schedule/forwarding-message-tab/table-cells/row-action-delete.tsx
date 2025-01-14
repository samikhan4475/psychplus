import { IconButton } from '@radix-ui/themes'
import { CloseIcon } from '@/components/icons'

const RowActionDelete = () => {
  return (
    <IconButton variant="ghost">
      <CloseIcon height={18} />
    </IconButton>
  )
}

export { RowActionDelete }
