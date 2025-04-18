import { type Row } from '@tanstack/react-table'
import { Role } from '@/types'
import { RowActionDeletePractice } from '../row-action-delete'

interface ActionsCellProps {
  row: Row<Role>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionDeletePractice record={row.original} />
}

export { ActionsCell }
