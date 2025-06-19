'use client'

import { TextCell } from '@/components'
import { PreferredPartnerUser, SelectOptionType } from '@/types'
import { cn } from '@/utils'

interface UserStatusCellProps {
  original: PreferredPartnerUser
  statusOptions: SelectOptionType[]
}

export const UserStatusCell = ({
  original,
  statusOptions,
}: UserStatusCellProps) => {
  const isDeleted = (user: PreferredPartnerUser) =>
    user.recordStatus === 'Deleted'

  const patientStatus = statusOptions?.find(
    (item) => item?.value === original?.patient?.status,
  )

  return (
    <TextCell
      className={cn('truncate', isDeleted(original) && 'text-gray-400')}
    >
      {patientStatus?.label || original?.patient?.status || ''}
    </TextCell>
  )
}
