import { IconButton } from '@radix-ui/themes'
import { TableEditIcon } from '@/components/icons'

const RowActionEdit = () => {
  return (
    <IconButton variant="ghost">
      <TableEditIcon height={18} />
    </IconButton>
  )
}

export { RowActionEdit }
