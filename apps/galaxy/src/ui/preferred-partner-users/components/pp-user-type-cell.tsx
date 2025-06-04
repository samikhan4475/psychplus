'use client'

import { TextCell } from '@/components'
import { PreferredPartnerUser, SelectOptionType } from '@/types'
import { usePreferredPartnerStore } from '../store'
import { SimpleSelect } from './simple-select'

interface PPUserTypeCellProps {
  original: PreferredPartnerUser
  editMode: string | null
  userTypeOptions: SelectOptionType[]
}

export const PPUserTypeCell = ({
  original,
  editMode,
  userTypeOptions,
}: PPUserTypeCellProps) => {
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
  const currentValue = currentUserData?.userType ?? original.userType

  return editMode === original.id ? (
    <SimpleSelect
      value={currentValue}
      options={userTypeOptions}
      onValueChange={(value) => {
        updateTempData(original.id, 'userType', value)
      }}
      buttonClassName="h-6 w-[100px]"
      placeholder="Select Type"
    />
  ) : (
    <TextCell className={isDeleted(original) ? 'text-gray-400' : ''}>
      {original.userType}
    </TextCell>
  )
}
