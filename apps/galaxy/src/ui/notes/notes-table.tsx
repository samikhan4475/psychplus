'use client'

import { useEffect } from 'react'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateTimeCell,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SharedCode } from '@/types'
import { formatDateTime } from '@/utils'
import { useStore } from './store'
import { PatientNotes } from './types'
import { getAuthorName } from './utils'

const getColumns = (codes: SharedCode[]) => {
  const getStateDisplayName = (codes: SharedCode[], state: string) => {
    return codes.find((element) => element.value === state)?.display
  }

  const columns: ColumnDef<PatientNotes>[] = [
    {
      id: 'date',
      accessorKey: 'date',
      header: () => <ColumnHeader label="Date" />,
      cell: ({ row }) => (
        <DateTimeCell className="whitespace-nowrap">
          {formatDateTime(row.original.metadata?.createdOn, false)}
        </DateTimeCell>
      ),
    },
    {
      id: 'authors',
      accessorKey: 'time',
      header: () => <ColumnHeader label="Author(s)" />,
      cell: ({ row }) => (
        <Box className="truncate">
          <TextCell>{getAuthorName(row.original)} </TextCell>
        </Box>
      ),
    },
    {
      id: 'visit-type',
      accessorKey: 'visitType',
      header: () => <ColumnHeader label="Visit Type" />,
      cell: ({ row }) => (
        <Box className="truncate">
          <TextCell>
            {`${row.original.visitType} | ${row.original.visitSequence} | ${row.original.visitMedium}`}{' '}
          </TextCell>
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
          <TextCell>{row.original.locationName}</TextCell>
        </Box>
      ),
    },
    {
      id: 'service',
      accessorKey: 'service',
      header: () => <ColumnHeader label="Service" />,
      cell: ({ row }) => (
        <Box className="truncate">
          <TextCell>{row.original.serviceOffered}</TextCell>
        </Box>
      ),
    },
    {
      id: 'state',
      accessorKey: 'state',
      header: () => <ColumnHeader label="State" />,
      cell: ({ row }) => (
        <Box className="truncate">
          <TextCell>
            {getStateDisplayName(codes, row.original.stateCode)}
          </TextCell>
        </Box>
      ),
    },
    {
      id: 'practice',
      accessorKey: 'practice',
      header: () => <ColumnHeader label="Practice" />,
      cell: ({ row }) => (
        <Box className="truncate">
          <TextCell>{row.original.practiceName}</TextCell>
        </Box>
      ),
    },
    {
      id: 'organization',
      accessorKey: 'organization',
      header: () => <ColumnHeader label="Organization" />,
      cell: ({ row }) => (
        <Box className="truncate">
          <TextCell>{row.original.organizationName}</TextCell>
        </Box>
      ),
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: () => <ColumnHeader label="Status" />,
      cell: ({ row }) => (
        <Box className="truncate">
          <TextCell>{row.original.noteStatus}</TextCell>
        </Box>
      ),
    },
  ]

  return columns
}

const NotesTable = ({ patientId }: { patientId: string }) => {
  const { data, fetch, loading, setSelectedRow } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetch: state.fetch,
    setSelectedRow: state.setSelectedRow,
  }))

  const codes = useCodesetCodes(CODESETS.UsStates)

  useEffect(() => {
    fetch({ patientId })
  }, [])

  const onRowSelect = (row: Row<PatientNotes>, table: Table<PatientNotes>) => {
    table.setRowSelection({ [row.id]: true })
    setSelectedRow(row.original)
  }

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea className="pb-2">
      <DataTable
        columns={getColumns(codes)}
        data={data?.notes || []}
        onRowClick={onRowSelect}
      />
    </ScrollArea>
  )
}

export { NotesTable }
