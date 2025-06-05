'use client'

import { useState } from 'react'
import { Button, Text } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'
import { useStore as useGlobalStore } from '@/store'
import { addSingedOrderApi } from '../../lab-order-results-widget/api'
import { ConfirmationDialog } from '../../lab-order-results-widget/blocks/review-confirmation-dialog'
import { useStore } from '../store'

interface RowActionReviewProps {
  orderId: string | number
}

const RowActionReview = ({ orderId }: RowActionReviewProps) => {
  const [open, setOpen] = useState(false)
  const { user } = useGlobalStore((state) => ({ user: state.user }))
  const staffId = user?.staffId
  const { refetch } = useStore((state) => ({
    refetch: state.refetch,
  }))
  const handleClick = () => {
    setOpen(true)
  }

  const handleConfirm = async () => {
    const payload = {
      orderIds: [orderId],
      resultSignedByStaffId: staffId,
      isResultSigned: true,
    }

    const result = await addSingedOrderApi(payload)

    if (result.state === 'error') {
      toast.error(result?.error ?? 'Error while signing order')
    }
    toast.success('Signed Successfully!')

    setOpen(false)
    refetch()
  }

  return (
    <>
      <Button
        className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
        type="button"
        onClick={handleClick}
      >
        <Text className="text-pp-black-3 text-1">Review</Text>
      </Button>

      <ConfirmationDialog
        open={open}
        onClick={handleConfirm}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export { RowActionReview }
