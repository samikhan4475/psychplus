import { type Row } from '@tanstack/react-table'
import { RowActionEdit } from '../row-action-edit'
import { Practice } from '../types'

interface ActionsCellProps {
  row: Row<Practice>
  userId: string
}

const ActionsCell = ({ row, userId }: ActionsCellProps) => {
  return <RowActionEdit row={row} userId={userId} />
}

export { ActionsCell }
