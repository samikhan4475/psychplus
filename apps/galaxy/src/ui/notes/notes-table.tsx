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
import { TableHeaderCheckboxCell, TableRowCheckboxCell } from './cells'
import { getDisplayByValue } from './create-note/utils'
import { options } from './status-select'
import { useStore } from './store'
import { PatientNotes } from './types'
import { getAuthorName } from './utils'

const getColumns = (
  codes: SharedCode[],
  noteTypeCodes: SharedCode[],
  isInboxNotes: boolean,
  serviceCodes: SharedCode[],
  noteTitleCodes: SharedCode[],
  onRowCheckBoxSelect: (
    row?: Row<PatientNotes>,
    table?: Table<PatientNotes>,
    isChecked?: boolean,
  ) => void,
) => {
  const getStateDisplayName = (codes: SharedCode[], state: string) => {
    return codes.find((element) => element.value === state)?.display
  }

  const columns: ColumnDef<PatientNotes>[] = [
    ...(isInboxNotes
      ? [
          {
            id: 'select',
            header: ({ table }: { table: Table<PatientNotes> }) => (
              <Flex className="justify-center">
                <TableHeaderCheckboxCell
                  checked={table.getIsAllPageRowsSelected()}
                  // onCheckedChange={table.toggleAllPageRowsSelected}
                  onCheckedChange={(isChecked) => {
                    table.toggleAllPageRowsSelected(isChecked)
                    if (!isChecked) {
                      onRowCheckBoxSelect(undefined, table, false) // Ensure empty array
                    } else {
                      onRowCheckBoxSelect(undefined, table, true)
                    }
                  }}
                />
              </Flex>
            ),
            cell: ({ row }: { row: Row<PatientNotes> }) => (
              <Box className="justify-center">
                <TableRowCheckboxCell
                  checked={row.getIsSelected()}
                  // onCheckedChange={row.toggleSelected}
                  onCheckedChange={(isChecked) => {
                    row.toggleSelected(isChecked)
                    onRowCheckBoxSelect(row, undefined, isChecked)
                  }}
                />
              </Box>
            ),
          },
        ]
      : []),

    {
      id: 'date',
      accessorKey: 'date',
      header: () => <ColumnHeader label="Date" />,
      cell: ({ row }) => {
        const { date } = convertToTimezone(
          row.original?.appointmentDateTime,
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
          row.original?.appointmentDateTime,
          row.original?.locationTimeZone,
        )
        return <DateTimeCell className="whitespace-nowrap">{time}</DateTimeCell>
      },
    },
    ...(isInboxNotes
      ? [
          {
            id: 'patientName',
            accessorKey: 'patientName',
            header: () => <ColumnHeader label="Patient Name" />,
            cell: ({ row }: { row: Row<PatientNotes> }) => {
              const patientName = `${row.original.patientName?.firstName} ${row.original.patientName?.lastName}`
              return (
                <DateTimeCell className="whitespace-nowrap">
                  {patientName ?? ''}
                </DateTimeCell>
              )
            },
          },
        ]
      : []),
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
      header: () => <ColumnHeader label="Visit Display" />,
      cell: ({ row }) => (
        <Box className="truncate">
          <TextCell>
            {`${row.original.visitType} | ${row.original.visitSequence} | ${row.original.visitMedium}`}{' '}
          </TextCell>
        </Box>
      ),
    },
    {
      id: 'note-title',
      accessorKey: 'noteTitleCode',
      header: () => <ColumnHeader label="Note Title" />,
      cell: ({ row }) => (
        <Box className="truncate">
          <TextCell>
            {getDisplayByValue(
              row.original?.noteTitleCode || '',
              noteTitleCodes,
            )}
          </TextCell>
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
          <TextCell>
            {getDisplayByValue(
              row.original?.serviceOffered || '',
              serviceCodes,
            )}
          </TextCell>
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
    ...(!isInboxNotes
      ? [
          {
            id: 'practice',
            accessorKey: 'practice',
            header: () => <ColumnHeader label="Practice" />,
            cell: ({ row }: { row: Row<PatientNotes> }) => (
              <Box className="truncate">
                <TextCell>{row.original.practiceName}</TextCell>
              </Box>
            ),
          },
          {
            id: 'organization',
            accessorKey: 'organization',
            header: () => <ColumnHeader label="Organization" />,
            cell: ({ row }: { row: Row<PatientNotes> }) => (
              <Box className="truncate">
                <TextCell>{row.original.organizationName}</TextCell>
              </Box>
            ),
          },
        ]
      : []),

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

const NotesTable = () => {
  const clickSpecificNoteFromPanelPermission = useHasPermission(
    'clickSpecificNoteFromPanelNotesPage',
  )

  const {
    data,
    loading,
    setSelectedRow,
    selectedRows,
    setSelectedRows,
    setIsErrorAlertOpen,
    setErrorMessage,
    isInboxNotes,
  } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    selectedRows: state.selectedRows,
    setSelectedRow: state.setSelectedRow,
    setSelectedRows: state.setSelectedRows,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    setErrorMessage: state.setErrorMessage,
    isInboxNotes: state.isInboxNotes,
  }))

  const codes = useCodesetCodes(CODESETS.UsStates)
  const noteTypeCodes = useCodesetCodes(CODESETS.NoteType)
  const noteTitleCodes = useCodesetCodes(CODESETS.NoteTitle)
  const serviceCodes = useCodesetCodes(CODESETS.ServicesOffered)

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
    setSelectedRows([row.original])
  }

  const onRowCheckBoxSelect = (
    row?: Row<PatientNotes>,
    table?: Table<PatientNotes>,
    isChecked?: boolean,
  ) => {
    if (table && isChecked) {
      setSelectedRows(data?.notes || [])
      setSelectedRow(undefined)
      return
    }

    if (table && !isChecked) {
      setSelectedRows([])
      return
    }

    if (row && isChecked) {
      setSelectedRow(undefined)
    }

    if (row) {
      const result = isChecked
        ? [...(selectedRows || []), row.original]
        : selectedRows?.filter((note) => note.id !== row.original.id) || []
      setSelectedRows(result)
    }
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
        columns={getColumns(
          codes,
          noteTypeCodes,
          isInboxNotes,
          serviceCodes,
          noteTitleCodes,
          onRowCheckBoxSelect,
        )}
        data={data?.notes || []}
        onRowClick={onRowSelect}
      />
    </ScrollArea>
  )
}

export { NotesTable }
