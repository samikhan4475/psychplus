'use client'

import React, { useMemo } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { useShallow } from 'zustand/react/shallow'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const PatientMedicationsDataTable = ({ actionsHide = false }) => {
  const { data, loading } = useStore(
    useShallow((state) => ({
      data: state.data,
      loading: state.loading,
    })),
  )

  const filteredColumns = useMemo(
    () =>
      actionsHide
        ? columns?.filter((col) => col.id !== 'medication-actions')
        : columns,
    [actionsHide, columns],
  )

  if (loading) {
    return <LoadingPlaceholder className="h-full w-full" />
  }

  return (
    <ScrollArea className="bg-white h-full flex-1 p-2">
      <DataTable
        data={data ?? []}
        columns={filteredColumns}
        disablePagination
        sticky
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { PatientMedicationsDataTable }
