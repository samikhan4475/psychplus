'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

interface HistoryTableProps {
  patientId: string
}
const PaymentHistoryTable = ({ patientId }: HistoryTableProps) => {
  const { data, loading, sort, sortData, fetchPatientPaymentHistory } =
    useStore((state) => ({
      data: state.data?.paymentHistory,
      loading: state.loading,
      sort: state.sort,
      sortData: state.sortData,
      fetchPatientPaymentHistory: state.fetchPatientPaymentHistory,
    }))

  useEffect(() => {
    fetchPatientPaymentHistory({ patientIds: [patientId] })
  }, [fetchPatientPaymentHistory, patientId])

  if (loading) {
    return <LoadingPlaceholder className="h-full" />
  }

  return (
    <ScrollArea className="h-full p-2">
      <DataTable
        columns={columns(sort, sortData)}
        data={data?.patientTransactions ?? []}
        isRowSpan
        sticky
      />
    </ScrollArea>
  )
}

export { PaymentHistoryTable }
