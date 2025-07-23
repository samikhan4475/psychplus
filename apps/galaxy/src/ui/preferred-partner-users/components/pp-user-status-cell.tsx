'use client'

import { TextCell } from '@/components'
import { PreferredPartnerUser, SelectOptionType } from '@/types'

interface PPUserStatusCellProps {
  original: PreferredPartnerUser
  userStatusOptions: SelectOptionType[]
}

export const PPUserStatusCell = ({
  original,
  userStatusOptions,
}: PPUserStatusCellProps) => {
  const isDeleted = (user: PreferredPartnerUser) =>
    user.recordStatus === 'Deleted'

  const userStatusLabel = userStatusOptions?.find(
    (item) => item?.value === original.userStatus,
  )

  return (
    <TextCell className={isDeleted(original) ? 'text-gray-400' : ''}>
      {userStatusLabel?.label || original.userStatus || ''}
    </TextCell>
  )
}
