'use client'

import { useEffect, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { getPaymentDetailAction } from '../actions'
import { getAdjustmentCodesAction } from '../actions/get-adjustment-codes'
import { useStore } from '../insurance-payment-tab/store'
import { useStore as useTabStore } from '../store'
import { InsurancePayment, RevenueCycleTab } from '../types'
import { PaymentCheckHeader } from './insurance-payment-check-header'
import { PaymentCheckTable } from './insurance-payment-check-table'
import { InsurancePaymentPostingView } from './insurance-payment-posting-tab'
import { transformInPayment } from './utils'

const InsurancePaymentDetailView = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paymentDetail, setPaymentDetail] = useState<InsurancePayment>()

  const { activeTab, selectedPaymentId } = useTabStore((state) => ({
    activeTab: state.activeTab,
    selectedPaymentId: state.selectedPayments[state.activeTab],
  }))

  const { paymentPostingClaim, setPaymentPostingClaim, claimPaymentDeleted } =
    useStore((state) => ({
      paymentPostingClaim: state.paymentPostingClaim[activeTab],
      setPaymentPostingClaim: state.setPaymentPostingClaim,
      claimPaymentDeleted: state.claimPaymentDeleted,
    }))

  const fetchPaymentDetail = async (checkId: string) => {
    setIsLoading(true)
    setPaymentPostingClaim(activeTab)
    const result = await getPaymentDetailAction(checkId)
    if (result.state === 'success') {
      const adjustmentResult = await getAdjustmentCodesAction({
        practiceIds: [result.data.practiceId],
        recordStatuses: ['Active'],
      })

      const adjustmentCodes =
        adjustmentResult.state === 'success' ? adjustmentResult.data : []

      setPaymentDetail(
        transformInPayment({
          paymentDetail: result.data,
          adjustmentCodes,
        }),
      )
    } else if (result.state === 'error') {
      toast.error(result.error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (!activeTab.includes(RevenueCycleTab.CheckDetails)) return
    fetchPaymentDetail(selectedPaymentId)
  }, [selectedPaymentId, activeTab, claimPaymentDeleted])

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
