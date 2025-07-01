'use client'

import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const LocationTable = () => {
  const { data, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
  }))
  if (loading) {
    return <LoadingPlaceholder className="h-full w-full" />
  }

  return (
    <ScrollArea className="h-full flex-1 p-2">
      <DataTable
        data={data?.locations ?? []}
        columns={columns}
        sticky
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { LocationTable }
