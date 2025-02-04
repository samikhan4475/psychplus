'use client'

import { MessageSquareMore } from 'lucide-react'
import toast from 'react-hot-toast'
import { sendPolicyNoticeAction } from '@/actions'
import { NotificationType } from '@/types'
import { RowActionProps } from '../types'
import { ActionItem } from './action-item'
import { useHasPermission } from '@/hooks'
import { useState } from 'react'
import { PermissionAlert } from '@/ui/schedule/shared'

const RowActionMessage = ({
  row: {
    original: { patientId, type },
  },
  id,
  disabled,
  toggleRowClick,
}: RowActionProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const hasPermission = useHasPermission('sendPolicyViaSMSEmailCall')

  const handleClick = () => {
    if (!hasPermission) {
      setIsAlertOpen(true)
    } else {
      handleSendMessageNotice()
    }
  }
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
    <>
      <ActionItem
        Icon={MessageSquareMore}
        title={id}
        onClick={handleClick}
        disabled={disabled}
      />
      <PermissionAlert
        isOpen={isAlertOpen}
        message="You do not have permission to Message. Please contact your supervisor if you need further assistance."
        onClose={() => setIsAlertOpen(false)}
      />
    </>
  )
}

export { RowActionMessage }
