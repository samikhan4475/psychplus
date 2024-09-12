import { Row } from '@tanstack/react-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { LabOrder } from '../types'

const OrderingLabNameCell = ({ row }: { row: Row<LabOrder> }) => {
  const name = row.original?.orderingLab?.name
  return <TableCellText isLight={true} text={name} />
}

export { OrderingLabNameCell }
