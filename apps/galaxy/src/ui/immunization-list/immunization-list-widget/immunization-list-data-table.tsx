'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const ImmunizationTable = () => {
  const { immunizations, loading, fetchImmunizations } = useStore(
    ({ data, loading, fetchImmunizations }) => ({
      immunizations: data,
      loading,
      fetchImmunizations,
    }),
  )

  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')

  useEffect(() => {
    if (appointmentId) {
      fetchImmunizations(appointmentId)
    }
  }, [appointmentId, fetchImmunizations])

  if (loading) return <LoadingPlaceholder className="h-full w-full" />

  return (
    <ScrollArea className="bg-white flex-1 p-2">
      <DataTable
        data={immunizations || []}
        columns={columns()}
        disablePagination
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { ImmunizationTable }
