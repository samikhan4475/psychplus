'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Practice } from '@/ui/organization-practice/types'
import { formatDateTime, getMaskedPhoneNumber } from '@/utils'
import { getAllPracticeHxListAction } from '../actions'

const columns: ColumnDef<Practice>[] = [
  {
    id: 'user',
    size: 200,
    header: () => <ColumnHeader label="User" />,
    cell: ({ row }) => (
      <TextCell>{row.original.metadata?.createdByFullName}</TextCell>
    ),
  },
  {
    id: 'date',
    header: () => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => (
      <TextCell>
        {row.original.metadata?.updatedOn &&
          formatDateTime(row.original.metadata?.updatedOn)}
      </TextCell>
    ),
  },
  {
    id: 'displayName',
    header: ({ column }) => (
      <ColumnHeader label="Name" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.displayName}</TextCell>,
  },
  {
    id: 'npi',
    header: ({ column }) => (
      <ColumnHeader label="NPI" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.npi}</TextCell>,
  },
  {
    id: 'taxId',
    header: ({ column }) => (
      <ColumnHeader label="TIN" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.taxId}</TextCell>,
  },
  {
    id: 'taxonomy',
    header: ({ column }) => (
      <ColumnHeader
        label="Taxonomy Code"
        sortable
        clientSideSort
        column={column}
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.taxonomy}</TextCell>,
  },
  {
    id: 'clia',
    header: ({ column }) => (
      <ColumnHeader label="CLIA" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.clia}</TextCell>,
  },

  {
    id: 'address1',
    header: ({ column }) => (
      <ColumnHeader label="Address 1" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.street1 ?? ''}</TextCell>
    ),
  },
  {
    id: 'address2',
    header: ({ column }) => (
      <ColumnHeader label="Address 2" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.street2 ?? ''}</TextCell>
    ),
  },
  {
    id: 'city',
    header: ({ column }) => (
      <ColumnHeader label="City" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.city ?? ''}</TextCell>
    ),
  },
  {
    id: 'state',
    header: ({ column }) => (
      <ColumnHeader label="State" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.state ?? ''}</TextCell>
    ),
  },
  {
    id: 'postalCode',
    header: ({ column }) => (
      <ColumnHeader label="ZIP" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.postalCode ?? ''}</TextCell>
    ),
  },
  {
    id: 'practicePhone',
    header: ({ column }) => (
      <ColumnHeader label="Phone" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {getMaskedPhoneNumber(row?.original?.practicePhone ?? '')}
      </TextCell>
    ),
  },
  {
    id: 'practiceFax',
    header: ({ column }) => (
      <ColumnHeader label="Fax" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.practiceFax}</TextCell>,
  },
  {
    id: 'payAddress1',
    header: ({ column }) => (
      <ColumnHeader
        label="Pay Address"
        sortable
        clientSideSort
        column={column}
      />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practicePaymentAddress?.street1 ?? ''}</TextCell>
    ),
  },
  {
    id: 'defaultProviderName',
    header: ({ column }) => (
      <ColumnHeader
        label="Default Provider"
        sortable
        clientSideSort
        column={column}
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.defaultProviderName}</TextCell>,
  },
  {
    id: 'status',
    header: ({ column }) => (
      <ColumnHeader label="Status" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.recordStatus}</TextCell>,
  },
]

interface HistoryDataTableProps {
  id: string
}

const HistoryDataTable = ({ id }: HistoryDataTableProps) => {
  const [practiceHx, setPracticeHx] = useState<Practice[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPracticeHistory = async () => {
      setLoading(true)
      if (!id) return

      const response = await getAllPracticeHxListAction(id)
      if (response.state === 'success') {
        setPracticeHx(response.data)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }

    fetchPracticeHistory()
  }, [id])

  if (loading) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return (
    <Flex maxHeight={'300px'}>
      <DataTable columns={columns} data={practiceHx} />
    </Flex>
  )
}
export { HistoryDataTable }
