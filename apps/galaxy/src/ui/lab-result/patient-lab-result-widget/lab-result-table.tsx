'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { Columns, processSubRows } from './columns'
import { useStore } from './store'
import { updateResultsKey } from './utils'

const LabResultTable = () => {
  const { data, fetchLabResults, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetchLabResults: state.fetchLabResults,
  }))

  const patientId = useParams().id as string

  useEffect(() => {
    fetchLabResults({
      resourceStatusList: ['Active'],
      patientId: patientId,
    })
  }, [])

  if (loading) {
    return <LoadingPlaceholder className="bg-white h-full" />
  }

  const processedData = updateResultsKey(data || [])?.map((test) => ({
    ...test,
    subRows: processSubRows(test.subRows || []),
  }))

  return (
    <ScrollArea
      scrollbars="both"
      className="bg-white max-w-[calc(100vw_-_198px)] overflow-auto p-2"
    >
      <DataTable
        data={processedData}
        columns={Columns(processedData)}
        isRowSpan
        disablePagination
        sticky
        tRowClass="bg-gray-3"
        stickyRow={true}
        defaultExpanded={true}
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
      />
    </ScrollArea>
  )
}

export { LabResultTable }
