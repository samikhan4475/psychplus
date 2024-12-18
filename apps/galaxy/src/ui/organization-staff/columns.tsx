import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { ActionsCell } from './actions-cell'
import { HxStatusCell } from './hx-status-cell'
import { Staff } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Staff>[] => {
  return [
    {
      id: 'status',
      header: ({ column }) => (
        <ColumnHeader
          label="Hx"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <HxStatusCell row={row} />,
    },
    {
      id: 'firstname',
      header: ({ column }) => (
        <ColumnHeader
          label="First Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.firstname}</TextCell>,
    },
    {
      id: 'middlename',
      header: ({ column }) => (
        <ColumnHeader
          label="Middle Name"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.middlename}</TextCell>,
    },
    {
      id: 'lastname',
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
      cell: ({ row }) => <TextCell>{row.original.lastname}</TextCell>,
    },
    {
      id: 'staffType',
      header: ({ column }) => (
        <ColumnHeader
          label="Staff Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.staffType}</TextCell>,
    },
    {
      id: 'staffRoleCode',
      header: ({ column }) => (
        <ColumnHeader
          label="Role"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.staffRoleCode}</TextCell>,
    },
    {
      id: 'credentials',
      header: ({ column }) => (
        <ColumnHeader
          label="Credentials"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.credentials}</TextCell>,
    },

    {
      id: 'supervisedBy',
      header: ({ column }) => (
        <ColumnHeader
          label="Supervised By"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.credentials}</TextCell>,
    },
    {
      id: 'organization',
      header: ({ column }) => (
        <ColumnHeader
          label="Organization"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.organization}</TextCell>,
    },
    {
      id: 'practice',
      header: ({ column }) => (
        <ColumnHeader
          label="Practice"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.practice}</TextCell>,
    },
    {
      id: 'individualNpi',
      header: ({ column }) => (
        <ColumnHeader
          label="Individual NPI"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.individualNpi}</TextCell>,
    },
    {
      id: 'status',
      header: ({ column }) => (
        <ColumnHeader
          label="Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.status}</TextCell>,
    },
    {
      id: 'dob',
      header: ({ column }) => (
        <ColumnHeader
          label="DOB"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.dob}</TextCell>,
    },
    {
      id: 'gender',
      header: ({ column }) => (
        <ColumnHeader
          label="Gender"
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
      id: 'language',
      header: ({ column }) => (
        <ColumnHeader
          label="Language"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.language}</TextCell>,
    },
    {
      id: 'providerPreference',
      header: ({ column }) => (
        <ColumnHeader
          label="Provider Preference"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.provviderPreference}</TextCell>
      ),
    },
    {
      id: 'email',
      header: ({ column }) => (
        <ColumnHeader
          label="Email"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.email}</TextCell>,
    },
    {
      id: 'phone',
      header: ({ column }) => (
        <ColumnHeader
          label="Phone"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.phone}</TextCell>,
    },
    {
      id: 'virtualWaitRoom',
      header: ({ column }) => (
        <ColumnHeader
          label="Virtual Wait Room"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.virtualWaitRoom}</TextCell>,
    },
    {
      id: 'homeAddress',
      header: ({ column }) => (
        <ColumnHeader
          label="Home Address"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.homeAddress}</TextCell>,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

export { columns }
