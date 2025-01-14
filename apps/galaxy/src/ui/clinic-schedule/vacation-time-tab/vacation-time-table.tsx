'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const VacationTimeTable = () => {
  const { data, fetchLocationTimeList, loading } = useStore((state) => ({
    data: state.data,
    fetchLocationTimeList: state.fetchLocationTimeList,
    loading: state.loading,
  }))

  useEffect(() => {
    fetchLocationTimeList()
  }, [fetchLocationTimeList])

  if (loading) {
    return <LoadingPlaceholder />
  }
  return (
    <ScrollArea scrollbars="vertical" className="h-full">
      <DataTable
        columns={columns}
        data={data ?? []}
        sticky
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { VacationTimeTable }
