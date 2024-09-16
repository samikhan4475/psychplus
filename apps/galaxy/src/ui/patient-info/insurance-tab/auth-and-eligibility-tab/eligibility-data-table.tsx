'use client'

import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { EligibilityTable } from '../types'
import { EligibilityActionCell } from './cells'
import { EligibilityHeader } from './eligibility-header'

const columns: ColumnDef<EligibilityTable>[] = [
  {
    id: 'date',
    accessorKey: 'date',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Date"
        className=" px-1 py-0.5 !text-1"
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
    id: 'payer',
    accessorKey: 'payer',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Payer"
        className=" px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">{row.original.payer} </TextCell>
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
    id: 'serviceFrom',
    accessorKey: 'serviceFrom',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Service From"
        className=" px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.serviceFrom}
      </TextCell>
    ),
  },
  {
    id: 'serviceTo',
    accessorKey: 'serviceTo',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Service To"
        className=" px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.serviceTo}
      </TextCell>
    ),
  },
  {
    id: 'action',
    accessorKey: 'action',
    header: () => (
      <ColumnHeader label="Action" className=" px-1 py-0.5 !text-1" />
    ),
    cell: ({ row }) => <EligibilityActionCell />,
  },
]
const data: EligibilityTable[] = [...Array(100)].map((_, ind) => ({
  date: '03/12/24',
  time: '00:00',
  payer: 'Aetna Insurance',
  provider: 'Rober Degenrio',
  serviceFrom: '12/11/2024',
  serviceTo: '12/11/2024',
}))

const EligibilityDataTable = () => {
  return (
    <Flex direction="column" gap="1">
      <EligibilityHeader />
      <ScrollArea className="h-24">
        <Box className="bg-white min-w-max">
          <DataTable columns={columns} data={data} sticky />
        </Box>
      </ScrollArea>
    </Flex>
  )
}

export { EligibilityDataTable }
