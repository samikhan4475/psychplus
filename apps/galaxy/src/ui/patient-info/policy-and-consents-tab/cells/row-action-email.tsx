'use client'

import { Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { sendPolicyNoticeAction } from '@/actions'
import { NotificationType } from '@/types'
import { RowActionProps } from '../types'
import { ActionItem } from './action-item'

const RowActionEmail = ({
  id,
  disabled,
  row: {
    original: { patientId, type },
  },
  toggleRowClick,
}: RowActionProps) => {
  const handleSendEmailNotice = async () => {
    toggleRowClick?.()

    try {
      const result = await sendPolicyNoticeAction({
        patientId,
        channels: [NotificationType.Email],
        policyType: type,
      })

      if (result.state === 'error') {
        throw new Error('Failed to send Email')
      }

      toast.success('Email sent!')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to send Email'
      toast.error(message)
    } finally {
      toggleRowClick?.()
    }
  }
  return (
    <ActionItem
      Icon={Mail}
      title={id}
      onClick={handleSendEmailNotice}
      disabled={disabled}
    />
  )
}

export { RowActionEmail }
