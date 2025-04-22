'use client'

import { useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { DataTable, LoadingPlaceholder } from '@/components'
import { LabOrders } from '@/types'
import { getColumns } from './column'
import { useStore } from './store'

const LabOrderTable = ({
  isInboxLabOrder = false,
  afterSummaryVisit = false,
}: {
  isInboxLabOrder?: boolean
  afterSummaryVisit?: boolean
}) => {
  const searchParams = useSearchParams()
  const { data, loading, setSelectedRows } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    setSelectedRows: state.setSelectedRows,
  }))

  const appointmentId = isInboxLabOrder ? null : searchParams.get('id') ?? '0'

  const onRowSelectionChange = useCallback(
    (selectedRows: Row<LabOrders>[]) => {
      const selectedIds = selectedRows.map(({ original }) => original)
      setSelectedRows(selectedIds)
    },
    [setSelectedRows],
  )

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center" className="mt-5">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable
        data={data?.labOrders ?? []}
        columns={getColumns(appointmentId, isInboxLabOrder, afterSummaryVisit)}
        disablePagination
        sticky
        onRowSelectionChange={onRowSelectionChange}
      />
    </ScrollArea>
  )
}

export { LabOrderTable }
