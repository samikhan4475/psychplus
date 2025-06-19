'use client'

import { ColumnDef } from '@tanstack/react-table'
import { PreferredPartnerUser, SelectOptionType } from '@/types'
import { createSharedColumns, createWorklistColumns } from './shared-columns'

const worklistColumns = (
  editMode: string | null,
  setEditMode: (id: string | null) => void,
  userTypeOptions: SelectOptionType[],
  userStatusOptions: SelectOptionType[],
  statusOptions: SelectOptionType[],
): ColumnDef<PreferredPartnerUser>[] => {
  const sharedCols = createSharedColumns()
  const worklistCols = createWorklistColumns()

  return [
    worklistCols.firstName(),
    worklistCols.lastName(),
    worklistCols.gender(),
    sharedCols.dob(),
    worklistCols.ssn(),
    worklistCols.userStatus(statusOptions),
    sharedCols.phone(),
    sharedCols.email(),
    sharedCols.address(),
    sharedCols.ppUserId(),
    sharedCols.ppUserType(),
    sharedCols.userInId('Users in ID'),
    sharedCols.ppUserStatus(editMode, userStatusOptions),
    sharedCols.startDate(editMode),
    sharedCols.uploadStatus(),
    sharedCols.action(editMode, setEditMode),
  ]
}

export { worklistColumns }
