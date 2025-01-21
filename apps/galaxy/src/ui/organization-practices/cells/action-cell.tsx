import { type Row } from '@tanstack/react-table'
import { RowActionEdit } from '../row-action-edit'
import { PracticeDetails } from '../types'
import { Practice } from '@/ui/organization-practice/types'

interface ActionsCellProps {
  row: Row<Practice>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionEdit row={row}/>
}

export { ActionsCell }
