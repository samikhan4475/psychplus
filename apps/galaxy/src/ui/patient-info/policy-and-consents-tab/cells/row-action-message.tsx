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

    try {
      const result = await sendPolicyNoticeAction({
        patientId,
        channels: [NotificationType.Sms],
        policyType: type,
      })

      if (result.error) {
        throw new Error('Failed to send text')
      }

      toast.success('Message sent!')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to send text'
      toast.error(message)
    } finally {
      toggleRowClick?.()
    }
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
