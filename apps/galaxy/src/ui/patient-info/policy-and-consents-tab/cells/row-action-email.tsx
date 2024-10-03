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
    const result = await sendPolicyNoticeAction({
      patientId,
      channels: [NotificationType.Email],
      policyType: type,
    })

    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to send Email')
    } else if (result.state === 'success') {
      toast.success('Email sent!')
    }
    toggleRowClick?.()
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
