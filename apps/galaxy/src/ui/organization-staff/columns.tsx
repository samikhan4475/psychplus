import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { formatDateOfBirth, getSortDir } from '@/utils'
import { ActionsCell } from './actions-cell'
import { HxStatusCell } from './hx-status-cell'
import { StaffRoleCell } from './staff-role-cell'
import { Staff } from './types'
import {
  getHomeAddress,
  getJoinedOrganizations,
  getJoinedPractices,
  uniqueStaffType,
} from './utils'

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
      id: 'legalName.firstName',
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
      cell: ({ row }) => (
        <TextCell>{row.original.legalName.firstName}</TextCell>
      ),
    },
    {
      id: 'legalName.middleName',
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
      cell: ({ row }) => (
        <TextCell>{row.original.legalName.middleName}</TextCell>
      ),
    },
    {
      id: 'legalName.lastName',
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
      cell: ({ row }) => <TextCell>{row.original.legalName.lastName}</TextCell>,
    },
    {
      id: 'staffTypes',
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
      cell: ({ row }) => (
        <TextCell>{uniqueStaffType(row.original.staffTypes)}</TextCell>
      ),
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
      cell: ({ row }) => <StaffRoleCell row={row} />,
    },
    {
      id: 'legalName.honors',
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
      cell: ({ row }) => <TextCell>{row.original.legalName.honors}</TextCell>,
    },
    {
      id: 'organizationIds',
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
      cell: ({ row }) => (
        <TextCell>
          {getJoinedOrganizations(row.original.staffOrganizations)}
        </TextCell>
      ),
    },
    {
      id: 'practiceIds',
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
      cell: ({ row }) => (
        <TextCell className="w-[200px]">
          {getJoinedPractices(row.original.staffPractice)}
        </TextCell>
      ),
    },
    {
      id: 'npi',
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
      cell: ({ row }) => <TextCell>{row.original.npi}</TextCell>,
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
      id: 'dateOfBirth',
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
      cell: ({ row }) => (
        <TextCell>{formatDateOfBirth(row.original.dateOfBirth)}</TextCell>
      ),
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
      id: 'spokenLanguages',
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
      cell: ({ row }) => (
        <TextCell className="w-[200px]">
          {row.original.spokenLanguages?.toLocaleString()}
        </TextCell>
      ),
    },
    {
      id: 'providerAttributions',
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
        <TextCell>{row.original.providerAttributions.join(', ')}</TextCell>
      ),
    },
    {
      id: 'contactInfo.email',
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
      cell: ({ row }) => <TextCell>{row.original.contactInfo?.email}</TextCell>,
    },
    {
      id: 'phoneContact',
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
      cell: ({ row }) => <TextCell>{row.original.phoneContact}</TextCell>,
    },
    {
      id: 'virtualRoomLink',
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
      cell: ({ row }) => <TextCell>{row.original.virtualRoomLink}</TextCell>,
    },
    {
      id: 'contactInfo.addresses',
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
      cell: ({ row }) => <TextCell>{getHomeAddress(row.original)}</TextCell>,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

export { columns }
