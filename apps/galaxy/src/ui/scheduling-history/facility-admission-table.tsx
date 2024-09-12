'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { FacilityAdmission } from './types'

const columns: ColumnDef<FacilityAdmission>[] = [
  {
    accessorKey: 'dateTime',
    header: ({ column }) => <ColumnHeader column={column} label="Date/Time" />,
    cell: ({ row }) => <TextCell>{row?.original?.dateTime}</TextCell>,
  },
  {
    accessorKey: 'user',
    header: ({ column }) => <ColumnHeader column={column} label="User" />,
    cell: ({ row }) => <TextCell>{row?.original?.user}</TextCell>,
  },
  {
    accessorKey: 'admitDateTime',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Admit Date/Time" />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.admitDateTime}</TextCell>,
  },
  {
    accessorKey: 'dischargeDate',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Discharge Date" />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.dischargeDate}</TextCell>,
  },
  {
    accessorKey: 'admittingProvider',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Admitting Provider" />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.admittingProvider}</TextCell>,
  },
]
const FacilityAdmissionTable = () => {
  return <DataTable columns={columns} data={data} />
}

const data: FacilityAdmission[] = [...Array(6)].map(() => ({
  admitDateTime: '03/12/24 00:00',
  user: 'John Smith, MD',
  dateTime: '03/12/24 00:00',
  admittingProvider: 'John Smith, MD',
  dischargeDate: '03/12/24',
}))
export { FacilityAdmissionTable }
