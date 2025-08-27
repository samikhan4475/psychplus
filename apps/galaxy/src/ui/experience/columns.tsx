'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { Experience, Sort } from '@/types'
import { formatDateTime, getSlashedPaddedDateString, getSortDir } from '@/utils'
import { ActionCell, ReasonSelectCell } from './cells'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Experience>[] => {
  return [
    {
      id: 'appointmentDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Date/Time"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.appointmentDateTime
            ? formatDateTime(row.original.appointmentDateTime, false)
            : ''}
        </TextCell>
      ),
    },
    {
      id: 'patientFirstName',
      header: ({ column }) => (
        <ColumnHeader
          label="First Name"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.patientName.firstName}</TextCell>
      ),
    },
    {
      id: 'patientLastName',
      header: ({ column }) => (
        <ColumnHeader
          label="Last Name"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.patientName.lastName}</TextCell>
      ),
    },
    {
      id: 'dateOfBirth',
      header: ({ column }) => (
        <ColumnHeader
          label="Age"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.age ?? ''}</TextCell>,
    },
    {
      id: 'gender',
      header: ({ column }) => (
        <ColumnHeader
          label="Gender"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.gender}</TextCell>,
    },
    {
      id: 'dateOfBirth',
      header: ({ column }) => (
        <ColumnHeader
          label="DOB"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.dateOfBirth
            ? getSlashedPaddedDateString(row.original.dateOfBirth, true)
            : ''}
        </TextCell>
      ),
    },
    {
      id: 'locationName',
      header: ({ column }) => (
        <ColumnHeader
          label="Location"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: (row) => <TextCell>{row.row.original.locationName}</TextCell>,
    },
    {
      id: 'visitType',
      header: ({ column }) => (
        <ColumnHeader
          label="Visit Type"
          column={column}
          className="w-[110px]"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.visitType ?? ''}</TextCell>,
    },
    {
      id: 'primaryInsuranceName',
      header: ({ column }) => (
        <ColumnHeader label="Primary/Secondary Insurance" column={column} />
      ),
      cell: ({ row }) => <TextCell>{row.original.insuranceName}</TextCell>,
    },
    {
      id: 'rating',
      header: ({ column }) => (
        <ColumnHeader
          label="Rating"
          column={column}
          className="w-0"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.rating}</TextCell>,
    },
    {
      id: 'reason',
      header: ({ column }) => (
        <ColumnHeader
          label="Reason"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ReasonSelectCell,
    },
    {
      id: 'staffComments',
      header: ({ column }) => (
        <ColumnHeader label="Staff Comments" column={column} />
      ),
      cell: ({ row }) => (
        <LongTextCell className="!max-w-32">
          {row.original.staffComments ?? ''}
        </LongTextCell>
      ),
      size: 50,
    },
    {
      id: 'action',
      header: () => <ColumnHeader label="Actions" />,
      cell: ActionCell,
      size: 40,
    },
  ]
}

export { columns }
