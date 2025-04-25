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
import { formatDateTime } from '@/utils'
import { getAllPracticeHxListAction } from '../actions'

const columns: ColumnDef<Practice>[] = [
  {
    id: 'user',
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
        {row.original.metadata?.createdOn &&
          formatDateTime(row.original.metadata?.createdOn)}
      </TextCell>
    ),
  },
  {
    id: 'status',
    header: () => <ColumnHeader label="Status" />,
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
  return <DataTable columns={columns} data={practiceHx} />
}
export { HistoryDataTable }
