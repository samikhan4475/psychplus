'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const ServiceTable = () => {
  const { data, loading, fetchServices } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetchServices: state.fetchServices,
  }))

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  if (loading) {
    return <LoadingPlaceholder className="h-full w-full" />
  }
  return (
    <ScrollArea
      scrollbars="both"
      className="h-full max-w-[calc(100vw-192px)] flex-1 p-2 pt-0"
    >
      <DataTable
        data={data ?? []}
        columns={columns}
        sticky
        theadClass="z-[1]"
        isRowSpan
      />
    </ScrollArea>
  )
}

export { ServiceTable }
