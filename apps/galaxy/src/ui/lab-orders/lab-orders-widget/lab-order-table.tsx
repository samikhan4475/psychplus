'use client'

import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import { DataTable, LoadingPlaceholder } from '@/components'
import { LabOrders } from '@/types'
import { getColumns } from './column'
import { EditViewLabResult } from './edit-view-lab-result'
import { LabResultDialog } from './lab-result-dialog'
import { schema, SchemaType } from './schema'
import { useStore } from './store'
import { OrderingLabName, OrderStatus } from './types'

const LabOrderTable = ({
  isInboxLabOrder = false,
  afterSummaryVisit = false,
}: {
  isInboxLabOrder?: boolean
  afterSummaryVisit?: boolean
}) => {
  const searchParams = useSearchParams()
  const { data, loading, setSelectedRows, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    setSelectedRows: state.setSelectedRows,
    sortData: state.sortData,
  }))

  const appointmentId = isInboxLabOrder ? null : searchParams.get('id') ?? '0'

  const [selectedRow, setSelectedRow] = useState<Row<LabOrders> | null>(null)
  const [selectedTestName, setSelectedTestName] = useState('')

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      labResults: {},
    },
  })

  const onRowSelectionChange = useCallback(
    (selectedRows: Row<LabOrders>[]) => {
      const selectedIds = selectedRows.map(({ original }) => original)
      setSelectedRows(selectedIds)
    },
    [setSelectedRows],
  )

  const handleRowResultClick = (row: Row<LabOrders>) => {
    setSelectedRow(row)
  }
  const handleDialogClose = () => {
    form.reset()
    setSelectedRow(null)
    setSelectedTestName('')
  }

  const columns = useMemo(
    () =>
      getColumns({
        appointmentId,
        isInboxLabOrder,
        afterSummaryVisit,
        onSort: sortData,
        onResultClick: handleRowResultClick,
      }),
    [
      appointmentId,
      isInboxLabOrder,
      afterSummaryVisit,
      sortData,
      handleRowResultClick,
    ],
  )

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center" className="mt-5">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <>
      <ScrollArea>
        <DataTable
          data={data?.labOrders ?? []}
          columns={columns}
          disablePagination
          sticky
          onRowSelectionChange={onRowSelectionChange}
        />
      </ScrollArea>

      {selectedRow && (
        <LabResultDialog
          open={true}
          onOpenChange={(open) => {
            if (!open) handleDialogClose()
          }}
          title={
            selectedTestName
              ? `View Results of ${selectedTestName}`
              : 'Lab Result'
          }
          onClose={handleDialogClose}
        >
          <EditViewLabResult
            row={selectedRow}
            form={form}
            shouldEditLabResult={
              selectedRow.original.orderStatus === OrderStatus.ResultReceived &&
              selectedRow.original.orderingLab?.name ===
                OrderingLabName.PsychPlus
            }
            setSelectedTestName={setSelectedTestName}
            onSubmitSuccess={handleDialogClose}
          />
        </LabResultDialog>
      )}
    </>
  )
}

export { LabOrderTable }
