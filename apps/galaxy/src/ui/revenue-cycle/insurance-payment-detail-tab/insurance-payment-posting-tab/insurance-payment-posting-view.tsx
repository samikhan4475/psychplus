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
import { useStore as TabStore } from '../../store'
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
  const activeTab = TabStore((state) => state.activeTab)
  const { paymentPostingClaim, setPaymentPostingClaim } = useStore((state) => ({
    setPaymentPostingClaim: state.setPaymentPostingClaim,
    paymentPostingClaim: state.paymentPostingClaim[activeTab],
  }))
  const paymentPostingId = activeTab.split(' ')[1]
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: transformInDefault(paymentPostingId, paymentPostingClaim),
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
            paymentId: paymentPostingId,
          })
        : updateClaimPaymentAction({
            payload: updatedPayload,
            paymentId: paymentPostingId,
            id: updatedPayload.id,
          })

      const result = await claimPaymentAction

      if (result.state === 'success') {
        fetchPaymentDetail(paymentPostingId)
        onCancel()
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
    }
  }
  const onCancel = () => setPaymentPostingClaim(activeTab)

  return (
    <Flex gapY="4" direction="column">
      <FormContainer form={form} onSubmit={onSubmit}>
        <InsurancePaymentClaimSummary claim={paymentPostingClaim} />
        <InsurancePaymentPostingTable
          onCancel={onCancel}
          claimServiceLinePayments={form.getValues('claimServiceLinePayments')}
        />
      </FormContainer>
    </Flex>
  )
}

export { InsurancePaymentPostingView }
