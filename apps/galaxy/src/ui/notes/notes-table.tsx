'use client'

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
import { useCodesetCodes, useHasPermission } from '@/hooks'
import { SharedCode } from '@/types'
import { getSlashedDateString } from '@/utils'
import { convertToTimezone } from '../visit/utils'
import { getDisplayByValue } from './create-note/utils'
import { options } from './status-select'
import { useStore } from './store'
import { PatientNotes } from './types'
import { getAuthorName } from './utils'

const getColumns = (codes: SharedCode[], noteTypeCodes: SharedCode[]) => {
  const getStateDisplayName = (codes: SharedCode[], state: string) => {
    return codes.find((element) => element.value === state)?.display
  }

  const columns: ColumnDef<PatientNotes>[] = [
    {
      id: 'date',
      accessorKey: 'date',
      header: () => <ColumnHeader label="Date" />,
      cell: ({ row }) => {
        const { date } = convertToTimezone(
          row.original?.signedDate,
          row.original?.locationTimeZone,
        )
        return (
          <DateTimeCell className="whitespace-nowrap">
            {row.original.metadata?.createdOn &&
              getSlashedDateString(date ? date : '')}
          </DateTimeCell>
        )
      },
    },
    {
      id: 'time',
      accessorKey: 'time',
      header: () => <ColumnHeader label="Time" />,
      cell: ({ row }) => {
        const { time } = convertToTimezone(
          row.original?.signedDate,
          row.original?.locationTimeZone,
        )
        return <DateTimeCell className="whitespace-nowrap">{time}</DateTimeCell>
      },
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
      id: 'noteType',
      accessorKey: 'noteType',
      header: () => <ColumnHeader label="Note Type" />,
      cell: ({ row }) => (
        <Box className="truncate">
          <TextCell>
            {getDisplayByValue(row.original?.noteTypeCode || '', noteTypeCodes)}
          </TextCell>
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
      header: () => <ColumnHeader label="Note Status" />,
      cell: ({ row }) => {
        const status = options.find(
          (option) => option.value === row.original.noteStatus,
        )?.label
        return (
          <Box className="truncate">
            <TextCell>{status ?? ''}</TextCell>
          </Box>
        )
      },
    },
  ]

  return columns
}

const NotesTable = ({ patientId }: { patientId: string }) => {
  const clickSpecificNoteFromPanelPermission = useHasPermission(
    'clickSpecificNoteFromPanelNotesPage',
  )

  const {
    data,
    loading,
    setSelectedRow,
    setIsErrorAlertOpen,
    setErrorMessage,
  } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    setSelectedRow: state.setSelectedRow,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    setErrorMessage: state.setErrorMessage,
  }))

  const codes = useCodesetCodes(CODESETS.UsStates)
  const noteTypeCodes = useCodesetCodes(CODESETS.NoteType)

  const onRowSelect = (row: Row<PatientNotes>, table: Table<PatientNotes>) => {
    table.setRowSelection({ [row.id]: true })

    if (!clickSpecificNoteFromPanelPermission) {
      setIsErrorAlertOpen(true)
      setErrorMessage(
        'You do not have permission to view it’s details. Please contact your supervisor if you need any further assistance.',
      )
      return
    }
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
        columns={getColumns(codes, noteTypeCodes)}
        data={data?.notes || []}
        onRowClick={onRowSelect}
      />
    </ScrollArea>
  )
}

export { NotesTable }
