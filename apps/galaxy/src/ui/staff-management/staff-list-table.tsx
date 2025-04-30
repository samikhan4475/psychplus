'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { useStore as useRootStore } from '@/store'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { ActionsCell, CollapseCell } from './cells'
import { FEATURE_TYPES } from './constants'
import { useStore } from './store'
import { Staff } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Staff>[] => {
  return [
    {
      id: 'hx',
      header: () => <ColumnHeader label="Hx" />,
      maxSize: 30,
      cell: CollapseCell,
    },
    {
      id: 'firstName',
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
        <TextCell>{row.original.legalName?.firstName}</TextCell>
      ),
    },
    {
      id: 'middleName',
      header: ({ column }) => (
        <ColumnHeader
          label="Middle Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.legalName?.middleName}</TextCell>
      ),
    },
    {
      id: 'lastName',
      header: ({ column }) => (
        <ColumnHeader
          label="Last Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.legalName?.lastName}</TextCell>
      ),
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
      cell: ({ row }) => (
        <TextCell>{row.original.staffTypes?.join(', ') ?? ''}</TextCell>
      ),
    },
    {
      id: 'role',
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
      cell: ({ row }) => (
        <TextCell className="w-[110px]">
          {row.original.staffUserRoleIds.join(',')}
        </TextCell>
      ),
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
      cell: ({ row }) => <TextCell>{row.original.legalName.honors}</TextCell>,
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
      cell: ({ row }) => <TextCell>{row.original.supervisedBy}</TextCell>,
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
      cell: ({ row }) => (
        <TextCell>{row.original.organizationIds.join(',')}</TextCell>
      ),
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
      cell: ({ row }) => (
        <TextCell className="w-[120px]">
          {row.original.practiceIds?.join(',')}
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
      cell: ({ row }) => (
        <TextCell className="w-[85px]">
          {format(new Date(String(row.original?.dateOfBirth)), 'dd/MM/yyyy')}
        </TextCell>
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
      cell: ({ row }) => (
        <TextCell className="w-[120px]">
          {row.original.spokenLanguages?.join(', ')}
        </TextCell>
      ),
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
        <TextCell className="w-[120px]">
          {row.original.providerAttributions?.join(', ')}
        </TextCell>
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
      cell: ({ row }) => <TextCell>{row.original.contactInfo?.email}</TextCell>,
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
      cell: ({ row }) => (
        <TextCell className="w-[100px]">{row.original.phoneContact}</TextCell>
      ),
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
      cell: ({ row }) => <TextCell>{row.original.virtualRoomLink}</TextCell>,
    },
    {
      id: 'address',
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
      cell: ({ row }) => {
        let address = ''
        if (row.original?.contactInfo?.addresses?.length > 0) {
          const { street1, city, country, postalCode } =
            row.original.contactInfo.addresses[0]
          address = `${street1 ?? ''}, ${country ?? ''}, ${city ?? ''},${
            postalCode ?? ''
          }`
        }

        return <TextCell className="w-[180px]">{address}</TextCell>
      },
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ActionsCell,
    },
  ]
}

const StaffListTable = () => {
  const router = useRouter()
  const { id, type } = useParams<{ id: string; type: string }>()
  const addTab = useRootStore((state) => state.addTab)

  const { data, search, loading, sort, sortData, getDropDownOptions } =
    useStore((state) => ({
      data: state.data,
      loading: state.loading,
      search: state.search,
      sort: state.sort,
      sortData: state.sortData,
      getDropDownOptions: state.getDropDownOptions,
    }))

  useEffect(() => {
    search({
      organizationsIds: type === FEATURE_TYPES.ORGANIZATION ? [id] : [],
      practicesIds: type === FEATURE_TYPES.PRACTICE ? [id] : [],
    })
    getDropDownOptions()
  }, [])
  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return (
    <ScrollArea className="bg-white max-w-[calc(100vw-188px)]">
      <DataTable
        tableRowClass="h-[28px]"
        data={data?.staff ?? []}
        onRowClick={(row) => {
          const href = `/staff/${row.original.id}/profile?id=${row.original.userId}`
          addTab({
            href,
            label: `${row.original?.legalName?.firstName} ${row.original.legalName?.lastName} - ${row.original.id}`,
          })
          router.push(href)
        }}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { StaffListTable }
