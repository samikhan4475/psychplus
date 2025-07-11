import { Box } from '@radix-ui/themes'
import { Waitlist } from '../../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'

const rowActions = [
  {
    id: 'insurance-list-row-action-delete',
    render: RowActionDelete,
  },
  {
    id: 'insurance-list-row-action-edit',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: Waitlist
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return (
    <Box className="items-center gap-3 space-x-2">
      {rowActions.map((action) => (
        <action.render key={action.id} row={row} />
      ))}
    </Box>
  )
}

export { ActionsCell }
