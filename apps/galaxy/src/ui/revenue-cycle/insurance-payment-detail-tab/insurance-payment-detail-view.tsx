'use client'

import { useEffect, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { getPaymentDetailAction } from '../actions'
import { useStore } from '../insurance-payment-tab/store'
import { useStore as useTabStore } from '../store'
import { InsurancePayment, RevenueCycleTab } from '../types'
import { PaymentCheckHeader } from './insurance-payment-check-header'
import { PaymentCheckTable } from './insurance-payment-check-table'
import { InsurancePaymentPostingView } from './insurance-payment-posting-tab'

interface InsurancePaymentDetailViewProps {
  checkId: string
}
const InsurancePaymentDetailView = ({
  checkId,
}: InsurancePaymentDetailViewProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paymentDetail, setPaymentDetail] = useState<InsurancePayment>()
  const activeTab = useTabStore((state) => state.activeTab)
  const paymentPostingClaim = useStore(
    (state) => state.paymentPostingClaim[activeTab],
  )
  const fetchPaymentDetail = (checkId: string) => {
    setIsLoading(true)
    getPaymentDetailAction(checkId).then((result) => {
      if (result.state === 'success') {
        setPaymentDetail(result.data)
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
      setIsLoading(false)
    })
  }

  useEffect(() => {
    if (!activeTab.includes(RevenueCycleTab.CheckDetails)) return
    fetchPaymentDetail(checkId)
  }, [checkId, activeTab])

  if (isLoading) return <LoadingPlaceholder className="bg-white min-h-[46vh]" />

  if (!paymentDetail)
    return (
      <Text size="2" weight="bold">
        No Payment Found
      </Text>
    )

  return (
    <Flex gapY="2" direction="column">
      <PaymentCheckHeader paymentDetail={paymentDetail} />
      {paymentPostingClaim ? (
        <InsurancePaymentPostingView
          paymentDetail={paymentDetail}
          fetchPaymentDetail={fetchPaymentDetail}
        />
      ) : (
        <PaymentCheckTable paymentDetail={paymentDetail} />
      )}
    </Flex>
  )
}

export { InsurancePaymentDetailView }
