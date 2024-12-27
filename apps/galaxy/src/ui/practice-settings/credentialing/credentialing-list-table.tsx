'use client'

import {
  ColumnHeader,
  DataTable,
  TextCell
} from '@/components'
import { Box, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { Credentialing } from '../types'
import { ActionsCell } from './cells'
import { CredentialingHistoryDialog } from '../dialogs'

const columns: ColumnDef<Credentialing>[] =
  [
    {
      id: 'manager',
      header: ({ column }) => (
        <ColumnHeader
          label="Manager"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.manager}</TextCell>
    },
    {
      id: 'addedOn',
      header: ({ column }) => (
        <ColumnHeader
          label="Added on"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.addedOn}</TextCell>,
    },
    {
      id: 'status',
      header: ({ column }) => (
        <ColumnHeader
          label="Status"
          sortable
        />
      ),
      cell: ({ row }) => (
        <CredentialingHistoryDialog row={row} />
      ),
    },
    {
      id: 'alert',
      header: () => <ColumnHeader label="Alert" />,
      cell: ActionsCell,
      size: 40
    },
  ]

// Will be removed in next integration ticket
const dummyData = [
  {
    id: "1",
    manager: "ABC Medical Practice",
    addedOn: "08/16/24 03:00",
    
  },
  {
    id: "2",
    manager: "XYZ Family Care",
    addedOn: "08/16/24 03:00",
    
  },
  {
    id: "3",
    manager: "LMN Pediatrics",
    addedOn: "08/16/24 03:00",

  },
];
const CredentialingListTable = () => {
  return (
    <Box className='bg-white rounded'>
      <ScrollArea className='p-1 rounded-lg'>
        <DataTable
          data={dummyData}
          columns={columns}
          disablePagination
          sticky
          tableClass="bg-white w-[calc(100vw_-_620px)] [&_.rt-ScrollAreaRoot]:!overflow-visible rounded-lg"
        />
      </ScrollArea>
    </Box>
  )
}

export { CredentialingListTable }

