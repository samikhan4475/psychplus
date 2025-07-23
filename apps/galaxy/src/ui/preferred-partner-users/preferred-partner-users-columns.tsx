'use client'

import { ColumnDef } from '@tanstack/react-table'
import { PreferredPartnerUser, SelectOptionType } from '@/types'
import { createSharedColumns, createActiveUsersColumns } from './shared-columns'

const columns = (
  userTypeOptions: SelectOptionType[],
  userStatusOptions: SelectOptionType[],
  googleApiKey: string,
): ColumnDef<PreferredPartnerUser>[] => {
  const sharedCols = createSharedColumns()
  const activeUsersCols = createActiveUsersColumns()

  return [
    activeUsersCols.name(),
    activeUsersCols.ageGender(),
    sharedCols.dob(),
    activeUsersCols.mrn(),
    sharedCols.phone(),
    sharedCols.email(),
    sharedCols.address(),
    sharedCols.ppUserId(),
    sharedCols.ppUserType(),
    sharedCols.userInId('User In ID'),
    sharedCols.ppUserStatus(userStatusOptions),
    activeUsersCols.ppUserNumber(),
    sharedCols.startDate(),
    sharedCols.termDate(),
    sharedCols.uploadStatus(),
    sharedCols.action('active', googleApiKey),
  ]
}

export { columns }
