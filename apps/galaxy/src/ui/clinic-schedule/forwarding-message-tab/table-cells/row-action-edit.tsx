import { IconButton } from '@radix-ui/themes'
import { TableEditIcon } from '@/components/icons'
import { EditForwardingMessageDialog } from '../dialogs'

const RowActionEdit = () => {
  return (
    <EditForwardingMessageDialog>
      <IconButton variant="ghost">
        <TableEditIcon height={18} />
      </IconButton>
    </EditForwardingMessageDialog>
  )
}

export { RowActionEdit }
