'use client'

import { ColumnHeader, TextCell } from '@/components'
import { formatDate, formatDateTime } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { Users } from './types'

export const columns: ColumnDef<Users>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <ColumnHeader column={column} label="Name" />,
    cell: ({ row }) => <TextCell>{row.original.name}</TextCell>,
  },
  {
    id: 'age',
    accessorKey: 'age',
    header: ({ column }) => <ColumnHeader column={column} label="Age" />,
    cell: ({ row }) => <TextCell>{row.original.age}</TextCell>,
    maxSize: 50
  },
  {
    id: 'gen',
    accessorKey: 'gen',
    header: ({ column }) => <ColumnHeader column={column} label="Gen." />,
    cell: ({ row }) => <TextCell>{row.original.gen}</TextCell>,
    maxSize: 50
  },
  {
    id: 'dob',
    accessorKey: 'dob',
    header: ({ column }) => <ColumnHeader column={column} label="DOB" />,
    cell: ({ row }) => (
      <TextCell>{row.original.dob ? formatDate(row.original.dob) : 'N/A'}</TextCell>
    ),
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: ({ column }) => <ColumnHeader column={column} label="Phone" />,
    cell: ({ row }) => <TextCell>{row.original.phone}</TextCell>,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => <ColumnHeader column={column} label="Email" />,
    cell: ({ row }) => <TextCell>{row.original.email}</TextCell>,
  },
  {
    id: 'ss',
    accessorKey: 'ss',
    header: ({ column }) => <ColumnHeader column={column} label="SS" />,
    cell: ({ row }) => <TextCell>{row.original.ss}</TextCell>,
  },
  {
    id: 'city',
    accessorKey: 'city',
    header: ({ column }) => <ColumnHeader column={column} label="City" />,
    cell: ({ row }) => <TextCell>{row.original.city}</TextCell>,
  },
  {
    id: 'residenceState',
    accessorKey: 'residenceState',
    header: ({ column }) => <ColumnHeader column={column} label="Residence (State)" />,
    cell: ({ row }) => <TextCell>{row.original.residenceState}</TextCell>,
  },
  {
    id: 'zip',
    accessorKey: 'zip',
    header: ({ column }) => <ColumnHeader column={column} label="Zip" />,
    cell: ({ row }) => <TextCell>{row.original.zip}</TextCell>,
  },
  {
    id: 'guardian',
    accessorKey: 'guardian',
    header: ({ column }) => <ColumnHeader column={column} label="Guardian" />,
    cell: ({ row }) => <TextCell>{row.original.guardian}</TextCell>,
  },
  {
    id: 'ptStatus',
    accessorKey: 'ptStatus',
    header: ({ column }) => <ColumnHeader column={column} label="Pt Status" />,
    cell: ({ row }) => <TextCell>{row.original.ptStatus}</TextCell>,
  },
  {
    id: 'ptVerification',
    accessorKey: 'ptVerification',
    header: ({ column }) => <ColumnHeader column={column} label="Pt Verification" />,
    cell: ({ row }) => <TextCell>{row.original.ptVerification}</TextCell>,
  },
  {
    id: 'contactInitiated',
    accessorKey: 'contactInitiated',
    header: ({ column }) => <ColumnHeader column={column} label="Contact Initiated" />,
    cell: ({ row }) => <TextCell>{row.original.contactInitiated}</TextCell>,
  },
  {
    id: 'updatedDate',
    accessorKey: 'updatedDate',
    header: ({ column }) => <ColumnHeader column={column} label="Updated Date/Time" />,
    cell: ({ row }) => (
      <TextCell>{row.original.updatedDate ? formatDateTime(row.original.updatedDate) : 'N/A'}</TextCell>
    ),
  },
  {
    id: 'updatedBy',
    accessorKey: 'updatedBy',
    header: ({ column }) => <ColumnHeader column={column} label="Updated By" />,
    cell: ({ row }) => <TextCell>{row.original.updatedBy}</TextCell>,
  },
]
