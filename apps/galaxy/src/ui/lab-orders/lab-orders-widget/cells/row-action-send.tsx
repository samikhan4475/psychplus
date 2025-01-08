'use client'

import { useState } from 'react'
import { IconButton, Tooltip } from '@radix-ui/themes'
import { SendHorizontal } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  getLabOrderRequisition,
  placeLabOrderApi,
} from '../../add-lab-order/api'

const RowActionSend = ({
  orderId,
  labLocationName,
}: {
  orderId: string
  labLocationName: string
}) => {
  const [disabled, setDisabled] = useState(false)

  const onClickSend = async () => {
    setDisabled(true)
    const requisitionResponse = await getLabOrderRequisition(orderId)
    if (requisitionResponse.state === 'success') {
      const result = await placeLabOrderApi(orderId)
      if (result.state === 'success') {
        toast.success('Order Placed!')
      } else {
        toast.error(result?.error ?? 'Error while placing order')
      }
    } else {
      toast.error(requisitionResponse?.error ?? 'Error while placing order')
    }
    setDisabled(false)
  }

  return (
    labLocationName === 'Quest' && (
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        type="button"
        onClick={onClickSend}
        disabled={disabled}
      >
        <Tooltip content="Place Order">
          <SendHorizontal color="black" width={16} height={16} />
        </Tooltip>
      </IconButton>
    )
  )
}

export { RowActionSend }
