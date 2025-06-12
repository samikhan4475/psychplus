'use client'

import { TextCell } from '@/components'
import { PreferredPartnerUser, SelectOptionType } from '@/types'
import { usePreferredPartnerStore } from '../store'
import { SimpleSelect } from './simple-select'

interface PPUserStatusCellProps {
  original: PreferredPartnerUser
  editMode: string | null
  userStatusOptions: SelectOptionType[]
}

export const PPUserStatusCell = ({
  original,
  editMode,
  userStatusOptions,
}: PPUserStatusCellProps) => {
  const isDeleted = (user: PreferredPartnerUser) =>
    user.recordStatus === 'Deleted'
  const { getTempUserData, updateTempData } = usePreferredPartnerStore(
    (state) => ({
      getTempUserData: state.getTempUserData,
      updateTempData: state.updateTempData,
    }),
  )

  const currentUserData =
    editMode === original.id ? getTempUserData(original.id) : original
  const currentValue = currentUserData?.userStatus ?? original.userStatus

  return editMode === original.id ? (
    <SimpleSelect
      value={currentValue}
      options={userStatusOptions}
      exclude={['Unknown']}
      onValueChange={(value) => {
        updateTempData(original.id, 'userStatus', value)
      }}
      buttonClassName="h-6 w-[120px]"
      placeholder="Select Status"
    />
  ) : (
    <TextCell className={isDeleted(original) ? 'text-gray-400' : ''}>
      {original.userStatus}
    </TextCell>
  )
}
