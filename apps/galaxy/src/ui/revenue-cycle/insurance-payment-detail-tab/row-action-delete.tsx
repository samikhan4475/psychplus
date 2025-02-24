'use client'

import { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { DeleteConfirmDialog, type PropsWithRow } from '@/components'
import { deletePaymentClaimAction } from '../actions/delete-payment-claim'
import { useStore } from '../insurance-payment-tab/store'
import { ClaimPayment } from '../types'
import { PaymentListTypes } from './types'

const RowActionDelete = ({
  row: { original: payment },
}: PropsWithRow<ClaimPayment>) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const setClaimPaymentDeleted = useStore(
    (state) => state.setClaimPaymentDeleted,
  )
  const deleteRecord = async () => {
    setLoading(true)
    const result = await deletePaymentClaimAction(payment.id)
    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to delete the record')
    } else if (result.state === 'success') {
      toast.success('The record has been deleted successfully')
    }
    setLoading(false)
    setClaimPaymentDeleted()
  }

  const toggleOpen = (open: boolean) => {
    setOpen(open)
  }

  return (
    <DeleteConfirmDialog
      isOpen={open}
      toggleOpen={toggleOpen}
      onDelete={deleteRecord}
      loading={loading}
      title="claim payment"
    >
      <IconButton variant="ghost" disabled={payment.status === PaymentListTypes.Posted} color="gray" type="button">
        <Trash2 width={16} height={16} />
      </IconButton>
    </DeleteConfirmDialog>
  )
}

export { RowActionDelete }
