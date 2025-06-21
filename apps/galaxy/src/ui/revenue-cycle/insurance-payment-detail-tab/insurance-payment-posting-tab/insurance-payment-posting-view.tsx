'use client'

import React, { BaseSyntheticEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { addClaimPaymentAction } from '../../actions/add-claim-payment'
import { updateClaimPaymentAction } from '../../actions/update-claim-payment'
import { useStore } from '../../insurance-payment-tab/store'
import { useStore as useTabStore } from '../../store'
import { InsurancePayment } from '../../types'
import { PaymentListTypes } from '../types'
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
  const { activeTab, selectedPaymentId, claimRefreshByClaimNumber } =
    useTabStore((state) => ({
      activeTab: state.activeTab,
      selectedPaymentId: state.selectedPayments[state.activeTab],
      claimRefreshByClaimNumber: state.claimRefreshByClaimNumber,
    }))
  const { paymentPostingClaim, setPaymentPostingClaim } = useStore((state) => ({
    setPaymentPostingClaim: state.setPaymentPostingClaim,
    paymentPostingClaim: state.paymentPostingClaim[activeTab],
  }))

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
        claimRefreshByClaimNumber(`Claim# ${paymentPostingClaim?.claimNumber}`)
        fetchPaymentDetail(selectedPaymentId)
        toast.success(
          `Payment has been successfully ${
            isPosted === PaymentListTypes.Posted ? 'saved and posted' : 'saved'
          }`,
        )
        onCancel()
      } else if (result.state === 'error') {
        let error = result.error
        if (error.includes('(InvalidOperationException)'))
          error = error.split('(InvalidOperationException)')[1].trim()
        toast.error(error)
      }
    }
  }
  const onCancel = () => setPaymentPostingClaim(activeTab)

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
