'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { FilterForm } from './filter-form'
import { HistoryDetails } from './history-details'
import { HistoryTable } from './history-table'
import { useStore } from './store'

interface InsuranceHistoryProps {
  patientId: string
  policyId: string
}

const InsuranceHistory = ({ patientId, policyId }: InsuranceHistoryProps) => {
  const { fetchInsuranceHistories, loading } = useStore((state) => ({
    fetchInsuranceHistories: state.fetchInsuranceHistories,
    loading: state.loading,
  }))

  useEffect(() => {
    if (!patientId || !policyId) return

    fetchInsuranceHistories(patientId, policyId)
  }, [patientId, policyId])

  return (
    <Flex direction="column" gap="2">
      <FilterForm patientId={patientId} policyId={policyId} />
      <Flex className="h-[calc(100dvh_-_235px)]">
        {loading ? (
          <LoadingPlaceholder className="h-full w-full" />
        ) : (
          <>
            <HistoryTable />
            <HistoryDetails patientId={patientId} policyId={policyId} />
          </>
        )}
      </Flex>
    </Flex>
  )
}

export { InsuranceHistory }
