'use client'

import { MessageSquareMore } from 'lucide-react'
import toast from 'react-hot-toast'
import { sendPolicyNoticeAction } from '@/actions'
import { NotificationType } from '@/types'
import { RowActionProps } from '../types'
import { ActionItem } from './action-item'

const RowActionMessage = ({
  row: {
    original: { patientId, type },
  },
  id,
  disabled,
  toggleRowClick,
}: RowActionProps) => {
  const handleSendMessageNotice = async () => {
    toggleRowClick?.()
    const result = await sendPolicyNoticeAction({
      patientId,
      channels: [NotificationType.Sms],
      policyType: type,
    })

    if (result.state === 'error') {
      toast.error(result.error ?? '')
    } else if (result.state === 'success') {
      toast.success('Message sent!')
    }
    toggleRowClick?.()
  }
  return (
    <ActionItem
      Icon={MessageSquareMore}
      title={id}
      onClick={handleSendMessageNotice}
      disabled={disabled}
    />
  )
}

export { RowActionMessage }
