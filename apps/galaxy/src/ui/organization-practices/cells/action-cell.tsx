import { type Row } from '@tanstack/react-table'
import { Practice } from '@/ui/organization-practice/types'
import { RowActionEdit } from '../row-action-edit'

interface ActionsCellProps {
  row: Row<Practice>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionEdit row={row} />
}

export { ActionsCell }
