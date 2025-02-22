'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { IconButton, Tooltip } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { deleteLabOrderApi } from '../../add-lab-order/api'
import { DeleteDialog } from '../delete-dialogue/delete-dialogue'
import { useStore } from '../store'

const RowActionDelete = ({
  orderId,
  labLocationName,
  orderStatus,
}: {
  orderId: string
  labLocationName: string
  orderStatus: string
}) => {
  const [disabled, setDisabled] = useState(false)
  const appointmentId = useSearchParams().get('id') ?? ''
  const { deleteLabOrder } = useStore()

  const onClickSend = async () => {
    setDisabled(true)

    const response = await deleteLabOrderApi(orderId, +appointmentId)

    if (response.state === 'success') {
      deleteLabOrder(response.data)
      toast.success('Lab order deleted')
    }

    setDisabled(false)
  }

  if (labLocationName === 'Quest' && orderStatus === 'OrderSubmitted')
    return null

  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      type="button"
      disabled={disabled}
    >
      <DeleteDialog handleDelete={onClickSend} />
    </IconButton>
  )
}

export { RowActionDelete }
