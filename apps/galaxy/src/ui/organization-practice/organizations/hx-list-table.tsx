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
import { formatDateTime, getMaskedPhoneNumber } from '@/utils'
import { getAllOrganizationHxStatusListAction } from '../actions'
import { Organization } from '../types'

interface HxListTableProps {
  organizationId: string
}

const columns: ColumnDef<Organization>[] = [
  {
    id: 'user',
    header: ({ column }) => (
      <ColumnHeader label="User" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.metadata?.createdByFullName}</TextCell>
    ),
  },
  {
    id: 'displayName',
    header: ({ column }) => (
      <ColumnHeader
        label="Organization Name"
        sortable
        clientSideSort
        column={column}
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.displayName}</TextCell>,
  },

  {
    id: 'contact',
    header: ({ column }) => <ColumnHeader column={column} label="Contact" />,
    columns: [
      {
        id: 'contactName',
        header: ({ column }) => (
          <ColumnHeader label="Name" sortable clientSideSort column={column} />
        ),
        cell: ({ row }) => <TextCell>{row.original.contactName}</TextCell>,
      },
      {
        id: 'contactPhone',
        size: 50,
        header: ({ column }) => (
          <ColumnHeader
            label="Phone Number"
            sortable
            clientSideSort
            column={column}
          />
        ),
        cell: ({ row }) => (
          <TextCell className="truncate">
            {getMaskedPhoneNumber(row?.original?.contactPhone ?? '')}
          </TextCell>
        ),
      },
      {
        id: 'contactEmail',
        header: ({ column }) => (
          <ColumnHeader label="Email" sortable clientSideSort column={column} />
        ),
        cell: ({ row }) => <TextCell>{row.original.contactEmail}</TextCell>,
      },
    ],
  },
  {
    id: 'organizationAddress.street1',
    header: ({ column }) => (
      <ColumnHeader label="Address 1" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.organizationAddress?.street1}</TextCell>
    ),
  },
  {
    id: 'organizationAddress.street2',
    header: ({ column }) => (
      <ColumnHeader label="Address 2" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.organizationAddress?.street2}</TextCell>
    ),
  },
  {
    id: 'organizationAddress.city',
    header: ({ column }) => (
      <ColumnHeader label="City" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.organizationAddress?.city}</TextCell>
    ),
  },
  {
    id: 'organizationAddress.state',
    header: ({ column }) => (
      <ColumnHeader label="State" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.organizationAddress?.state}</TextCell>
    ),
  },
  {
    id: 'organizationAddress.postalCode',
    header: ({ column }) => (
      <ColumnHeader label="Zip" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.organizationAddress?.postalCode}</TextCell>
    ),
  },
  {
    id: 'date',
    header: ({ column }) => (
      <ColumnHeader label="Date/Time" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.metadata?.createdOn &&
          formatDateTime(row.original.metadata?.createdOn)}
      </TextCell>
    ),
  },
  {
    id: 'status',
    header: ({ column }) => (
      <ColumnHeader label="Status" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.recordStatus}</TextCell>,
  },
]

const HxListTable = ({ organizationId }: HxListTableProps) => {
  const [data, setData] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init()
  }, [organizationId])

  const init = async () => {
    setLoading(true)
    const response = await getAllOrganizationHxStatusListAction(organizationId)
    if (response.state === 'success') {
      setData(response.data)
    }
    setLoading(false)
  }

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
