'use client'

import { useState } from 'react'
import { IconButton, Tooltip } from '@radix-ui/themes'
import { SendHorizontal } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  getLabOrderRequisition,
  placeLabOrderApi,
} from '../../add-lab-order/api'
import { ConfirmationDialog } from '../../add-lab-order/blocks/confirmation-dialog'

const RowActionSend = ({
  orderId,
  labLocationName,
  orderStatus,
}: {
  orderId: string
  labLocationName: string
  orderStatus: string
}) => {
  const [disabled, setDisabled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onClickSend = async () => {
    setIsOpen(false)
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

  const onClickConfirm = () => setIsOpen(true)

  return (
    labLocationName === 'Quest' &&
    orderStatus !== 'OrderSubmitted' && (
      <>
        <IconButton
          size="1"
          color="gray"
          variant="ghost"
          type="button"
          onClick={onClickConfirm}
          disabled={disabled}
        >
          <Tooltip content="Place Order">
            <SendHorizontal color="black" width={16} height={16} />
          </Tooltip>
        </IconButton>
        <ConfirmationDialog
          open={isOpen}
          onClose={setIsOpen}
          onClick={onClickSend}
        />
      </>
    )
  )
}

export { RowActionSend }
