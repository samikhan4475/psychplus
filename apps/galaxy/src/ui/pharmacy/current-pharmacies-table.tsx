'use client'

import { useEffect } from 'react'
import { Heading, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const CurrentPharmaciesTable = ({ patientId }: { patientId: string }) => {
  const { data, loading, fetchPatientPharmacies } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetchPatientPharmacies: state.fetchPatientPharmacies,
  }))

  useEffect(() => {
    fetchPatientPharmacies(patientId)
  }, [patientId, fetchPatientPharmacies])
  return (
    <ScrollArea className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] p-2">
      <Heading size="3" weight="medium" className="pb-1">
        Current Pharmacies
      </Heading>
      {loading ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <DataTable
          columns={columns}
          data={data ?? []}
          theadClass=""
          isRowSpan
          sticky
          disablePagination
        />
      )}
    </ScrollArea>
  )
}

export { CurrentPharmaciesTable }
