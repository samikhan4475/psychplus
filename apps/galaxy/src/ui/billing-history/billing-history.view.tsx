'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { BillingHeader } from './billing-header'
import { BillingTable } from './billing-table'
import { BillingFilterForm } from './filter-form'
import { useStore } from './store'

interface BillingHistoryViewProps {
  patientId: string
}

const BillingHistoryView = ({ patientId }: BillingHistoryViewProps) => {
  const { data, fetchBillingHistory, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetchBillingHistory: state.fetchBillingHistory,
    showFilters: state.showFilters,
  }))
  useEffect(() => {
    fetchBillingHistory(patientId)
  }, [patientId, fetchBillingHistory])

  return (
    <Flex direction="column" width="100%" gap="1">
      <BillingHeader>
        <BillingFilterForm patientId={patientId} />
      </BillingHeader>
      <BillingTable data={data?.billingHistories ?? []} loading={loading} />
    </Flex>
  )
}

export { BillingHistoryView }
