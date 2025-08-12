'use client'

import { useState } from 'react'
import { Flex, IconButton, Text, Tooltip } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { PaymentPostIcon } from '@/components/icons'
import { cn } from '@/utils'
import { ClaimPayment } from '../types'
import { useStore } from './store'
import { PaymentListTypes } from './types'
import { postClaimPaymentAction } from '../actions'

const RowActionPostPayment = ({
  row: { original: payment },
}: PropsWithRow<ClaimPayment>) => {
  const [loading, setLoading] = useState(false)

  const { fetchClaimPayments, isLoading } = useStore((state) => ({
    fetchClaimPayments: state.fetchClaimPayments,
    isLoading: state.isLoading,
  }))
  const onPostPayment = async () => {
    if (!payment.id) return

    setLoading(true)
    const response = await postClaimPaymentAction({
      paymentId: payment.paymentId,
      claimPaymentId: payment.id,
    })
    if (response.state === 'error') {
      toast.error(response.error || 'Failed to post payment')
      return
    }
    toast.success('Claim payment posted successfully.')
    setLoading(false)
    fetchClaimPayments()
  }

  return (
    <Tooltip
      key="paymentPost"
      content={`${
        payment.status === PaymentListTypes.Posted
          ? 'Payment is already posted'
          : 'Payment Post'
      }`}
    >
      <Flex>
        <IconButton
          size="1"
          color="gray"
          variant="ghost"
          onClick={onPostPayment}
          disabled={
            isLoading || loading || payment.status === PaymentListTypes.Posted
          }
          className={cn(
            (isLoading || loading) && 'cursor-not-allowed',
            'flex text-1',
          )}
        >
          <PaymentPostIcon /> <Text className="ml-2 text-1">Payment Post</Text>
        </IconButton>
      </Flex>
    </Tooltip>
  )
}

export { RowActionPostPayment }
