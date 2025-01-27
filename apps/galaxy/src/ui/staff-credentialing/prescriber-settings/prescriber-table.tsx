import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { State } from '@/types'
import { getPrescriberSettings, getStaffAction } from '../actions'
import { PrescriberDataResponse } from '../types'
import { StatusSelectCell } from './cells'
import { ActionsCell } from './cells/actions-cell'

const columns = (
  userId: string,
  getPrescriberData: () => void,
): ColumnDef<PrescriberDataResponse>[] => [
  {
    accessorKey: 'states',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="States" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">{row.original.stateName}</TextCell>
    ),
  },
  {
    accessorKey: 'prescriber',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Prescriber" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="Prescriber"
      />
    ),
  },
  {
    accessorKey: 'new',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="New" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="New"
      />
    ),
  },
  {
    accessorKey: 'refill',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Refill" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="Refill"
      />
    ),
  },
  {
    accessorKey: 'change',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Change" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="Change"
      />
    ),
  },
  {
    accessorKey: 'cancel',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Cancel" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="Cancel"
      />
    ),
  },
  {
    accessorKey: 'pharmacyrxrequest',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="PharmacyRXRequest" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="PharmacyRXRequest"
      />
    ),
  },
  {
    accessorKey: 'pharmacyrxresponsedenied',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        label="PharmacyRXResponseDenied"
      />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="PharmacyRXResponseDenied"
      />
    ),
  },
  {
    accessorKey: 'controls',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Controls" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="Controls"
      />
    ),
  },
  {
    accessorKey: 'c2',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="C2" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="C2"
      />
    ),
  },
  {
    id: 'actions',
    size: 50,
    header: () => <ColumnHeader label="Actions" className="!font-medium" />,
    cell: ActionsCell,
  },
]
interface PrescriberTableProps {
  states: State[]
}
const PrescriberTable = ({ states }: PrescriberTableProps) => {
  const [loading, setLoading] = useState(true)
  const [prescriberData, setPrescriberData] = useState<
    PrescriberDataResponse[]
  >([])
  const [userId, setUserId] = useState('')

  const { id } = useParams() as { id: string }

  const getPrescriberData = async () => {
    setLoading(true)
    const result = await getPrescriberSettings(states)
    if (result.state === 'success') {
      setPrescriberData(result.data)
    } else if (result.state === 'error') {
      toast.error(result.error)
    }
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      const result = await getStaffAction(id)
      if (result.state === 'success') {
        const { userId } = result.data
        setUserId(userId)
        await getPrescriberData()
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
    })()
  }, [])

  if (loading) return <LoadingPlaceholder className="bg-white min-h-[46vh]" />
  return (
    <DataTable
      columns={columns(userId, getPrescriberData)}
      data={prescriberData}
      tdClass="!p-0 first:bg-white"
      isRowSpan
      sticky
      disablePagination
      tableRowClass="border-b border-red-200"
    />
  )
}

export { PrescriberTable }
