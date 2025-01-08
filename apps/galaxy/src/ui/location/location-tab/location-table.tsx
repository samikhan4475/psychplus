'use client'

import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

interface LocationTableProps {
  googleApiKey: string
}

const LocationTable = ({ googleApiKey }: LocationTableProps) => {
  const { data, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    sort: state.sort,
    sortData: state.sortData,
  }))
  if (loading) {
    return <LoadingPlaceholder className="h-full w-full" />
  }

  return (
    <ScrollArea className="h-full flex-1 p-2">
      <DataTable
        data={data?.locations ?? []}
        columns={columns(googleApiKey, sort, sortData)}
        sticky
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { LocationTable }
