'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { IconButton } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { genericEventBus } from '@/lib/generic-event-bus'
import { deleteLabOrderApi } from '../../add-lab-order/api'
import { LabOrderStatusEnum } from '../../add-lab-order/blocks/types'
import { DeleteDialog } from '../delete-dialogue/delete-dialogue'
import { useStore } from '../store'

const RowActionDelete = ({
  orderId,
  orderStatus,
}: {
  orderId: string
  orderStatus?: string
}) => {
  const [disabled, setDisabled] = useState(false)
  const appointmentId = useSearchParams().get('id') ?? ''
  const { deleteLabOrder, isQuickNoteView } = useStore()

  const onClickSend = async () => {
    setDisabled(true)

    const response = await deleteLabOrderApi(orderId, +appointmentId)

    if (response.state === 'success') {
      deleteLabOrder(response.data)
      toast.success('Lab order deleted')
      if (isQuickNoteView) {
        genericEventBus.emit(`${appointmentId}`, {
          type: 'lab-order',
          message: 'Lab order deleted',
          timestamp: new Date().toISOString(),
        })
      }
    }

    setDisabled(false)
  }

  if (orderStatus !== LabOrderStatusEnum.Unsigned) return null

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
