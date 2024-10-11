'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { FilterForm } from './filter-form'
import { PatientDetails } from './patient-details'
import { PatientHistoryTable } from './patient-history-table'
import { useStore } from './store'

interface PatientInfoHistoryProps {
  patientId: string
  patientPolicyAStatus?: string
}

const PatientInfoHistory = ({
  patientId,
  patientPolicyAStatus,
}: PatientInfoHistoryProps) => {
  const { fetchPatientInfoHistories, loading } = useStore((state) => ({
    fetchPatientInfoHistories: state.fetchPatientInfoHistories,
    loading: state.loading,
  }))

  useEffect(() => {
    if (!patientId) return
    fetchPatientInfoHistories(patientId)
  }, [patientId])

  return (
    <Flex direction="column" gap="2">
      <FilterForm patientId={patientId} />
      <Flex className="h-[calc(100dvh_-_235px)]">
        {loading ? (
          <LoadingPlaceholder className="h-full w-full" />
        ) : (
          <>
            <PatientHistoryTable />
            <PatientDetails
              patientId={patientId}
              patientPolicyAStatus={patientPolicyAStatus}
            />
          </>
        )}
      </Flex>
    </Flex>
  )
}

export { PatientInfoHistory }
