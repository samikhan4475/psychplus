'use client'

import { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import { SendHorizontal } from 'lucide-react'
import toast from 'react-hot-toast'
import { placeLabOrderApi } from '../../add-lab-order/api'

const RowActionSend = ({ orderId }: { orderId: string }) => {
  const [disabled, setDisabled] = useState(false)

  const onClickSend = async () => {
    setDisabled(true)
    const result = await placeLabOrderApi(orderId)
    if (result.state === 'success') {
      toast.success('Order Placed!')
    } else {
      toast.error('Error while placing order')
    }
    setDisabled(false)
  }

  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      type="button"
      onClick={onClickSend}
      disabled={disabled}
    >
      <SendHorizontal color="black" width={16} height={16} />
    </IconButton>
  )
}

export { RowActionSend }
