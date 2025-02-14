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
    id: 'legalName.firstName',
    header: ({ column }) => <ColumnHeader label="First Name" />,
    cell: ({ row }) => <TextCell>{row.original.legalName.firstName}</TextCell>,
  },
  {
    id: 'legalName.middleName',
    header: ({ column }) => (
      <ColumnHeader label="Middle Name" column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.legalName.middleName}</TextCell>,
  },
  {
    id: 'legalName.lastName',
    header: ({ column }) => <ColumnHeader label="Last Name" column={column} />,
    cell: ({ row }) => <TextCell>{row.original.legalName.lastName}</TextCell>,
  },
  {
    id: 'staffTypes',
    header: ({ column }) => <ColumnHeader label="Staff Type" />,
    cell: ({ row }) => <TextCell>{row.original.staffTypes}</TextCell>,
  },
  {
    id: 'staffRoleCode',
    header: ({ column }) => <ColumnHeader label="Role" />,
    cell: ({ row }) => <TextCell>{row.original.legalName.honors}</TextCell>,
  },
  {
    id: 'legalName.honors',
    header: ({ column }) => <ColumnHeader label="Credentials" />,
    cell: ({ row }) => <TextCell>{row.original.legalName.honors}</TextCell>,
  },
  {
    id: 'organizationIds',
    header: ({ column }) => <ColumnHeader label="Organization" />,
    cell: ({ row }) => <TextCell>{row.original.legalName.honors}</TextCell>,
  },
  {
    id: 'practiceIds',
    header: ({ column }) => <ColumnHeader label="Practice" />,
    cell: ({ row }) => <TextCell>{row.original.legalName.honors}</TextCell>,
  },
  {
    id: 'npi',
    header: ({ column }) => <ColumnHeader label="Individual NPI" />,
    cell: ({ row }) => <TextCell>{row.original.npi}</TextCell>,
  },
  {
    id: 'status',
    header: ({ column }) => <ColumnHeader label="Status" />,
    cell: ({ row }) => <TextCell>{row.original.status}</TextCell>,
  },
  {
    id: 'dateOfBirth',
    header: ({ column }) => <ColumnHeader label="DOB" />,
    cell: ({ row }) => <TextCell>{row.original.dateOfBirth}</TextCell>,
  },
  {
    id: 'gender',
    header: ({ column }) => <ColumnHeader label="Gender" />,
    cell: ({ row }) => <TextCell>{row.original.gender}</TextCell>,
  },
  {
    id: 'spokenLanguages',
    header: ({ column }) => <ColumnHeader label="Language" />,
    cell: ({ row }) => (
      <TextCell>{row.original.spokenLanguages?.toLocaleString()}</TextCell>
    ),
  },
  {
    id: 'providerAttributions',
    header: ({ column }) => <ColumnHeader label="Provider Preference" />,
    cell: ({ row }) => <TextCell>{row.original.providerAttributions}</TextCell>,
  },
  {
    id: 'contactInfo.email',
    header: ({ column }) => <ColumnHeader label="Email" />,
    cell: ({ row }) => <TextCell>{row.original.contactInfo?.email}</TextCell>,
  },
  {
    id: 'phoneContact',
    header: ({ column }) => <ColumnHeader label="Phone" />,
    cell: ({ row }) => <TextCell>{row.original.phoneContact}</TextCell>,
  },
  {
    id: 'virtualRoomLink',
    header: ({ column }) => <ColumnHeader label="Virtual Wait Room" />,
    cell: ({ row }) => <TextCell>{row.original.virtualRoomLink}</TextCell>,
  },
  {
    id: 'contactInfo.addresses',
    header: ({ column }) => <ColumnHeader label="Home Address" />,
    cell: ({ row }) => (
      <TextCell>
        {row.original.contactInfo?.addresses?.length > 0
          ? row.original.contactInfo.addresses[0].street1
          : ''}
      </TextCell>
    ),
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
