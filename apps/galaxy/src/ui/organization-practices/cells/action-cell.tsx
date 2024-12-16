import { type Row } from '@tanstack/react-table'
import { RowActionEdit } from '../row-action-edit'
import { PracticeDetails } from '../types'

interface ActionsCellProps {
  row: Row<PracticeDetails>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionEdit row={row}/>
}

export { ActionsCell }
