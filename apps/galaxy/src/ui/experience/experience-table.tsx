'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { useStore as zustandUseStore } from 'zustand'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const ExperienceTable = () => {
  const store = useStore()
  const { loading, data, sort, sortData, getExperiences } = zustandUseStore(
    store,
    (state) => ({
      data: state.data,
      getExperiences: state.getExperiences,
      loading: state.loading,
      sort: state.sort,
      sortData: state.sortData,
    }),
  )

  useEffect(() => {
    getExperiences()
  }, [getExperiences])

  if (loading) {
    return <LoadingPlaceholder className="bg-white min-h-40 h-full" />
  }

  return (
    <ScrollArea scrollbars="both" className="bg-white h-full p-2">
      <DataTable
        data={data?.experiences ?? []}
        columns={columns(sort, sortData)}
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        tableRowClass="relative"
        theadClass="z-[1]"
        disablePagination
        isRowSpan
        sticky
      />
    </ScrollArea>
  )
}

export { ExperienceTable }
