import { type Row } from '@tanstack/react-table'
import { RowActionEdit } from '../row-action-edit'
import { VirtualAddressDetails } from '../types'

interface ActionsCellProps {
  row: Row<VirtualAddressDetails>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionEdit row={row}/>
}

export { ActionsCell }
