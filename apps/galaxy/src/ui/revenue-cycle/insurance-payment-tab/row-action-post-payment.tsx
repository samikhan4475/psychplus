'use client'

import { useState } from 'react'
import { Flex, IconButton, Text, Tooltip } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { PaymentPostIcon } from '@/components/icons'
import { cn } from '@/utils'
import { postPaymentCheckAction } from '../actions'
import { ConfirmationDialog } from '../dialogs/confirmation-dialog'
import { PaymentListTypes } from '../insurance-payment-detail-tab/types'
import { InsurancePayment } from '../types'
import { useStore } from './store'

const RowActionPostPayment = ({
  row: { original: payment },
}: PropsWithRow<InsurancePayment>) => {
  const [loading, setLoading] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const { search, isLoading } = useStore((state) => ({
    search: state.search,
    isLoading: state.loading,
  }))
  const onPostPayment = async () => {
    if (!payment.id) return
    if (!confirmationOpen) return setConfirmationOpen(true)

    setLoading(true)
    setConfirmationOpen(false)

    const response = await postPaymentCheckAction(payment.id)

    if (response.state === 'error') {
      toast.error(response.error || 'Failed to post payment check')
    } else if (response.state === 'success') {
      const data = response.data

      if (data?.claimPaymentsWithErrors?.length > 0) {
        const allErrors = data.claimPaymentsWithErrors
          .map((err) => err.errorMessage.join('\n'))
          .join('\n')

        toast.error(allErrors)
      } else {
        toast.success(
          'Check posted successfully. All linked visits have been updated.',
        )
      }
    }

    setLoading(false)

    search({}, 1, true)
  }

  return (
    <>
      <ConfirmationDialog
        heading="Confirmation"
        content="Are you sure you want to post the complete check and apply all linked visits?"
        isOpen={confirmationOpen}
        onConfirmation={onPostPayment}
        closeDialog={() => setConfirmationOpen(false)}
      />
      <Tooltip
        key="paymentPost"
        content={`${
          payment.status === PaymentListTypes.Posted
            ? 'Payment is already posted'
            : 'Post Payment'
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
            <PaymentPostIcon />
            <Text className="ml-2 text-1">Post Payment</Text>
          </IconButton>
        </Flex>
      </Tooltip>
    </>
  )
}

export { RowActionPostPayment }
