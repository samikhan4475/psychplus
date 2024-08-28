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
  groups: 'Therapy 100, Robert Smith, MD',
  units: '132, Robert Smith, MD',
  rooms: '320-A',
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
      <TableCellLongText maxWidth={300} text={row?.original?.diagnosis} />
    ),
  },
  {
    id: 'delete-diagnosis',
    cell: ({ row }) => <TableActionCell row={row} />,
  },
  {
    id: 'units',
    header: () => <TableHeadingCell title={'Units'} count={30} />,
    cell: ({ row }) => <TableCellText text={row?.original?.units} />,
  },
  {
    id: 'delete-units',
    cell: ({ row }) => <TableActionCell row={row} />,
  },
  {
    id: 'groups',
    header: () => <TableHeadingCell title={'Groups'} count={30} />,
    cell: ({ row }) => <TableCellText text={row?.original?.groups} />,
  },
  {
    id: 'delete-groups',
    cell: ({ row }) => <TableActionCell row={row} />,
  },
  {
    id: 'rooms',
    header: () => <TableHeadingCell title={'Rooms'} count={30} />,
    cell: ({ row }) => <TableCellText text={row?.original?.rooms} />,
  },
  {
    id: 'delete-rooms',
    cell: ({ row }) => <TableActionCell row={row} />,
  },
]
const VisitTypeDiagnosisTable = () => {
  return (
    <Box className="col-span-3 max-h-[240px] w-full overflow-y-auto overflow-x-hidden rounded-2 border border-solid border-[#DDDDE3]">
      <DataTable
        tHeadClass="bg-[#EBF3FC] sticky top-0 bg-white z-20"
        columnCellClass="border border-[#CAD8FD] [box-shadow:none] font-medium"
        toBodyClass="[&>tr>td:last-child]:border-r-0 [&>tr>td:first-child]:border-l-0 [&>tr:last-child>td]:border-b-0"
        thClass="border border-[#CAD8FD] last:border-r-0 first:border-l-0 border-b-0 border-t-0 sticky top-0 bg-white z-20"
        data={data}
        columns={columns}
      />
    </Box>
  )
}

export { VisitTypeDiagnosisTable }
