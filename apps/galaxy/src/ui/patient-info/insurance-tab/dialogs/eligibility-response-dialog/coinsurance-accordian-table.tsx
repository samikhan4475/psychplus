'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { EligibilityResponseTable } from '../../types'

const columns: ColumnDef<EligibilityResponseTable>[] = [
  {
    id: 'inNetwork',
    accessorKey: 'inNetwork',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="In Network"
        className="px-1 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 !text-1">{row.original.inNetwork}</TextCell>
    ),
  },
  {
    id: 'coverageLevel',
    accessorKey: 'coverageLevel',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Coverage Level"
        className="px-1 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 !text-1">{row.original.coverageLevel}</TextCell>
    ),
  },
  {
    id: 'amount',
    accessorKey: 'amount',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Amount" className="px-1 !text-1" />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 !text-1">{row.original.amount}</TextCell>
    ),
  },
  {
    id: 'message',
    accessorKey: 'message',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Message" className="px-1 !text-1" />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 !text-1">{row.original.message}</TextCell>
    ),
  },
  {
    id: 'facilityType',
    accessorKey: 'facilityType',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Facility Type"
        className="px-1 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 !text-1">{row.original.facilityType}</TextCell>
    ),
  },
]

const data: EligibilityResponseTable[] = [...Array(100)].map((_, ind) => ({
  inNetwork: 'Not Applicable',
  coverageLevel: 'Aetna Insurance',
  amount: '$30',
  message: 'Amount exceeds limit',
  facilityType: '---',
}))
const CoInsuranceAccordianTable = () => {
  return (
    <ScrollArea className="h-32">
      <Box className="bg-white min-w-[100%] rounded-1 p-1">
        <DataTable columns={columns} data={data} />
      </Box>
    </ScrollArea>
  )
}

export { CoInsuranceAccordianTable }
