import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getPracticePlanStatesAction } from './actions'
import { PracticePlanStatusCell } from './status-cell'
import { PracticePlan } from './types'

const columns = (
  getPracticePlanStates: () => void,
): ColumnDef<PracticePlan>[] => [
  {
    id: 'stateCode',
    accessorKey: 'stateCode',
    header: ({ column }) => (
      <ColumnHeader
        label="States"
        sortable
        column={column}
        clientSideSort
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.display}</TextCell>,
  },
  {
    id: 'Status',
    accessorKey: 'status',
    header: ({ column }) => (
      <ColumnHeader label="Status" clientSideSort sortable column={column} />
    ),
    cell: ({ row }) => (
      <PracticePlanStatusCell
        getPracticePlanStates={getPracticePlanStates}
        row={row}
      />
    ),
  },
]
const PracticePlanStateListTable = () => {
  const states = useCodesetCodes(CODESETS.UsStates)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<PracticePlan[]>([])
  const { id } = useParams<{ id: string }>()
  const getPracticePlanStates = useCallback(async () => {
    setLoading(true)

    const response = await getPracticePlanStatesAction(id)
    if (response.state === 'error') {
      toast.error(response.error || 'Failed to load practice plan states')
      setLoading(false)
      return
    }

    const dataMap = new Map(response.data.map((plan) => [plan.stateCode, plan]))

    const practicePlans = states.map((state) => {
      const plan = dataMap.get(state.value)
      return {
        ...plan,
        practicePlanId: plan?.practicePlanId || id,
        stateCode: state.value,
        display:state.display,
        recordStatus: plan?.recordStatus || 'Inactive',
      }
    })
    setData(practicePlans)
    setLoading(false)
  }, [id])

  useEffect(() => {
    getPracticePlanStates()
  }, [id])

  if (loading) return <LoadingPlaceholder className='w-full h-[47vh]' />
  return (
    <Box className="bg-white rounded">
      <ScrollArea className="rounded-lg p-1">
        <DataTable
          data={data}
          columns={columns(getPracticePlanStates)}
          disablePagination
          sticky
          tableClass="bg-white w-full"
        />
      </ScrollArea>
    </Box>
  )
}

export { PracticePlanStateListTable }
