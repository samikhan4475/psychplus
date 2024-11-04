'use client'

import { useEffect } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { TableHeaderCheckboxCell, TableRowCheckboxCell } from './cells'
import { useStore } from './store'
import { PatientNotes } from './types'

const columns: ColumnDef<PatientNotes>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <TableHeaderCheckboxCell
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={table.toggleAllPageRowsSelected}
      />
    ),
    cell: ({ row }) => (
      <Box className="pl-[2px]">
        <TableRowCheckboxCell
          checked={row.getIsSelected()}
          onCheckedChange={row.toggleSelected}
        />
      </Box>
    ),
  },
  {
    id: 'date',
    accessorKey: 'date',
    header: () => <ColumnHeader label="Date" />,
    cell: ({ row }) => (
      <Flex className="gap-x-2">
        <TextCell>{row.original.date} </TextCell>
        <TextCell>{row.original.time} </TextCell>
      </Flex>
    ),
  },
  {
    id: 'authors',
    accessorKey: 'time',
    header: () => <ColumnHeader label="Author(s)" />,
    cell: ({ row }) => (
      <Box className="truncate">
        <TextCell>{row.original.authors} </TextCell>
      </Box>
    ),
  },
  {
    id: 'visit-type',
    accessorKey: 'visitType',
    header: () => <ColumnHeader label="Visit Type" />,
    cell: ({ row }) => (
      <Box className="truncate">
        <TextCell>{row.original.visitType} </TextCell>
      </Box>
    ),
  },
  {
    id: 'visit-title',
    accessorKey: 'visitTitle',
    header: () => <ColumnHeader label="Visit Title" />,
    cell: ({ row }) => (
      <Box className="truncate">
        <TextCell>{row.original.visitTitle}</TextCell>
      </Box>
    ),
  },
  {
    id: 'location',
    accessorKey: 'location',
    header: () => <ColumnHeader label="Location" />,
    cell: ({ row }) => (
      <Box className="truncate">
        <TextCell>{row.original.location}</TextCell>
      </Box>
    ),
  },
  {
    id: 'service',
    accessorKey: 'service',
    header: () => <ColumnHeader label="Service" />,
    cell: ({ row }) => (
      <Box className="truncate">
        <TextCell>{row.original.service}</TextCell>
      </Box>
    ),
  },
  {
    id: 'state',
    accessorKey: 'state',
    header: () => <ColumnHeader label="State" />,
    cell: ({ row }) => (
      <Box className="truncate">
        <TextCell>{row.original.state}</TextCell>
      </Box>
    ),
  },
  {
    id: 'practice',
    accessorKey: 'practice',
    header: () => <ColumnHeader label="Practice" />,
    cell: ({ row }) => (
      <Box className="truncate">
        <TextCell>{row.original.practice}</TextCell>
      </Box>
    ),
  },
  {
    id: 'organization',
    accessorKey: 'organization',
    header: () => <ColumnHeader label="Organization" />,
    cell: ({ row }) => (
      <Box className="truncate">
        <TextCell>{row.original.organization}</TextCell>
      </Box>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row }) => (
      <Box className="truncate">
        <TextCell>{row.original.status}</TextCell>
      </Box>
    ),
  },
]

const NotesTable = () => {
  const { data, fetch, loading, setSelectedRow } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetch: state.fetch,
    setSelectedRow: state.setSelectedRow,
  }))

  useEffect(() => {
    fetch()
  }, [])

  const onRowSelect = (row: Row<PatientNotes>, table: Table<PatientNotes>) => {
    table.setRowSelection({ [row.id]: true })
    setSelectedRow(row.id)
  }

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <Box className="min-w-[100%]">
      <DataTable
        columns={columns}
        data={data?.notes || []}
        onRowClick={onRowSelect}
      />
    </Box>
  )
}

export { NotesTable }
