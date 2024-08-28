'use client'

import { Box } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@psychplus/ui/data-table'
import { TableCellLongText, TableCellText } from '@psychplus/ui/table-cell'
import { VisitTypeDiagnosisData } from '../types'
import TableActionCell from './table-action-cell'
import TableHeadingCell from './table-heading-cell'

const data: VisitTypeDiagnosisData[] = [...Array(30)].map(() => ({
  diagnosis:
    'F90.9 Attention-deficit hyperactivity disorder, F90.9 Attention-deficit hyperactivity disorder',
  visitType: 'New Pt, Outpatient Office Visit',
}))

const columns: ColumnDef<VisitTypeDiagnosisData>[] = [
  {
    id: 'visitType',
    header: () => <TableHeadingCell title={'Visit Type'} count={30} required />,
    cell: ({ row }) => <TableCellText text={row?.original?.visitType} />,
  },
  {
    id: 'delete-visitType',
    cell: ({ row }) => <TableActionCell row={row} />,
  },
  {
    id: 'diagnosis',
    header: () => <TableHeadingCell title={'Diagnosis'} count={30} />,
    cell: ({ row }) => (
      <TableCellLongText maxWidth={313} text={row?.original?.diagnosis} />
    ),
  },
  {
    id: 'delete-diagnosis',
    cell: ({ row }) => <TableActionCell row={row} />,
  },
]
const VisitTypeDiagnosisTable = () => {
  return (
    <Box className="col-span-3 max-h-[150px] w-full overflow-y-auto overflow-x-hidden rounded-2 border border-solid border-[#DDDDE3]">
      <DataTable
        tHeadClass="bg-[#EBF3FC]"
        columnCellClass="border border-[#CAD8FD] [box-shadow:none] font-medium"
        toBodyClass="[&>tr>td:last-child]:border-r-0 [&>tr>td:first-child]:border-l-0 [&>tr:last-child>td]:border-b-0"
        thClass="border border-[#CAD8FD] last:border-r-0 first:border-l-0 border-b-0 border-t-0"
        data={data}
        columns={columns}
      />
    </Box>
  )
}

export { VisitTypeDiagnosisTable }
