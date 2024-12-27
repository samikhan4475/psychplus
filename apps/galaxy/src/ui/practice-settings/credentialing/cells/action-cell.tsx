import { type Row } from '@tanstack/react-table'
import { RowActionEdit } from '../row-action-edit'
import { Credentialing } from '../../types'

interface ActionsCellProps {
  row: Row<Credentialing>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionEdit row={row}/>
}

export { ActionsCell }
