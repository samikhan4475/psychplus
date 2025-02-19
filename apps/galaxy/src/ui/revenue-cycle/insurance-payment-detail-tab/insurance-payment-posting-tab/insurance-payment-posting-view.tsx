'use client'

import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, LoadingPlaceholder } from '@/components'
import { getClaimServiceLinePaymentsAction } from '../../actions'
import { addClaimPaymentAction } from '../../actions/add-claim-payment'
import { getAdjustmentCodesAction } from '../../actions/get-adjustment-codes'
import { updateClaimPaymentAction } from '../../actions/update-claim-payment'
import { useStore } from '../../insurance-payment-tab/store'
import { useStore as useTabStore } from '../../store'
import { InsurancePayment } from '../../types'
import { PaymentListTypes } from '../types'
import { transformInServiceLines } from '../utils'
import { transformInDefault, transformOut } from './data'
import { InsurancePaymentClaimSummary } from './insurance-payment-claim-summary'
import { InsurancePaymentPostingTable } from './insurance-payment-posting-table'
import { schema, SchemaType } from './schema'
import { validatePayment } from './utils'

interface InsurancePaymentPostingViewProps {
  fetchPaymentDetail: (checkId: string) => void
  paymentDetail: InsurancePayment
}
const InsurancePaymentPostingView = ({
  fetchPaymentDetail,
  paymentDetail,
}: InsurancePaymentPostingViewProps) => {
  const { activeTab, selectedPaymentId } = useTabStore((state) => ({
    activeTab: state.activeTab,
    selectedPaymentId: state.selectedPayments[state.activeTab],
  }))
  const { paymentPostingClaim, setPaymentPostingClaim } = useStore((state) => ({
    setPaymentPostingClaim: state.setPaymentPostingClaim,
    paymentPostingClaim: state.paymentPostingClaim[activeTab],
  }))

  const [isLoading, setIsLoading] = useState(
    !paymentPostingClaim?.claimServiceLines,
  )

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: transformInDefault(selectedPaymentId, paymentPostingClaim),
  })

  const onSubmit = async (data: SchemaType, event?: BaseSyntheticEvent) => {
    const { name } = (event?.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement

    const isPosted =
      name === 'Save_Post' ? PaymentListTypes.Posted : PaymentListTypes.Unposted

    const validationMessage = validatePayment({
      paymentDetail,
      claimPayment: data,
    })

    if (validationMessage) {
      toast.error(validationMessage)
    } else {
      const updatedPayload = transformOut(
        { ...data, isPostedPayment: name === 'Save_Post', status: isPosted },
        paymentPostingClaim,
      )

      const claimPaymentAction = !updatedPayload?.id
        ? addClaimPaymentAction({
            payload: updatedPayload,
            paymentId: selectedPaymentId,
          })
        : updateClaimPaymentAction({
            payload: updatedPayload,
            paymentId: selectedPaymentId,
            id: updatedPayload.id,
          })

      const result = await claimPaymentAction

      if (result.state === 'success') {
        fetchPaymentDetail(selectedPaymentId)
        toast.success(
          `Payment has been successfully ${
            isPosted === PaymentListTypes.Posted ? 'saved and posted' : 'saved'
          }`,
        )
        onCancel()
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
    }
  }
  const onCancel = () => setPaymentPostingClaim(activeTab)

  const getServiceLines = async (claimPaymentId: string) => {
    setIsLoading(true)
    const result = await getClaimServiceLinePaymentsAction({ claimPaymentId })
    if (result.state === 'success') {
      const adjustmentResult = await getAdjustmentCodesAction({
        practiceIds: [paymentDetail.practiceId],
        recordStatuses: ['Active'],
      })
      const adjustmentCodes =
        adjustmentResult.state === 'success' ? adjustmentResult.data : []
      form.setValue(
        'claimServiceLinePayments',
        transformInServiceLines({ serviceLines: result.data, adjustmentCodes }),
      )
    } else if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to get service lines')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (
      paymentPostingClaim?.claimServiceLinePayments &&
      paymentPostingClaim?.id
    )
      getServiceLines(paymentPostingClaim?.id)
  }, [])

  if (isLoading)
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )

  return (
    <Flex gapY="4" direction="column">
      <FormContainer form={form} onSubmit={onSubmit}>
        <InsurancePaymentClaimSummary claim={paymentPostingClaim} />
        <InsurancePaymentPostingTable
          paymentDetail={paymentDetail}
          onCancel={onCancel}
        />
      </FormContainer>
    </Flex>
  )
}

export { InsurancePaymentPostingView }
