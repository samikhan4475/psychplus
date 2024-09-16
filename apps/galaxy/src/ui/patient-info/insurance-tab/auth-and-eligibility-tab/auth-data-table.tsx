'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { AuthTable } from '../types'
import {
  AuthActionCell,
  AuthAttachCell,
  AuthStatusCell,
  AuthTypeCell,
} from './cells'

const columns: ColumnDef<AuthTable>[] = [
  {
    id: 'date',
    accessorKey: 'date',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Date"
        className="px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">{row.original.date} </TextCell>
    ),
  },
  {
    id: 'time',
    accessorKey: 'time',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Time"
        className=" px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">{row.original.time} </TextCell>
    ),
  },
  {
    id: 'staff',
    accessorKey: 'staff',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Staff"
        className=" px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">{row.original.staff} </TextCell>
    ),
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Type"
        className=" px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => <AuthTypeCell row={row} />,
  },
  {
    id: 'cptCode',
    accessorKey: 'cptCode',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="CPT Code"
        className=" px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.cptCode}
      </TextCell>
    ),
  },
  {
    id: 'start',
    accessorKey: 'start',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Start"
        className=" px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">{row.original.start}</TextCell>
    ),
  },
  {
    id: 'end',
    accessorKey: 'end',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="End"
        className=" px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">{row.original.end}</TextCell>
    ),
  },
  {
    id: 'visits',
    accessorKey: 'visits',
    header: ({ column }) => (
      <ColumnHeader
        label="Visits"
        column={column}
        className="px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">{row.original.visits}</TextCell>
    ),
  },
  {
    id: 'remaining',
    accessorKey: 'remaining',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Remaining"
        className="px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.remaining}
      </TextCell>
    ),
  },
  {
    id: 'provider',
    accessorKey: 'provider',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Provider"
        className="px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.provider}
      </TextCell>
    ),
  },
  {
    id: 'pos',
    accessorKey: 'pos',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="POS"
        className="px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">{row.original.pos}</TextCell>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Status"
        className="px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => <AuthStatusCell row={row} />,
  },
  {
    id: 'auth',
    accessorKey: 'auth',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Auth #"
        className="px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">{row.original.auth}</TextCell>
    ),
  },
  {
    id: 'attach',
    accessorKey: 'attach',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Attach"
        className=" px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => <AuthAttachCell row={row} />,
  },
  {
    id: 'action',
    accessorKey: 'action',
    header: () => (
      <ColumnHeader label="Action" className=" !m-auto px-1 py-0.5 !text-1 " />
    ),
    cell: ({ row }) => <AuthActionCell />,
  },
]
const data: AuthTable[] = [...Array(100)].map((_, ind) => ({
  date: '03/12/24',
  time: '00:00',
  staff: 'John Smith',
  type: 'Consultation',
  cptCode: 'F1245',
  start: '03/12/24',
  end: '03/12/24',
  visits: '20',
  remaining: '20',
  provider: 'John smith',
  pos: '---',
  status: 'Completed',
  auth: '12334444',
  attach: ind % 2 === 0 ? 'profile.pdf' : '',
}))

const AuthDataTable = () => {
  return (
    <ScrollArea className="h-32">
      <Box className="bg-white min-w-max">
        <DataTable columns={columns} data={data} sticky />
      </Box>
    </ScrollArea>
  )
}

export { AuthDataTable }
