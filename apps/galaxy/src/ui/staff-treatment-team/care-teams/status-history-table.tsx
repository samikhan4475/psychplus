import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { DateTimeCell } from '@/ui/treatment-team/cells/date-time-cell'
import { getCareTeamStatusHistoryList } from './actions'
import { CareTeam } from './types'
import { sortHistory } from './util'

const columns: ColumnDef<CareTeam>[] = [
  {
    id: 'username',
    accessorFn: (row) => row.metadata?.createdByFullName,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="User" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.metadata?.createdByFullName ?? 'N/A'}</TextCell>
    ),
  },
  {
    id: 'date',
    accessorFn: (row) => row.metadata?.createdByFullName,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Date/Time" />
    ),
    cell: ({ row: { original } }) => (
      <DateTimeCell metadata={original?.metadata} checkUpdatedOn />
    ),
    sortingFn: sortHistory,
  },
  {
    id: 'status',
    header: ({ column }) => <ColumnHeader column={column} label="Status" />,
    cell: ({ row }) => <TextCell>{row.original.recordStatus}</TextCell>,
  },
]

interface StatusHistoryTableProps {
  careTeam: CareTeam
  providerId: number
}

const StatusHistoryTable = ({
  careTeam,
  providerId,
}: StatusHistoryTableProps) => {
  const [data, setData] = useState<CareTeam[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setData([])
    getCareTeamStatusHistoryList(providerId, careTeam)
      .then((response) => {
        if (response.state === 'error') {
          setData([])
          return toast.error(response?.error)
        }
        setData(response.data ?? [])
      })
      .finally(() => setLoading(false))
  }, [careTeam.careTeamId, providerId])

  if (loading) {
    return <LoadingPlaceholder className="min-h-24" />
  }
  return (
    <ScrollArea className="rounded-lg h-full max-h-28 w-full">
      <DataTable
        data={data || []}
        columns={columns}
        disablePagination
        sticky
        defaultSorting={[{ id: 'date', desc: true }]}
      />
    </ScrollArea>
  )
}

export { StatusHistoryTable }
