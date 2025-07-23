'use client'

import { ColumnDef } from '@tanstack/react-table'
import { PreferredPartnerUser, SelectOptionType } from '@/types'
import { createSharedColumns, createWorklistColumns } from './shared-columns'

const worklistColumns = (
  userTypeOptions: SelectOptionType[],
  userStatusOptions: SelectOptionType[],
  statusOptions: SelectOptionType[],
  googleApiKey: string,
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
    sharedCols.ppUserStatus(userStatusOptions),
    sharedCols.startDate(),
    sharedCols.termDate(),
    sharedCols.uploadStatus(),
    sharedCols.action('worklist', googleApiKey),
  ]
}

export { worklistColumns }
