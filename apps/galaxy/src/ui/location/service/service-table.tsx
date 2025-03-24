'use client'

import { useEffect, useMemo } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

interface ServiceTableProps {
  googleApiKey: string
}
const ServiceTable = ({ googleApiKey }: ServiceTableProps) => {
  const { data, loading, fetchServices } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetchServices: state.fetchServices,
  }))
  const tableColumns = useMemo(() => columns(googleApiKey), [googleApiKey])

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
        columns={tableColumns}
        sticky
        theadClass="z-[1]"
        isRowSpan
      />
    </ScrollArea>
  )
}

export { ServiceTable }
