import { useEffect, useState } from 'react'
import { parseAbsoluteToLocal } from '@internationalized/date'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { CareTeam } from '@/ui/staff-treatment-team/care-teams/types'
import { sortHistory } from '@/ui/staff-treatment-team/care-teams/util'
import {
  CareTeamHistoryFilterOptions,
  getPatientsCareTeamStatusHistoryList,
} from '../actions'
import { DateTimeCell } from '../cells/date-time-cell'

const columns: ColumnDef<CareTeam>[] = [
  {
    id: 'username',
    accessorFn: (row) => row.metadata?.createdByFullName,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="User" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.metadata.createdByFullName ?? 'N/A'}</TextCell>
    ),
  },
  {
    id: 'date',
    accessorFn: (row) => row.metadata?.updatedOn ?? row.metadata?.createdOn,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Date/Time" />
    ),
    cell: ({ row: { original } }) => (
      <DateTimeCell metadata={original.metadata} checkUpdatedOn />
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
  staffId: number
  patientId: string
  isPsychiatry?: boolean
}

const StatusHistoryTable = ({
  patientId,
  staffId,
  isPsychiatry,
}: StatusHistoryTableProps) => {
  const [data, setData] = useState<CareTeam[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setData([])
    fetchHistory()
  }, [patientId, staffId])

  const fetchHistory = async () => {
    const payload: CareTeamHistoryFilterOptions = {
      patientId: +patientId,
      staffId,
      isIncludeStaffInfo: true,
    }
    if (isPsychiatry) payload['providerType'] = 'Psychiatrist'
    if (isPsychiatry === false) payload['providerType'] = 'Therapy'

    const response = await getPatientsCareTeamStatusHistoryList(payload)
    setLoading(false)
    if (response.state === 'error') {
      setData([])
      toast.error(response?.error || 'Failed to fetch history')
      return
    }
    setData(response.data ?? [])
  }

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
