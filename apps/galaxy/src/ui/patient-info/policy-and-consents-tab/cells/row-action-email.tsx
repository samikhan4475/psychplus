'use client'

import { Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { sendPolicyNoticeAction } from '@/actions'
import { NotificationType } from '@/types'
import { RowActionProps } from '../types'
import { ActionItem } from './action-item'
import { useHasPermission } from '@/hooks'
import { useState } from 'react'
import { PermissionAlert } from '@/ui/schedule/shared'

const RowActionEmail = ({
  id,
  disabled,
  row: {
    original: { patientId, type },
  },
  toggleRowClick,
}: RowActionProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const hasPermission = useHasPermission('sendPolicyViaSMSEmailCall')  

  const handleClick = () => {
    if (!hasPermission) {
      setIsAlertOpen(true)
    } else {
      handleSendEmailNotice()
    }
  }
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
    <>
      <ActionItem
        Icon={Mail}
        title={id}
        onClick={handleClick}
        disabled={disabled}
      />
      <PermissionAlert
        isOpen={isAlertOpen}
        message="You do not have permission to Email. Please contact your supervisor if you need further assistance."
        onClose={() => setIsAlertOpen(false)}
      />
    </>
  )
}

export { RowActionEmail }
