'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { Columns } from './columns'
import { useStore } from './store'

const LabResultTable = () => {
  const { data, fetchLabResults, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetchLabResults: state.fetchLabResults,
  }))

  useEffect(() => {
    fetchLabResults()
  }, [])

  if (loading) {
    return <LoadingPlaceholder className="bg-white h-full" />
  }
  return (
    <ScrollArea
      scrollbars="both"
      className="bg-white max-w-[1000px] overflow-auto p-2"
    >
      <DataTable
        data={data?.labReports ?? []}
        columns={Columns(data)}
        isRowSpan
        disablePagination
        sticky
        stickyRow={true}
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
      />
    </ScrollArea>
  )
}

export { LabResultTable }
