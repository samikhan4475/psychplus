'use client'

import { useEffect } from 'react'
import { Box, Heading, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const CurrentPharmaciesTable = ({
  patientId,
  isFeatureFlagEnabled,
}: {
  patientId: string
  isFeatureFlagEnabled: boolean
}) => {
  const { data, loading, fetchPatientPharmacies, fetchPatient } = useStore(
    (state) => ({
      data: state.data,
      loading: state.loading,
      fetchPatientPharmacies: state.fetchPatientPharmacies,
      fetchPatient: state.fetchPatient,
    }),
  )

  useEffect(() => {
    fetchPatientPharmacies(patientId)
    fetchPatient(patientId)
  }, [patientId, fetchPatientPharmacies])
  return (
    <Box className="bg-white p-2">
      <Heading size="3" weight="medium" className="pb-1">
        Current Pharmacies
      </Heading>
      <ScrollArea className="max-h-[300px]">
        {loading ? (
          <LoadingPlaceholder className="bg-white min-h-[46vh]" />
        ) : (
          <DataTable
            columns={columns(isFeatureFlagEnabled)}
            data={data ?? []}
            theadClass=""
            isRowSpan
            sticky
            disablePagination
          />
        )}
      </ScrollArea>
    </Box>
  )
}

export { CurrentPharmaciesTable }
