'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { useStore as useTabStore } from '../store'
import { RevenueCycleTab } from '../types'
import { PaymentCheckHeader } from './insurance-payment-check-header'
import { PaymentCheckTable } from './insurance-payment-check-table'
import { useStore } from './store'

interface InsurancePaymentDetailViewProps {
  checkId: string
}
const InsurancePaymentDetailView = ({
  checkId,
}: InsurancePaymentDetailViewProps) => {
  const { fetchPaymentDetail, loading, data } = useStore((state) => ({
    fetchPaymentDetail: state.fetchPaymentDetail,
    loading: state.loading,
    data: state.data,
  }))
  const activeTab = useTabStore((state) => state.activeTab)
  useEffect(() => {
    if (activeTab.includes(RevenueCycleTab.CheckDetails))
      fetchPaymentDetail(checkId)
  }, [checkId, activeTab])

  if (loading) return <LoadingPlaceholder className="bg-white min-h-[46vh]" />

  if (data)
    return (
      <Flex gapY="2" direction="column">
        <PaymentCheckHeader paymentDetail={data} />
        <PaymentCheckTable paymentDetail={data} />
      </Flex>
    )
}

export { InsurancePaymentDetailView }
