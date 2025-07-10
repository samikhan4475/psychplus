'use client'

import { useState } from 'react'
import { IconButton, Tooltip } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { PaymentPostIcon } from '@/components/icons'
import { cn } from '@/utils'
import { markClaimPostedAction } from '../actions'
import { ClaimPayment } from '../types'
import { useStore } from './store'

const RowActionPaymentPost = ({
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
    const response = await markClaimPostedAction(payment.id)
    if (response.state === 'error') {
      toast.error(response.error || 'Failed to post payment')
      return
    }
    toast.success('Payment posted successfully')
    setLoading(false)
    fetchClaimPayments()
  }

  return (
    <Tooltip key="paymentPost" content="Payment Post">
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        onClick={onPostPayment}
        disabled={isLoading || loading}
        className={cn((isLoading || loading) && 'cursor-not-allowed')}
      >
        <PaymentPostIcon />
      </IconButton>
    </Tooltip>
  )
}

export { RowActionPaymentPost }
