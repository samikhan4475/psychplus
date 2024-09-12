import { Row } from '@tanstack/react-table'
import { LabOrder } from '../types'
import { TableCellLongText } from './table-cell-contact'

const LabOrderNumberCell = ({
  row,
  patientId,
  appointmentId,
}: {
  row: Row<LabOrder>
  patientId: string | null
  appointmentId: string | null
}) => {
  const labOrderNumber = row.original.labOrderNumber || '-'
  return (
    <TableCellLongText
      isLight={true}
      maxWidth={80}
      row={row.original}
      patientId={patientId}
      appointmentId={appointmentId}
      text={labOrderNumber.toString()}
    />
  )
}

export { LabOrderNumberCell }
