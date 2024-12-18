'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Staff } from './types'

interface HxListTableProps {
  organizationId: string
}

const columns: ColumnDef<Staff>[] = [
  {
    id: 'firstname',
    header: ({ column }) => <ColumnHeader label="First Name" sortable />,
    cell: ({ row }) => <TextCell>{row.original.firstname}</TextCell>,
  },
  {
    id: 'middlename',
    header: ({ column }) => (
      <ColumnHeader label="Middle Name" column={column} sortable />
    ),
    cell: ({ row }) => <TextCell>{row.original.middlename}</TextCell>,
  },
  {
    id: 'lastname',
    header: ({ column }) => (
      <ColumnHeader label="Last Name" column={column} sortable />
    ),
    cell: ({ row }) => <TextCell>{row.original.lastname}</TextCell>,
  },
  {
    id: 'staffType',
    header: ({ column }) => <ColumnHeader label="Staff Type" sortable />,
    cell: ({ row }) => <TextCell>{row.original.staffType}</TextCell>,
  },
  {
    id: 'staffRoleCode',
    header: ({ column }) => <ColumnHeader label="Role" sortable />,
    cell: ({ row }) => <TextCell>{row.original.staffRoleCode}</TextCell>,
  },
  {
    id: 'credentials',
    header: ({ column }) => <ColumnHeader label="Credentials" sortable />,
    cell: ({ row }) => <TextCell>{row.original.credentials}</TextCell>,
  },

  {
    id: 'suppervisedBy',
    header: ({ column }) => <ColumnHeader label="Supervised By" sortable />,
    cell: ({ row }) => <TextCell>{row.original.credentials}</TextCell>,
  },
  {
    id: 'organization',
    header: ({ column }) => <ColumnHeader label="Organization" sortable />,
    cell: ({ row }) => <TextCell>{row.original.organization}</TextCell>,
  },
  {
    id: 'practice',
    header: ({ column }) => <ColumnHeader label="Practice" sortable />,
    cell: ({ row }) => <TextCell>{row.original.practice}</TextCell>,
  },
  {
    id: 'individualNpi',
    header: ({ column }) => <ColumnHeader label="Individual NPI" sortable />,
    cell: ({ row }) => <TextCell>{row.original.individualNpi}</TextCell>,
  },
  {
    id: 'status',
    header: ({ column }) => <ColumnHeader label="Status" sortable />,
    cell: ({ row }) => <TextCell>{row.original.status}</TextCell>,
  },
  {
    id: 'dob',
    header: ({ column }) => <ColumnHeader label="DOB" sortable />,
    cell: ({ row }) => <TextCell>{row.original.dob}</TextCell>,
  },
  {
    id: 'gender',
    header: ({ column }) => <ColumnHeader label="Gender" sortable />,
    cell: ({ row }) => <TextCell>{row.original.gender}</TextCell>,
  },
  {
    id: 'language',
    header: ({ column }) => <ColumnHeader label="Language" sortable />,
    cell: ({ row }) => <TextCell>{row.original.language}</TextCell>,
  },
  {
    id: 'providerPreference',
    header: ({ column }) => (
      <ColumnHeader label="Provider Preference" sortable />
    ),
    cell: ({ row }) => <TextCell>{row.original.provviderPreference}</TextCell>,
  },
  {
    id: 'email',
    header: ({ column }) => <ColumnHeader label="Email" sortable />,
    cell: ({ row }) => <TextCell>{row.original.email}</TextCell>,
  },
  {
    id: 'phone',
    header: ({ column }) => <ColumnHeader label="Phone" sortable />,
    cell: ({ row }) => <TextCell>{row.original.phone}</TextCell>,
  },
  {
    id: 'virtualWaitRoom',
    header: ({ column }) => <ColumnHeader label="Virtual Wait Room" sortable />,
    cell: ({ row }) => <TextCell>{row.original.virtualWaitRoom}</TextCell>,
  },
  {
    id: 'homeAddress',
    header: ({ column }) => <ColumnHeader label="Home Address" sortable />,
    cell: ({ row }) => <TextCell>{row.original.homeAddress}</TextCell>,
  },
]

const HxListTable = ({ organizationId }: HxListTableProps) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
    // TODO: need to call action here to fetch data
    setData([])
  }, [organizationId])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea className="h-full p-2">
      <DataTable
        data={data ?? []}
        columns={columns}
        disablePagination
        sticky
        isRowSpan
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { HxListTable }
