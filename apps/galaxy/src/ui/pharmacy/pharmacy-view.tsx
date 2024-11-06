'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { CurrentPharmaciesTable } from './current-pharmacies-table'
import { PharmacyHeader } from './pharmacy-header'
import { useStore } from './store'

interface PharmacyViewProps {
  patientId: string
}

const PharmacyView = ({ patientId }: PharmacyViewProps) => {
  const { data, fetchPatientPharmacies, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetchPatientPharmacies: state.fetchPatientPharmacies,
  }))
  useEffect(() => {
    fetchPatientPharmacies(patientId)
  }, [patientId, fetchPatientPharmacies])
  return (
    <Flex direction="column" width="100%" gap="1">
      <PharmacyHeader />
      <CurrentPharmaciesTable data={data ?? []} loading={loading} />
    </Flex>
  )
}

export { PharmacyView }
