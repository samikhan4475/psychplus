'use client'

import { ColumnHeader, TextCell } from '@/components'
import { formatDate, formatDateTime } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { CollapseCell, ContactMadeSelectCell, PracticeSelectCell } from './cells'
import { RowActionDelete } from './row-action-delete'
import { Users } from './types'

const columns: ColumnDef<Users>[] = [
  {
    id: 'hx',
    header: () => <ColumnHeader label="HX" />,
    cell: CollapseCell,
    maxSize: 50,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Name" className="!text-black justify-center !font-medium text-center align-middle"/>
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">{row.original?.name || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'ptStatus',
    accessorKey: 'ptStatus',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Pt Status" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original?.ptStatus || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'age',
    accessorKey: 'age',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Age" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.age || 'N/A'}</TextCell>,
    maxSize: 50,
  },
  {
    id: 'gen',
    accessorKey: 'gen',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Gen." />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original?.gen || 'N/A'}</TextCell>
    ),
    maxSize: 50
  },
  {
    id: 'verify',
    header: ({ column }) => <ColumnHeader column={column} label="Verify" />,
    columns: [
      {
        id: 'p',
        header: ({ column }) => (
          <ColumnHeader
            label="P"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.p}</TextCell>,
      },
      {
        id: 'pElapsed',
        header: ({ column }) => (
          <ColumnHeader
            label="P-Elapsed"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.pElapsed}</TextCell>,
      },
      {
        id: 'i',
        size: 50,
        header: ({ column }) => (
          <ColumnHeader
            label="I"
            column={column}
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.i}</TextCell>,
      },
      {
        id: 'iElapsed',
        header: ({ column }) => (
          <ColumnHeader
            label="I-Elapsed"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.iElapsed}</TextCell>,
      },
      {
        id: 'p&c',
        header: ({ column }) => (
          <ColumnHeader
            label="P&C"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.pc}</TextCell>,
      },
      {
        id: 'cc',
        header: ({ column }) => (
          <ColumnHeader
            label="CC"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.cc}</TextCell>,
      },
    ],
  },
  {
    id: 'mrn',
    accessorKey: 'mrn',
    header: ({ column }) => (
      <ColumnHeader column={column} label="MRN" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original?.mrn || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'dob',
    accessorKey: 'dob',
    header: ({ column }) => (
      <ColumnHeader column={column} label="DOB" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original?.dob ? formatDate(row.original.dob) : 'N/A'}</TextCell>
    ),
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Phone" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original?.phone || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Email" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original?.email || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'ss',
    accessorKey: 'ss',
    header: () => <ColumnHeader label="SS" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.ss || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'residenceState',
    accessorKey: 'residenceState',
    header: () => <ColumnHeader label="Residence (State)" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.residenceState || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'city',
    accessorKey: 'city',
    header: () => <ColumnHeader label="City" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.city || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'zip',
    accessorKey: 'zip',
    header: () => <ColumnHeader label="Zip" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.zip || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'guardian',
    accessorKey: 'guardian',
    header: () => <ColumnHeader label="Guardian" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.guardian || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'organization',
    accessorKey: 'organization',
    header: () => <ColumnHeader label="Organization" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.organization || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'practice',
    accessorKey: 'practice',
    header: () => <ColumnHeader label="Practice" />,
    cell: ({ row }) => (<PracticeSelectCell />),
  },
  {
    id: 'insurance',
    accessorKey: 'insurance',
    header: () => <ColumnHeader label="Insurance" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.insurance || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'userCreated',
    accessorKey: 'userCreated',
    header: () => <ColumnHeader label="User Created" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.userCreated || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'createdBy',
    accessorKey: 'createdBy',
    header: () => <ColumnHeader label="Created By" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.createdBy || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'nextVisit',
    accessorKey: 'nextVisit',
    header: () => <ColumnHeader label="Next Visit" />,
    cell: ({ row }) => (
      <TextCell>
        {row.original?.nextVisit ? formatDateTime(row.original.nextVisit) : 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'visitHx',
    accessorKey: 'visitHx',
    header: () => <ColumnHeader label="Visit Hx" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.visitHx || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'contactInitiated',
    accessorKey: 'contactInitiated',
    header: () => <ColumnHeader label="Contact Initiated" />,
    cell: ({ row }) => (<ContactMadeSelectCell row={row} />),
  },
  {
    id: 'actions',
    header: () => <ColumnHeader label="Action" />,
    cell: ({ row }) => <RowActionDelete row={row} />,
    size: 50,
  },
]

export { columns }
