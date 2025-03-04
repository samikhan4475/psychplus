'use client'

import { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { CloseIcon } from '@/components/icons'
import { deleteForwardingMessageAction } from '../actions/delete-forwarding-message'
import { useStore } from '../store'
import { ForwardingMessage } from '../types'

interface CancelButtonCellProps {
  forwardingMessage: ForwardingMessage
}

const CancelButtonCell = ({
  forwardingMessage: { id, userId },
}: CancelButtonCellProps) => {
  const [loading, setLoading] = useState(false)
  const { setData, data } = useStore((state) => ({
    setData: state.setData,
    data: state.data,
  }))

  const handleDelete = async () => {
    setLoading(true)
    const response = await deleteForwardingMessageAction(userId, id)
    if (response.state === 'error') {
      setLoading(false)
      return toast.error(response.error)
    }
    setLoading(false)
    setData(data?.filter((item) => item.id !== id))
  }
  return (
    <IconButton
      variant="ghost"
      color="red"
      size="1"
      className="m-0"
      onClick={handleDelete}
      disabled={loading}
    >
      <CloseIcon height={18} />
    </IconButton>
  )
}

export { CancelButtonCell }
