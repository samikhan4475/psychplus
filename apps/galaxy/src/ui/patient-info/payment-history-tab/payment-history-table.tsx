'use client'

import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const PaymentHistoryTable = () => {
  const { data, loading, sort, sortData } = useStore((state) => ({
    data: state.data?.paymentHistory,
    loading: state.loading,
    sort: state.sort,
    sortData: state.sortData,
  }))

  if (loading) {
    return <LoadingPlaceholder className="min-h-[calc(100dvh_-_465px)]" />
  }
  return (
    <ScrollArea className="bg-white h-[calc(100dvh_-_465px)] max-w-[calc(100vw_-_198px)] pb-2 pr-2">
      <DataTable
        columns={columns(sort, sortData)}
        data={data?.patientTransactions ?? []}
        isRowSpan
        disablePagination
        sticky
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
      />
    </ScrollArea>
  )
}
export { PaymentHistoryTable }
